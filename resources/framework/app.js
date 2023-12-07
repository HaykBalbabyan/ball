const currentScript = document.currentScript;

const scriptSrc = currentScript.src;

const url = scriptSrc.replace(/\/[^/]*$/, '');

document.addEventListener('DOMContentLoaded', ()=>{
    document.body.classList.add('loading');

    loadScripts();
});

async function loadScripts(){
    const modules = ['ajax','main','content-loader'];

    const statuses = {};

    let js = '';

    for (const module of modules){
        const src = url + '/modules/' + module + '.js';
        const tempContent = '/********(DYNAMICUI{{__SRC{{' + src + '}}__}})********/';

        js += `\r/* MODULE : ${src}*/\r`;
        js += tempContent;

        statuses[module] = false;

        await fetch(src)
        .then(response => response.text())
        .then(response => {
            js = js.replace(tempContent,response);
            statuses[module] = true;
        });

    }

    await eval(js);

    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
}