const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const handleErrors = require('./errors.js');
const PORT = process.env.PORT || 8080;

// create server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        getHandler(req, res);
    } else if (req.method === 'POST') {
        postHandler(req, res)
    }
    if (req.url === '/') {
        fs.readFile('./index.html', null, (err, html) => {
            if (err) throw new Error('file read error', err);
            else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(html);
                res.end();
            } 
        })
    } else if (req.url.match("\.css$")) {
        const cssFile = 'styles.css';
        var fileStream = fs.createReadStream(cssFile, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    } else if (req.url.match("\.js$")) {
        const jsFile = 'script.js';
        var fileStream = fs.createReadStream(jsFile, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fileStream.pipe(res);
    }
});
// get switch
const getHandler = (req, res) => {
    const { pathname } = url.parse(req.url)
    switch(req.url) {
        case '/':
            return homeRoute(req, res);
        default:
            break;
    }
}
// post switch
const postHandler = (req, res) => {
    switch(req.url) {
        case '/post':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log('post body => ', body);
                res.end();
            });
            break;
        default:
            req.write('message sent / post request');
            data = req.body;
            res.end(data);
            break;
    }
}
/**
 * 
 * GET ROUTES
 *  
 */
const homeRoute = (req, res) => {
    let data = '';
    https.get('https://www.boredapi.com/api/activity', resp => {
        resp.on('data', chunk => {
            data += chunk;
        })
        resp.on('end', () => {
            data = JSON.parse(data);
        })
    })
    fs.readFile('./index.html', null, (err, html) => {
        if (err) throw new Error('file read error', err);
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(html);
            res.end(html);
        } 
    })
    
}
/**
 * 
 * POST ROUTES
 * 
 */
// request handler
server.on('request', (req, res) => {
    if (req.method === 'GET') {
        getHandler(req, res);
    } else if (req.method === 'POST') {
        postHandler(req, res)
    }
})
// listener
server.listen(8080, () => {
    console.log(`🌎 live on ${PORT}`)
});