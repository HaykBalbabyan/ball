(()=>{"use strict";var t={276:(t,e,s)=>{s.d(e,{hj:()=>i,bG:()=>l,Rm:()=>d,B:()=>u,Lp:()=>h,yu:()=>a});class n{#t;#e;constructor(t){this.#t={url:t.url,method:(t.method??"get").toUpperCase(),data:t.data??{},success:t.success??(()=>{}),error:t.error??(()=>{}),beforeSend:t.beforeSend??(()=>{}),contentType:t.contentType??""},this.#e="",this.#t.data&&(this.#e=this.#s(this.#t.data),this.#t.contentType=this.#t.contentType?this.#t.contentType:"application/x-www-form-urlencoded")}#s(t,e=""){const s=[];for(const n in t)if(t.hasOwnProperty(n)){const o=e?`${e}[${n}]`:n;if("object"!=typeof t[n]||Array.isArray(t[n]))Array.isArray(t[n])?t[n].forEach(((t,e)=>{if("object"!=typeof t||Array.isArray(t))s.push(`${o}[${e}]=${encodeURIComponent(t)}`);else{const n=this.#s(t,`${o}[${e}]`);s.push(n)}})):s.push(`${o}=${encodeURIComponent(t[n])}`);else{const e=this.#s(t[n],o);s.push(e)}}return s.join("&")}async send(){this.#t.beforeSend();let t=null;const e=new XMLHttpRequest;this.#t.url+="POST"!==this.#t.method&&this.#e?"?"+this.#e:"",e.open(this.#t.method,this.#t.url,!0,"",""),this.#t.contentType&&e.setRequestHeader("Content-Type",this.#t.contentType),e.send(this.#e);const s=this;e.onreadystatechange=await(function(){if(4===this.readyState){t={statusCode:e.status,statusText:e.statusText};try{t.response=JSON.parse(e.responseText)}catch(s){t.response=e.responseText}200===this.status?s.#t.success(t.response,t):s.#t.error(t.response,t)}})}}var o=s(834);const r=JSON.parse('{"controller":{"name":"Dashboard","path":"/controller","template":"/controller.html","title":"Controller"},"dashboard":{"name":"Dashboard","path":"/","template":"/dashboard.html","title":"Dashboard"},"not-found":{"name":"Not found","template":"/not-found.html","title":"404 Not found"}}');async function i(t){return await new n(t).send()}async function a(t){return await new o.Z(t)}const c=new class{#n={};#o={};#r;constructor(){this.#r=document.querySelector("#app")}async getContent(t,e=null){const s=this;this.#n[t]?await this.#i(this.#n[t],t,e):await i({url:t,method:"get",async success(n){s.#n[t]=n,await s.#i(n,t,e)}})}#i(t,e,s=null){const n=this,o=(new DOMParser).parseFromString(t,"text/html"),r=o.querySelectorAll("script");if(this.#a(e),this.#o[e])for(const t in this.#o[e])this.#c(this.#o[e][t],t,e);else{this.#o[e]={};const t=o.querySelectorAll("style");for(const s of t){if(s.getAttribute("src"))i({url:s.getAttribute("src"),success(t){n.#o[e][s.getAttribute("src")]={code:t},n.#c(n.#o[e][s.getAttribute("src")],s.getAttribute("src"),e)}});else if(s.textContent){const t=(""+Math.random()).replace("0.","");n.#o[e][t]={code:s.textContent},n.#c(n.#o[e][t],t,e)}s.remove()}}s?s.innerHTML=o.body.innerHTML:this.#r.innerHTML=o.body.innerHTML,Array.from(r).map((t=>{t.src&&t.src.includes(".js")?a({srcs:[t.src]}):a({scripts:[t.textContent]})}))}#c(t,e,s){const n=document.createElement("style"),o="style-id-"+(""+Math.random()).replace("0.","");n.id=o,n.textContent=t.code,this.#o[s][e].id=o,document.head.append(n)}#a(t){for(const e in this.#o)if(e!==t&&Object.keys(this.#o[e]).length)for(const t of Object.values(this.#o[e]))document.querySelector("#"+t.id).remove()}};async function h(t,e){await c.getContent(t,e)}function u(t,e,s,n={}){if("function"!=typeof s||"string"!=typeof t||"string"!=typeof e&&e!==document&&e!==window)return;(t=t.toLowerCase()).includes(",")&&(t=t.replace(/\s+/g,"").split(","));const o="string"==typeof e?document:e;if(Array.isArray(t))for(const e of t)o.removeEventListener(e,r,n),o.addEventListener(e,r,n);else o.removeEventListener(t,r,n),o.addEventListener(t,r,n);function r(t){if(e!==document&&e!==window){if(t.target.matches(e)||t.target.closest(e)){const n=t.target.matches(e)?t.target:t.target.closest(e);s(t,n)}}else{const n=e===document?document:window;s(t,n)}}}function l(t){return document.querySelector(t)}function d(t){return document.querySelectorAll(t)}new class{#h={};#u=null;referer={};events={onLoad:t=>{},onChange:(t,e)=>{}};constructor(){this.#l()}async#l(){this.referer=null,await this.update(),this.#d(),this.events.onLoad(this.#u)}#d(){window.addEventListener("popstate",(t=>{this.update(),this.#p(),setTimeout((()=>{"function"==typeof this.events.onChange&&this.events.onChange(t.state,this.referer)}),1)})),document.addEventListener("click",(t=>{const e=t.target;if(e.matches("a[router]")||e.closest("a[router]")){const s=e.matches("a[router]")?e:e.closest("a[router]");if(!s.href)return;t.preventDefault(),this.go(s.href)}}))}#p(){const t=this.getHistoryLastId();this.referer={path:window.location.pathname,title:document.title,name:null,routeName:""},t&&(this.referer.path=this.#h[t]?.route?.path||this.referer.path,this.referer.title=this.#h[t]?.route?.title||this.referer.title,this.referer.route=this.#h[t]?.route||null,this.referer.routeName=this.#h[t]?.routeName||"")}#f(t=null,e=!1){const s=t||window.location.href;if(t&&"object"==typeof r[t])return e?r[t]:t;for(const t in r){const n=r[t],o=this.parseUrl(window.location.origin+n.path,s);if(o.match)return r[t].variables=o.variables,e?r[t]:t}return"object"==typeof r["not-found"]?e?r["not-found"]:"not-found":null}getCurrent(){return this.#u}async update(){const t=this.#f();if(t){const e=r[t];this.#u=e,await h("https://ball.infinitycloud.ru/public"+e.template),document.title=t?e.title:""}}go(t,e=!1){if(window.location.href===t&&!e)return;const s=this.#f(t);if(s||!s&&e){const e={id:this.getHistoryLastId()+1},n=r[s]||{};if(s)e.page=n.name,e.routeName=s,e.route=n;else{if(!this.isURL(t))throw new Error("Route error: Route can't be force changed because "+t+" is not right url");e.page="No name",n.routeName="",e.route=null}this.#p(),window.history.pushState(e,s?n.title:e.name,t),this.#m(e),this.update(),setTimeout((()=>{"function"==typeof this.events.onChange&&this.events.onChange(e,this.referer)}),1)}}getHistoryLastId(){const t=Object.keys(this.#h);return t.length?+t[t.length-1]:0}#m(t){const e=this.#h;e[this.getHistoryLastId()+1]=t,this.#h=e}isURL(t){return new RegExp("^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,6}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?(\\#[-a-zA-Z\\d_]*)?$","i").test(t)}parseUrl(t,e){const s=t.replace(/\{[^\}]+\}/g,"([^/]+)"),n=new RegExp(`^${s}$`),o=e.match(n);if(o){const e=t.match(/\{[^\}]+\}/g),s={};return e&&e.forEach(((t,e)=>{const n=t.replace(/[{}]/g,"");s[n]=o[e+1]})),{variables:s,match:!0}}return{variables:{},match:!1}}}},834:(t,e,s)=>{s.d(e,{Z:()=>o});var n=s(276);class o{srcs;scripts;constructor(t){this.srcs=t?.srcs||[],this.scripts=t?.scripts||[],this.#y()}async#y(){if(this.srcs)for(const t of this.srcs)await this.#w(t);if(this.scripts)for(const t of this.scripts)await eval(t)}async#w(t){await(0,n.hj)({url:t,success(t){eval(t)}})}}}},e={};function s(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,s),r.exports}s.d=(t,e)=>{for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};(()=>{var t=s(276);const e={};function n(s,n){e[s]=n;let o=(0,t.bG)("#css-variables"),r=Object.keys(e).length?":root{":"";for(const t in e)r+=" --"+t+":"+e[t]+";";r+=r.length?"}":"",!o&&r&&(o=document.createElement("style"),o.id="css-variables",document.head.append(o)),o&&(o.textContent=r)}new class{constructor(){this.#g(),this.#b()}#g(){document.addEventListener("DOMContentLoaded",(e=>{setTimeout((()=>{const s=document.querySelector("#page-loader-wrapper");s.style.opacity=0,(0,t.bG)("#rotate-error-wrapper")&&((0,t.bG)("#rotate-error-wrapper").style.display="");const o=(0,t.Rm)("#header .menu a");if(o)for(const t of o)router.parseUrl(window.location.origin+e.path,t.href).match&&t.classList.add("active");setTimeout((()=>{s.style.display="none";const e=(0,t.bG)("#header");e&&n("header-height",e.offsetHeight+"px")}),400)}),500)})),(0,t.B)("scroll,resize,orientationChange",window,(e=>{const s=(0,t.bG)("#header");s&&n("header-height",s.offsetHeight+"px")})),(0,t.B)("click","#header .burger-button",(function(e,s){const n=(0,t.bG)("#header");n.classList.contains("menu-is-open")?n.classList.remove("menu-is-open"):n.classList.add("menu-is-open")})),(0,t.B)("contextMenu",document,(function(t){t.preventDefault()})),(0,t.B)("touchMove",document,(function(t){1!==t.scale&&t.preventDefault()}),{passive:!1});let e=0;(0,t.B)("touchEnd",document,(function(t){const s=(new Date).getTime();s-e<=300&&t.preventDefault(),e=s}),!1)}#b(){const e=this;let s=null,n=null;const o=window.matchMedia("(any-hover: none)").matches,r=o?"touchStart":"mouseDown",i=o?"touchEnd":"mouseUp";(0,t.B)(r,".controller-wrapper .control-button",(function(o,r){if(r?.dataset?.isBrake)s=null,n=null;else{const t=r?.dataset?.direction;s="forward"===t||"backward"===t?t:s,n="right"===t||"left"===t?t:n}(0,t.bG)(".temp").textContent="Directions: "+s+" "+n,e.#v(s,n)})),(0,t.B)(i,".controller-wrapper .control-button",(function(o,r){const i=r?.dataset?.direction;s="forward"===i||"backward"===i?null:s,n="right"===i||"left"===i?null:n,(0,t.bG)(".temp").textContent="Directions: "+s+" "+n,e.#v(s,n)})),o||(0,t.B)(i,".controller-wrapper",(function(o,r){r?.dataset?.isBrake||(s=null,n=null,(0,t.bG)(".temp").textContent="Directions: "+s+" "+n,e.#v(s,n))}))}#v(e,s){const n=s||e,o=n?"/move-"+n:"/brake";(0,t.hj)({url:o,success(t){}})}}})()})();