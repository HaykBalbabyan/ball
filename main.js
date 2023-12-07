const currentScript = document.currentScript;

const scriptSrc = currentScript.src;

const url = scriptSrc.replace(/\/[^/]*$/, '');

const $ = jQuery;

loadScripts();

document.addEventListener('DOMContentLoaded',function () {

    const API = 'http://192.168.18.119/'

    document.body.innerHTML = `<button id="toggle-button">Send Request</button>`;

    let ledStatus;

    fetch(API + 'ledstatus').then(response => {console.log(response)})

    document.addEventListener('click', (e) => {
        if (e.target.matches('#toggle-button')){

        }
    });

});


function getContent(file){
    // ajax.get('/contents/' + file + '.html');
}

function loadScripts(){
    $.ajax({
        url: url + '/test.js'
    })

}