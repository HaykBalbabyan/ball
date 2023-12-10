import {event,router,element,elements} from "../../../dynamic-js/Dynamic";
import {cssVar} from "./functions";

export default class Events {
    constructor() {
        this.#addEvents();
    }

    #addEvents(){

        router.events.onLoad = (route) => {
            setTimeout(()=>{
                const loader = document.querySelector('#page-loader-wrapper');

                loader.style.opacity = 0;

                if(element('#rotate-error-wrapper')){
                    element('#rotate-error-wrapper').style.display = '';
                }

                const links = elements('#header .menu a');

                if (links){
                    for (const link of links){
                        if (router.parseUrl(window.location.origin + route.path,link.href).match){
                            link.classList.add('active')
                        }
                    }
                }

                setTimeout(()=>{
                    loader.style.display = 'none';
                    const header = element('#header');
                    if (header) {
                        cssVar('header-height', header.offsetHeight + 'px');
                    }
                },400);
            },500);
        };

        router.events.onChange = (data,referer) => {
            setTimeout(()=>{
                const links = elements('#header .menu a');

                if (links){
                    for (const link of links){
                        if (router.parseUrl(window.location.origin + data.route.path,link.href).match){
                            link.classList.add('active')
                        }
                    }
                }
            },50)
        };


        event('scroll,resize,orientationChange',window,(e) => {
            const header = element('#header');
            if (header) {
                cssVar('header-height', header.offsetHeight + 'px');
            }
        });

        event('click','#header .burger-button',function (e,button) {
            const header = element('#header');

            const isMenuOpened = header.classList.contains('menu-is-open');

            if (isMenuOpened) {
                header.classList.remove('menu-is-open');
            } else {
                header.classList.add('menu-is-open');
            }
        })
    }
}