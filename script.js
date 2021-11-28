const data = JSON.stringify({ message: 'hello world'});

const clickHandler = (event) => {
    event.preventDefault();
    let data = {
        switch: true
    }
    let headers = {

    }
    axios.post('http://localhost:8080/post', data).then(res => console.log('front end => ', res)).catch(err => console.error(err))
}

let button = document.getElementById('click');
button.addEventListener('click', clickHandler);