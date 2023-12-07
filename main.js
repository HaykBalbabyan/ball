document.addEventListener('DOMContentLoaded',function () {

    const API = 'http://192.168.18.119/'

    document.body.innerHTML = `<button id="toggle-button">Send Request</button>`;

    let ledStatus;

    fetch(API + 'ledoff').then(response => {console.log(response)})

    document.addEventListener('click', (e) => {
        if (e.target.matches('#toggle-button')){

        }
    });



});