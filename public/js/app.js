(()=>{"use strict";var t={276:(t,e,s)=>{s.d(e,{Bl:()=>m,hj:()=>a,bG:()=>p,Rm:()=>f,B:()=>d,Lp:()=>l,yu:()=>c,Nd:()=>u});class r{#t;#e;constructor(t){this.#t={url:t.url,method:(t.method??"get").toUpperCase(),data:t.data??{},success:t.success??(()=>{}),error:t.error??(()=>{}),beforeSend:t.beforeSend??(()=>{}),contentType:t.contentType??"application/x-www-form-urlencoded"},this.#e="",this.#t.data&&(this.#e=this.#s(this.#t.data))}#s(t,e=""){const s=[];for(const r in t)if(t.hasOwnProperty(r)){const o=e?`${e}[${r}]`:r;if("object"!=typeof t[r]||Array.isArray(t[r]))Array.isArray(t[r])?t[r].forEach(((t,e)=>{if("object"!=typeof t||Array.isArray(t))s.push(`${o}[]=${encodeURIComponent(t)}`);else{const r=this.#s(t,`${o}[${e}]`);s.push(r)}})):s.push(`${o}=${encodeURIComponent(t[r])}`);else{const e=this.#s(t[r],o);s.push(e)}}return s.join("&")}async send(){this.#t.beforeSend();let t=null;const e=new XMLHttpRequest;this.#t.url+="POST"===this.#t.method?"":"?"+this.#e,e.open(this.#t.method,this.#t.url,!0),e.setRequestHeader("Content-Type",this.#t.contentType),e.send(this.#e);const s=this;e.onreadystatechange=await(function(){if(4===this.readyState){t={statusCode:e.status,statusText:e.statusText};try{t.response=JSON.parse(e.responseText)}catch(s){t.response=e.responseText}200===this.status?s.#t.success(t.response,t):s.#t.error(t.response,t)}})}}var o=s(834);const n={templates:{urlpath:"https://haykbalbabyan.github.io/ball/public"}},i=JSON.parse('{"controller":{"name":"Dashboard","path":"/controller","template":"/controller.html","title":"Controller"},"dashboard":{"name":"Dashboard","path":"/","template":"/dashboard.html","title":"Dashboard"},"not-found":{"name":"Not found","template":"/not-found.html","title":"404 Not found"}}');async function a(t){return await new r(t).send()}async function c(t){return await new o.Z(t)}const h=new class{#r={};#o={};#n;constructor(){this.#n=document.querySelector("#app")}async getContent(t,e=null){const s=this;this.#r[t]?await this.#i(this.#r[t],t,e):await a({url:t,method:"get",async success(r){s.#r[t]=r,await s.#i(r,t,e)}})}#i(t,e,s=null){const r=this,o=(new DOMParser).parseFromString(t,"text/html"),n=o.querySelectorAll("script");if(this.#a(e),this.#o[e])for(const t in this.#o[e])this.#c(this.#o[e][t],t,e);else{this.#o[e]={};const t=o.querySelectorAll("style");for(const s of t){if(s.getAttribute("src"))a({url:s.getAttribute("src"),success(t){r.#o[e][s.getAttribute("src")]={code:t},r.#c(r.#o[e][s.getAttribute("src")],s.getAttribute("src"),e)}});else if(s.textContent){const t=(""+Math.random()).replace("0.","");r.#o[e][t]={code:s.textContent},r.#c(r.#o[e][t],t,e)}s.remove()}}s?s.innerHTML=o.body.innerHTML:this.#n.innerHTML=o.body.innerHTML,Array.from(n).map((t=>{t.src&&t.src.includes(".js")?c({srcs:[t.src]}):c({scripts:[t.textContent]})}))}#c(t,e,s){const r=document.createElement("style"),o="style-id-"+(""+Math.random()).replace("0.","");r.id=o,r.textContent=t.code,this.#o[s][e].id=o,document.head.append(r)}#a(t){for(const e in this.#o)if(e!==t&&Object.keys(this.#o[e]).length)for(const t of Object.values(this.#o[e]))document.querySelector("#"+t.id).remove()}};async function l(t,e){await h.getContent(t,e)}const u=new class{#h={};#l=null;referer={};events={onLoad:t=>{},onChange:(t,e)=>{}};constructor(){this.#u()}async#u(){this.referer=null,await this.update(),this.#d(),this.events.onLoad(this.#l)}#d(){window.addEventListener("popstate",(t=>{this.update(),this.#p(),setTimeout((()=>{"function"==typeof this.events.onChange&&this.events.onChange(t.state,this.referer)}),1)})),document.addEventListener("click",(t=>{const e=t.target;if(e.matches("a[router]")||e.closest("a[router]")){const s=e.matches("a[router]")?e:e.closest("a[router]");if(!s.href)return;t.preventDefault(),this.go(s.href)}}))}#p(){const t=this.getHistoryLastId();this.referer={path:window.location.pathname,title:document.title,name:null,routeName:""},t&&(this.referer.path=this.#h[t]?.route?.path||this.referer.path,this.referer.title=this.#h[t]?.route?.title||this.referer.title,this.referer.route=this.#h[t]?.route||null,this.referer.routeName=this.#h[t]?.routeName||"")}#f(t=null,e=!1){const s=t||window.location.href;if(t&&"object"==typeof i[t])return e?i[t]:t;for(const t in i){const r=i[t],o=this.parseUrl(window.location.origin+r.path,s);if(o.match)return i[t].variables=o.variables,e?i[t]:t}return"object"==typeof i["not-found"]?e?i["not-found"]:"not-found":null}getCurrent(){return this.#l}async update(){const t=this.#f();if(t){const e=i[t];this.#l=e,await l(n.templates.urlpath+e.template),document.title=t?e.title:""}}go(t,e=!1){if(window.location.href===t&&!e)return;const s=this.#f(t);if(s||!s&&e){const e={id:this.getHistoryLastId()+1},r=i[s]||{};if(s)e.page=r.name,e.routeName=s,e.route=r;else{if(!this.isURL(t))throw new Error("Route error: Route can't be force changed because "+t+" is not right url");e.page="No name",r.routeName="",e.route=null}this.#p(),window.history.pushState(e,s?r.title:e.name,t),this.#m(e),this.update(),setTimeout((()=>{"function"==typeof this.events.onChange&&this.events.onChange(e,this.referer)}),1)}}getHistoryLastId(){const t=Object.keys(this.#h);return t.length?+t[t.length-1]:0}#m(t){const e=this.#h;e[this.getHistoryLastId()+1]=t,this.#h=e}isURL(t){return new RegExp("^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,6}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?(\\#[-a-zA-Z\\d_]*)?$","i").test(t)}parseUrl(t,e){const s=t.replace(/\{[^\}]+\}/g,"([^/]+)"),r=new RegExp(`^${s}$`),o=e.match(r);if(o){const e=t.match(/\{[^\}]+\}/g),s={};return e&&e.forEach(((t,e)=>{const r=t.replace(/[{}]/g,"");s[r]=o[e+1]})),{variables:s,match:!0}}return{variables:{},match:!1}}};function d(t,e,s){if("function"!=typeof s||"string"!=typeof t||"string"!=typeof e&&e!==document&&e!==window)return;(t=t.toLowerCase()).includes(",")&&(t=t.replace(/\s+/g,"").split(","));const r="string"==typeof e?document:e;if(Array.isArray(t))for(const e of t)r.removeEventListener(e,o),r.addEventListener(e,o);else r.removeEventListener(t,o),r.addEventListener(t,o);function o(t){if(e!==document&&e!==window){if(t.target.matches(e)||t.target.closest(e)){const r=t.target.matches(e)?t.target:t.target.closest(e);s(t,r)}}else{const r=e===document?document:window;s(t,r)}}}function p(t){return document.querySelector(t)}function f(t){return document.querySelectorAll(t)}class m{config={};constructor(){this.config=n}}},834:(t,e,s)=>{s.d(e,{Z:()=>o});var r=s(276);class o{srcs;scripts;constructor(t){this.srcs=t?.srcs||[],this.scripts=t?.scripts||[],this.#y()}async#y(){if(this.srcs)for(const t of this.srcs)await this.#g(t);if(this.scripts)for(const t of this.scripts)await eval(t)}async#g(t){(0,r.hj)({url:t,success(t){eval(t)}})}}}},e={};function s(r){var o=e[r];if(void 0!==o)return o.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,s),n.exports}s.d=(t,e)=>{for(var r in e)s.o(e,r)&&!s.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var r={};(()=>{var t=s(276);const e={};function r(s,r){e[s]=r;let o=(0,t.bG)("#css-variables"),n=Object.keys(e).length?":root{":"";for(const t in e)n+=" --"+t+":"+e[t]+";";n+=n.length?"}":"",!o&&n&&(o=document.createElement("style"),o.id="css-variables",document.head.append(o)),o&&(o.textContent=n)}new t.Bl,new class{constructor(){this.#w()}#w(){t.Nd.events.onLoad=e=>{setTimeout((()=>{const s=document.querySelector("#page-loader-wrapper");s.style.opacity=0,(0,t.bG)("#rotate-error-wrapper")&&((0,t.bG)("#rotate-error-wrapper").style.display="");const o=(0,t.Rm)("#header .menu a");if(o)for(const s of o)t.Nd.parseUrl(window.location.origin+e.path,s.href).match&&s.classList.add("active");setTimeout((()=>{s.style.display="none";const e=(0,t.bG)("#header");e&&r("header-height",e.offsetHeight+"px")}),400)}),500)},t.Nd.events.onChange=(e,s)=>{setTimeout((()=>{const s=(0,t.Rm)("#header .menu a");if(s)for(const r of s)t.Nd.parseUrl(window.location.origin+e.route.path,r.href).match&&r.classList.add("active")}),50)},(0,t.B)("scroll,resize,orientationChange",window,(e=>{const s=(0,t.bG)("#header");s&&r("header-height",s.offsetHeight+"px")})),(0,t.B)("click","#header .burger-button",(function(e,s){const r=(0,t.bG)("#header");r.classList.contains("menu-is-open")?r.classList.remove("menu-is-open"):r.classList.add("menu-is-open")}))}}})()})();