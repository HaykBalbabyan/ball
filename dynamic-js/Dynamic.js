import Ajax from './modules/Ajax';
import ContentLoader from './modules/ContentLoader';
import ScriptLoader from './modules/ScriptLoader';
import Router from './modules/Router';
import {config} from '../dynamic.config';

export async function ajax(props) {
    return await new Ajax(props).send();
}

export async function loadScripts(scripts){
    return await new ScriptLoader(scripts);
}

const contentLoader = new ContentLoader();

export async function loadContent(file){
    await contentLoader.getContent(file);
}

export function setCookie(name, value, expirationInDays) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationInDays);

    const cookieValue = encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
    document.cookie = name + '=' + cookieValue;
}

export function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split('; ');

    for (let i = 0; i < cookiesArray.length; i++) {
        const cookieParts = cookiesArray[i].split('=');
        if (cookieParts[0] === name) {
            return cookieParts[1] || '';
        }
    }

    return '';
}

export const router = new Router();

export class Dynamic{
    config = {};
    router;
    ajax;
    loadScripts;
    loadContent;
    setCookie;
    getCookie;


    constructor(){
        this.config = config;
        this.router = router;
        this.ajax = ajax;
        this.loadScripts = loadScripts;
        this.loadContent = loadContent;
        this.setCookie = setCookie;
        this.getCookie = getCookie;
    }
}

export const DynamicJS = new Dynamic();