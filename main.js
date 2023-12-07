document.addEventListener('DOMContentLoaded',function () {

    document.body.innerHTML = `<button id="toggle-button">Send Request</button>`;

    fetch('/ledoff').then(response => {console.log(response)})

});