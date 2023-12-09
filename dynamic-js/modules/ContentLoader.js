import {ajax,loadScripts} from "../Dynamic";

export default class ContentLoader{
    #loaded = {};

    constructor(){}

    async getContent(file){
        const that = this;
        if (this.#loaded[file]) {
            await this.#insertContent(this.#loaded[file]);
            return;
        }

        await ajax({
            url: file,
            method: 'get',
            async success(content){
                that.#loaded[file] = content;
                await that.#insertContent(content);
            }
        })
    }

    async #insertContent(HTML){

        const parser = new DOMParser();
        const doc = parser.parseFromString(HTML, 'text/html');

        const scriptTags = doc.querySelectorAll('script');

        document.body.innerHTML = doc.body.innerHTML;

        await Array.from(scriptTags).map(async script => {
            if(script.src && script.src.includes('.js')){
                await loadScripts({srcs:[script.src]});
            }else{
                await loadScripts({scripts:[script.textContent]});
            }
        });
    }
}