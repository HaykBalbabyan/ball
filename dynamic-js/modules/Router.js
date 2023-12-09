import {routes} from "../../routes";
import {getCookie, loadContent, setCookie} from "../Dynamic";
import {config} from '../../dynamic.config';

export default class Routing {

    #history = {};
    referer = {};

    constructor(){

        const historyJson = getCookie('history');

        if (!historyJson){
            setCookie('history','{}',365);
            this.#history = {};
        } else{
            try {
                this.#history = JSON.parse(historyJson);
            }catch (e){
                setCookie('history','{}',365);
                this.#history = {};
            }
        }

        this.referer = null;

        this.update();

        this.#popstate();
    }

    #popstate(){
        window.addEventListener('popstate', (event) => {
            this.update();

            this.#generateReferer();

            this.onChange(event.state,this.referer);
        });
    }

    #generateReferer(){
        const id = this.getHistoryLastId();

        this.referer = {
            path : window.location.pathname,
            title : document.title,
            name : null,
            routeName: '',
        };

        if (id){
            this.referer.path = this.#history[id]?.route?.path || this.referer.path;
            this.referer.title = this.#history[id]?.route?.title || this.referer.title;
            this.referer.route = this.#history[id]?.route || null;
            this.referer.routeName = this.#history[id]?.routeName || '';
        }
    }

    #getRouteName(url = null){

        const path = url ? url : window.location.pathname;

        if (url && typeof routes[url] === 'object'){
            return url;
        }

        for (const name in routes){
            const route = routes[name];
            if (route.path === path){
                return name;
            }
        }

        return null;
    }

    update(){
        const routeName = this.#getRouteName();

        if (routeName){
            const route = routes[routeName];

            console.log(route);

            loadContent(config.templates.urlpath + route.template);
        }
    }

    go(url,force = false){

        const routeName = this.#getRouteName(url);

        if (routeName || !routeName && force) {

            const lastId = this.getHistoryLastId();

            const data = {
                id : lastId + 1,
            };

            const route = routes[routeName] || [];

            if (routeName){
                data.page = route.name;
                data.routeName = routeName;
                data.route = route;
            } else {
                
                if (!this.isURL(url)){
                    throw new Error('Route error: Route can\'t be force changed because ' + url + ' is not right url' );
                    return;
                }
                
                data.page = 'No name';
                route.routeName = '';
                data.route = null;
            }

            this.#generateReferer();

            window.history.pushState(data,data.page,routeName ? route.path : url);

            this.#pushHistory(data);

            this.update();

            this.onChange(data,this.referer);
        }
    }

    getHistoryLastId(){
        const ids = Object.keys(this.#history);

        return  ids.length ? ids[id.length - 1] : 0;
    }

    #pushHistory(data){
        const history = this.#history;

        const lastId = this.getHistoryLastId();

        history[lastId + 1] = data;

        this.#history = history;

        setCookie('history',JSON.stringify(history),365);
    }

    onChange = (data,referer) => {};

    isURL(str) {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,6}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' +
            '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' +
            '(\\#[-a-zA-Z\\d_]*)?$', 'i');

        return urlPattern.test(str);
    }
}
