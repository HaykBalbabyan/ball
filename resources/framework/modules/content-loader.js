async function loadContent(file){
    await ajax({
        url: url + '/../site/contents/' + file + '.html',
        method: 'get',
        async success(content){
            await insertContent(content);
        }
    })
}

async function insertContent(HTML){

    const parser = new DOMParser();
    const doc = parser.parseFromString(HTML, 'text/html');

    const scriptTags = doc.querySelectorAll('script');

    const scriptContents = await Array.from(scriptTags).map(async script => {
        if(script.src && script.src.includes('.js')){
            let c = '';
            await ajax({
                url: script.src,
                method: 'get',
                success(content){
                    c = content;
                }
            });

            return c;
        }else{
            return script.textContent
        }
    });

    for (const tag of scriptTags){
        tag.remove();
    }

    document.body.innerHTML = doc.body.innerHTML;

    for (const script of scriptContents) {
        eval(script);
    }
}