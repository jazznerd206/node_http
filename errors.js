const http = require('http');

function handleError(status, res) {
    res.statusCode = status;
    res.end(`{"error": "${http.STATUS_CODES[status]}}`)
}

module.exports = {
    handleError
}