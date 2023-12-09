(()=>{"use strict";var __webpack_modules__={276:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{hj:()=>ajax,Lp:()=>loadContent,yu:()=>loadScripts});class Ajax{#props;#sendData;constructor(props){this.#props={url:props.url,method:(props.method??"get").toUpperCase(),data:props.data??{},success:props.success??(()=>{}),error:props.error??(()=>{}),beforeSend:props.beforeSend??(()=>{}),contentType:props.contentType??"application/x-www-form-urlencoded"},this.#sendData="",this.#props.data&&(this.#sendData=this.#objToUrl(this.#props.data))}#objToUrl(data,parentKey=""){const params=[];for(const key in data)if(data.hasOwnProperty(key)){const paramKey=parentKey?`${parentKey}[${key}]`:key;if("object"!=typeof data[key]||Array.isArray(data[key]))Array.isArray(data[key])?data[key].forEach(((item,index)=>{if("object"!=typeof item||Array.isArray(item))params.push(`${paramKey}[]=${encodeURIComponent(item)}`);else{const nestedParams=this.#objToUrl(item,`${paramKey}[${index}]`);params.push(nestedParams)}})):params.push(`${paramKey}=${encodeURIComponent(data[key])}`);else{const nestedParams=this.#objToUrl(data[key],paramKey);params.push(nestedParams)}}return params.join("&")}async send(){this.#props.beforeSend();let response=null;const xhr=new XMLHttpRequest;this.#props.url+="POST"===this.#props.method?"":"?"+this.#sendData,xhr.open(this.#props.method,this.#props.url,!0),xhr.setRequestHeader("Content-Type",this.#props.contentType),xhr.send(this.#sendData);const that=this;xhr.onreadystatechange=await(function(){if(4===this.readyState){response={statusCode:xhr.status,statusText:xhr.statusText};try{response.response=JSON.parse(xhr.responseText)}catch(e){response.response=xhr.responseText}200===this.status?that.#props.success(response.response,response):that.#props.error(response.response,response)}})}}var ScriptLoader=__webpack_require__(834);const config={templates:{basedir:"./public/html",urlpath:"/public"},routesUrl:"/routes.json"},routes_namespaceObject=JSON.parse('{"home":{"name":"Home","path":"/","template":"/home.html","title":"Home - Test"},"test":{"name":"Test","path":"/aa/test/{slug}","template":"/test.html","title":"Test - Test"}}');async function ajax(props){return await new Ajax(props).send()}async function loadScripts(scripts){return await new ScriptLoader.Z(scripts)}const contentLoader=new class{#loaded={};constructor(){}async getContent(file){const that=this;this.#loaded[file]?await this.#insertContent(this.#loaded[file]):await ajax({url:file,method:"get",async success(content){that.#loaded[file]=content,await that.#insertContent(content)}})}async#insertContent(HTML){const doc=(new DOMParser).parseFromString(HTML,"text/html"),scriptTags=doc.querySelectorAll("script");document.body.innerHTML=doc.body.innerHTML,await Array.from(scriptTags).map((async script=>{script.src&&script.src.includes(".js")?await loadScripts({srcs:[script.src]}):await loadScripts({scripts:[script.textContent]})}))}};async function loadContent(file){await contentLoader.getContent(file)}function setCookie(name,value,expirationInDays){const expirationDate=new Date;expirationDate.setDate(expirationDate.getDate()+expirationInDays);const cookieValue=encodeURIComponent(value)+"; expires="+expirationDate.toUTCString()+"; path=/";document.cookie=name+"="+cookieValue}function getCookie(name){const cookiesArray=decodeURIComponent(document.cookie).split("; ");for(let i=0;i<cookiesArray.length;i++){const cookieParts=cookiesArray[i].split("=");if(cookieParts[0]===name)return cookieParts[1]||""}return""}const router=new class{#history={};#currentRoute=null;referer={};constructor(){this.referer=null,this.update(),this.#events()}#events(){window.addEventListener("popstate",(event=>{this.update(),this.#generateReferer(),"function"==typeof this.onChange&&this.onChange(event.state,this.referer)})),document.addEventListener("click",(event=>{const target=event.target;if(target.matches("a.router")||target.closest("a.router")){const a=target.matches("a.router")?target:target.closest("a.router");if(!a.href)return;event.preventDefault(),this.go(a.href)}}))}#generateReferer(){const id=this.getHistoryLastId();this.referer={path:window.location.pathname,title:document.title,name:null,routeName:""},id&&(this.referer.path=this.#history[id]?.route?.path||this.referer.path,this.referer.title=this.#history[id]?.route?.title||this.referer.title,this.referer.route=this.#history[id]?.route||null,this.referer.routeName=this.#history[id]?.routeName||"")}#getRoute(url=null,returnRoute=!1){const path=url||window.location.href;if(url&&"object"==typeof routes_namespaceObject[url])return returnRoute?routes_namespaceObject[url]:url;for(const name in routes_namespaceObject){const route=routes_namespaceObject[name],parsedUrl=this.#parseUrl(window.location.origin+route.path,path);if(parsedUrl.match)return routes_namespaceObject[name].variables=parsedUrl.variables,returnRoute?routes_namespaceObject[name]:name}return"object"==typeof routes_namespaceObject["not-found"]?returnRoute?routes_namespaceObject["not-found"]:"not-found":null}getCurrent(){return this.#currentRoute}update(){const routeName=this.#getRoute();if(routeName){const route=routes_namespaceObject[routeName];this.#currentRoute=route,loadContent(config.templates.urlpath+route.template),document.title=routeName?route.title:""}}go(url,force=!1){const routeName=this.#getRoute(url);if(routeName||!routeName&&force){const data={id:this.getHistoryLastId()+1},route=routes_namespaceObject[routeName]||{};if(routeName)data.page=route.name,data.routeName=routeName,data.route=route;else{if(!this.isURL(url))throw new Error("Route error: Route can't be force changed because "+url+" is not right url");data.page="No name",route.routeName="",data.route=null}this.#generateReferer(),window.history.pushState(data,routeName?route.title:data.name,url),this.#pushHistory(data),this.update(),"function"==typeof this.onChange&&this.onChange(data,this.referer)}}getHistoryLastId(){const ids=Object.keys(this.#history);return ids.length?+ids[ids.length-1]:0}#pushHistory(data){const history=this.#history;history[this.getHistoryLastId()+1]=data,this.#history=history}onChange=(data,referer)=>{};isURL(str){return new RegExp("^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,6}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?(\\#[-a-zA-Z\\d_]*)?$","i").test(str)}#parseUrl(template,url){const regexPattern=template.replace(/\{[^\}]+\}/g,"([^/]+)"),regex=new RegExp(`^${regexPattern}$`),match=url.match(regex);if(match){const parts=template.match(/\{[^\}]+\}/g),values={};return parts&&parts.forEach(((part,index)=>{const key=part.replace(/[{}]/g,"");values[key]=match[index+1]})),{variables:values,match:!0}}return{variables:{},match:!1}}};new class{config={};router;ajax;loadScripts;loadContent;setCookie;getCookie;constructor(){this.config=config,this.router=router,this.ajax=ajax,this.loadScripts=loadScripts,this.loadContent=loadContent,this.setCookie=setCookie,this.getCookie=getCookie}}},834:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ScriptLoader});var _Dynamic__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(276);class ScriptLoader{srcs;scripts;constructor(JavaScript){this.srcs=JavaScript?.srcs||[],this.scripts=JavaScript?.scripts||[],this.#load()}async#load(){if(this.srcs)for(const src of this.srcs)await this.#loadFile(src);if(this.scripts)for(const script of this.scripts)await eval(script)}async#loadFile(src){let js="";(0,_Dynamic__WEBPACK_IMPORTED_MODULE_0__.hj)({url:src,success(content){eval(content)}})}}}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop);var __webpack_exports__={};__webpack_require__(276)})();
//# sourceMappingURL=app.js.map