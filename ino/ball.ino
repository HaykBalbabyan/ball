#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

const char* ssid = "ball_controller (192.168.4.1)";
const char* password = "BC_12345678";

ESP8266WebServer server(80);

byte d5 = 14;
byte d6 = 12;
byte d7 = 13;
byte d8 = 15;

bool LEDstatus = LOW;

String direction = "";

void setup() {
  Serial.begin(9600);
  delay(100);
  pinMode(D4, OUTPUT);
  pinMode(d5,OUTPUT);
  pinMode(d6,OUTPUT);
  pinMode(d7,OUTPUT);
  pinMode(d8,OUTPUT);

  WiFi.softAP(ssid, password);

  updateAPMode();
}

void loop() {
  server.handleClient();

  move();

  updateAPMode();
}

void updateAPMode(){
  if (WiFi.softAPgetStationNum() == 0){
    direction = "";

    Serial.println("No one are connected to");
    Serial.println(ssid);

    Serial.println("Waiting conection...");
    Serial.println("");

    while (WiFi.softAPgetStationNum() == 0) {
      delay(300);
      digitalWrite(D4, !LEDstatus);
      Serial.print(".");

      LEDstatus = !LEDstatus;
    }
    Serial.println("");
    Serial.println("Someone connected..!");
    Serial.print("Got IP: ");
    Serial.println(WiFi.softAPIP());
    digitalWrite(D4, !LOW);

    routes();

    server.begin();
    Serial.println("HTTP Server Started");

    delay(1200);

    LEDstatus = HIGH;
    digitalWrite(D4, !LOW);
    delay(500);
    digitalWrite(D4, !LEDstatus);
  }
}

String sendJson(DynamicJsonDocument& data) {
  String json;
  serializeJson(data, json);
  return json;
}

void move(){
  if (direction == "") {
    digitalWrite(d5, 0);
    digitalWrite(d6, 0);
    digitalWrite(d7, 0);
    digitalWrite(d8, 0);
  } else if (direction == "right") {
    digitalWrite(d5, 0);
    digitalWrite(d6, 1);
    digitalWrite(d7, 0);
    digitalWrite(d8, 1);
  } else if (direction == "left") {
    digitalWrite(d5, 1);
    digitalWrite(d6, 0);
    digitalWrite(d7, 1);
    digitalWrite(d8, 0);
  } else if (direction == "forward") {
    digitalWrite(d5, 0);
    digitalWrite(d6, 1);
    digitalWrite(d7, 1);
    digitalWrite(d8, 0);
  } else if (direction == "backward") {
    digitalWrite(d5, 1);
    digitalWrite(d6, 0);
    digitalWrite(d7, 0);
    digitalWrite(d8, 1);
  } else {
    digitalWrite(d5, 0);
    digitalWrite(d6, 0);
    digitalWrite(d7, 0);
    digitalWrite(d8, 0);
  }
}


void routes(){
  server.on("/", route_main);
  server.on("/move-right", route_move_right);
  server.on("/move-left", route_move_left);
  server.on("/move-forward", route_move_forward);
  server.on("/move-backward", route_move_backward);
  server.on("/brake", route_brake);
  server.onNotFound(route_main); // If route not found
}


void route_move_right() {
  direction = "right";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_move_left() {
  direction = "left";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_move_forward() {
  direction = "forward";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_move_backward() {
  direction = "backward";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_brake() {
  direction = "";
  Serial.println("direction: Brake");

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}

void route_main(){
  server.send(200, "text/html", render_main_page());
}

String render_main_page(){
  String html = "<!DOCTYPE html><html lang=\"en\"><head><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta charset=\"UTF-8\"><title>Title</title><style>@keyframes spinner-spin{0%{transform:rotate(45deg)}to{transform:rotate(405deg)}}#page-loader-wrapper{z-index:99999999;position:fixed;width:100%;height:100%;background:#fff;display:flex;align-items:center;justify-content:center;transition:.3s}#page-loader-wrapper .loader{width:60px;height:auto;aspect-ratio:1;border:7px solid #221f39;border-top-color:transparent;border-radius:50%;animation:1.3s cubic-bezier(.41,.12,.43,.86) 0s infinite spinner-spin}</style><style>@font-face{font-family:josefin-sans;src:url(https://ball.infinitycloud.ru/public/assets/fonts/josefin-sans-regular.woff2) format(\"woff2\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:josefin-sans;src:url(https://ball.infinitycloud.ru/public/assets/fonts/josefin-sans-semibold.woff2) format(\"woff2\");font-weight:600;font-style:normal;font-display:swap}article,aside,audio,blockquote,body,button,dd,details,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,html,input,li,main,mark,menu,nav,ol,p,section,span,summary,table,td,textarea,th,time,ul,video{margin:0;padding:0;outline:0;box-sizing:border-box}svg{fill:currentColor}a{text-decoration-color:#5994eb}html{font-family:josefin-sans,sans-serif}@media (orientation:portrait){html{overflow:hidden}}body{overflow-x:hidden;background:#e7effb;background:url(https://ball.infinitycloud.ru/public/assets/images/globes-3d.png);background-size:70%}#rotate-error-wrapper{z-index:-999;opacity:0;position:fixed;transition:.3s;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;padding:30px;text-align:center;gap:30px}#rotate-error-wrapper svg{width:40vw;height:auto;aspect-ratio:1;animation:4s ease-in-out 0s infinite rotate-device}@media (orientation:portrait){#rotate-error-wrapper{z-index:999;opacity:1;background:#dfdfdf}}@keyframes rotate-device{0%,90%,to{transform:rotate(0)}30%,80%{transform:rotate(-90deg)}}input[type=range]{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:100%;height:20px;border-radius:10px}input[type=range]::-webkit-slider-runnable-track{width:100%;height:20px;background:#eff3f8;border:1px solid #0d0c14;border-radius:10px}input[type=range]::-moz-range-track{width:100%;height:20px;background:#eff3f8;border:1px solid #0d0c14;border-radius:10px}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;background:#5994eb;border-radius:50%;cursor:pointer}input[type=range]::-moz-range-thumb{width:18px;height:18px;background:#5994eb;border-radius:50%;cursor:pointer}input[type=range]:active::-webkit-slider-thumb{background:#5775ca}input[type=range]:active::-moz-range-thumb{background:#5775ca}select{appearance:none;-webkit-appearance:none;-moz-appearance:none;width:200px;padding:8px;border-radius:4px;border:1px solid #ccc;background-color:#f2f2f2;cursor:pointer}select:focus{outline:0}select option{padding:8px;background-color:#fff;color:#333}select option:hover{background-color:#f2f2f2}#header{display:flex;gap:16px;align-items:center;padding-right:16px;background:#0d0c14;color:#fff;position:sticky;top:0;z-index:5}#header .version{margin-left:auto;color:#fff;text-decoration-color:#5994eb}#header .burger-button{display:flex;align-items:center;justify-content:center;padding:12px;border:0;border-right:1px solid #272641;background:0 0}#header .burger-button svg{width:16px;height:16px;fill:#fff}#header .burger-button .xmark{display:none}#header .menu{transform:translate(-100%);transition:.3s;position:fixed;height:calc(100% - var(--header-height));z-index:5;background:#0d0c14;top:var(--header-height);border-top:1px solid #272641;padding-top:8px}#header .menu ul{list-style:none}#header .menu ul li{display:flex}#header .menu ul a{padding:8px 16px;width:100%;display:flex;align-items:center;gap:10px;color:#fff;text-decoration-color:#fff}#header .menu ul a svg{fill:#fff}#header .menu ul a.active{text-decoration-color:#5994eb}#header .menu ul a.active svg{fill:#5994eb}#header.menu-is-open .menu{transform:translate(0)}#header.menu-is-open .burger-button .bars{display:none}#header.menu-is-open .burger-button .xmark{display:initial}body{touch-action:manipulation;zoom:reset}.controller-wrapper{padding:20px 50px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.controller-wrapper .inline{display:flex;justify-content:space-between;margin-bottom:20px}.controller-wrapper .side{width:50%}.controller-wrapper .left-side{display:flex;justify-content:flex-start;align-items:center}.controller-wrapper .left-side .bar{display:flex;align-items:center;justify-content:center;transform:rotate(-90deg)}.controller-wrapper .left-side input[type=range]{width:100%}.controller-wrapper .right-side{justify-content:flex-end;display:flex}.controller-wrapper .center{display:flex;justify-content:center;align-items:flex-end}.controller-wrapper .buttons{display:flex;gap:16px}.controller-wrapper .buttons.column{flex-direction:column}.controller-wrapper .buttons.column button{width:auto;height:90px;aspect-ratio:2}.controller-wrapper .buttons.row{flex-direction:row}.controller-wrapper .buttons.row button{width:90px;height:auto;aspect-ratio:.5}.controller-wrapper .control-button{border:1px solid #0d0c14;background:#eff3f8;border-radius:20px;padding:20px}.controller-wrapper .control-button:active{background:#e7ebf0}</style></head><body><div id=\"page-loader-wrapper\"><div class=\"loader\"></div></div><main id=\"app\"><div id=\"rotate-error-wrapper\" style=\"display:none\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" width=\"80\" height=\"80\"><path d=\"M96 32C78.3 32 64 46.3 64 64V448c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H96zM32 64C32 28.7 60.7 0 96 0H288c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V64zM160 400h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z\"/></svg><h1>Please rotate your device!</h1></div><header id=\"header\"><p class=\"page-name\">Ball Controller</p><a href=\"https://github.com/HaykBalbabyan/ball/releases/tag/1.0.2\" class=\"version\" target=\"_blank\">V1.0.2</a></header></main><section class=\"controller-wrapper\"><div class=\"inline\"><div class=\"left-side side\"><div class=\"buttons column\"><button class=\"forward control-button\" data-direction=\"forward\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" width=\"35\" height=\"35\"><path d=\"M209.4 39.4C204.8 34.7 198.6 32 192 32s-12.8 2.7-17.4 7.4l-168 176c-9.2 9.6-8.8 24.8.8 33.9s24.8 8.8 33.9-.8L168 115.9V456c0 13.3 10.7 24 24 24s24-10.7 24-24V115.9L342.6 248.6c9.2 9.6 24.3 9.9 33.9.8s9.9-24.3.8-33.9l-168-176z\"/></svg></button> <button class=\"backward control-button\" data-direction=\"backward\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" width=\"35\" height=\"35\"><path d=\"M174.6 472.6c4.5 4.7 10.8 7.4 17.4 7.4s12.8-2.7 17.4-7.4l168-176c9.2-9.6 8.8-24.8-.8-33.9s-24.8-8.8-33.9.8L216 396.1 216 56c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 340.1L41.4 263.4c-9.2-9.6-24.3-9.9-33.9-.8s-9.9 24.3-.8 33.9l168 176z\"/></svg></button></div></div><div class=\"center\"><div class=\"buttons\"><button class=\"brake control-button\" data-is-brake><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\" width=\"35\" height=\"35\"><path d=\"M96 256a224 224 0 1 1 448 0A224 224 0 1 1 96 256zM344 152c0-13.3-10.7-24-24-24s-24 10.7-24 24V264c0 13.3 10.7 24 24 24s24-10.7 24-24V152zM320 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM91.1 109C63.8 151.4 48 201.8 48 256s15.8 104.6 43.1 147c7.2 11.1 4 26-7.2 33.2s-26 4-33.2-7.2C18.6 379.1 0 319.7 0 256S18.6 132.9 50.7 83c7.2-11.1 22-14.4 33.2-7.2s14.4 22 7.2 33.2zM589.3 83C621.4 132.9 640 192.3 640 256s-18.6 123.1-50.7 173c-7.2 11.1-22 14.4-33.2 7.2s-14.4-22-7.2-33.2c27.3-42.4 43.1-92.8 43.1-147s-15.8-104.6-43.1-147c-7.2-11.1-4-26 7.2-33.2s26-4 33.2 7.2z\"/></svg></button></div></div><div class=\"right-side side\"><div class=\"buttons row\"><button class=\"left control-button\" data-direction=\"left\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" width=\"35\" height=\"35\"><path d=\"M7.4 273.4C2.7 268.8 0 262.6 0 256s2.7-12.8 7.4-17.4l176-168c9.6-9.2 24.8-8.8 33.9.8s8.8 24.8-.8 33.9L83.9 232 424 232c13.3 0 24 10.7 24 24s-10.7 24-24 24L83.9 280 216.6 406.6c9.6 9.2 9.9 24.3.8 33.9s-24.3 9.9-33.9.8l-176-168z\"/></svg></button> <button class=\"right control-button\" data-direction=\"right\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" width=\"35\" height=\"35\"><path d=\"M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9.8s-8.8 24.8.8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9.8l176-168z\"/></svg></button></div></div></div><div class=\"temp\">Direction: none</div></section><script>(()=>{\"use strict\";var t={276:(t,e,s)=>{s.d(e,{hj:()=>i,bG:()=>l,Rm:()=>d,B:()=>u,Lp:()=>h,yu:()=>a});class n{#t;#e;constructor(t){this.#t={url:t.url,method:(t.method??\"get\").toUpperCase(),data:t.data??{},success:t.success??(()=>{}),error:t.error??(()=>{}),beforeSend:t.beforeSend??(()=>{}),contentType:t.contentType??\"\"},this.#e=\"\",this.#t.data&&(this.#e=this.#s(this.#t.data),this.#t.contentType=this.#t.contentType?this.#t.contentType:\"application/x-www-form-urlencoded\")}#s(t,e=\"\"){const s=[];for(const n in t)if(t.hasOwnProperty(n)){const o=e?`${e}[${n}]`:n;if(\"object\"!=typeof t[n]||Array.isArray(t[n]))Array.isArray(t[n])?t[n].forEach(((t,e)=>{if(\"object\"!=typeof t||Array.isArray(t))s.push(`${o}[${e}]=${encodeURIComponent(t)}`);else{const n=this.#s(t,`${o}[${e}]`);s.push(n)}})):s.push(`${o}=${encodeURIComponent(t[n])}`);else{const e=this.#s(t[n],o);s.push(e)}}return s.join(\"&\")}async send(){this.#t.beforeSend();let t=null;const e=new XMLHttpRequest;this.#t.url+=\"POST\"!==this.#t.method&&this.#e?\"?\"+this.#e:\"\",e.open(this.#t.method,this.#t.url,!0,\"\",\"\"),this.#t.contentType&&e.setRequestHeader(\"Content-Type\",this.#t.contentType),e.send(this.#e);const s=this;e.onreadystatechange=await(function(){if(4===this.readyState){t={statusCode:e.status,statusText:e.statusText};try{t.response=JSON.parse(e.responseText)}catch(s){t.response=e.responseText}200===this.status?s.#t.success(t.response,t):s.#t.error(t.response,t)}})}}var o=s(834);const r=JSON.parse('{\"controller\":{\"name\":\"Dashboard\",\"path\":\"/controller\",\"template\":\"/controller.html\",\"title\":\"Controller\"},\"dashboard\":{\"name\":\"Dashboard\",\"path\":\"/\",\"template\":\"/dashboard.html\",\"title\":\"Dashboard\"},\"not-found\":{\"name\":\"Not found\",\"template\":\"/not-found.html\",\"title\":\"404 Not found\"}}');async function i(t){return await new n(t).send()}async function a(t){return await new o.Z(t)}const c=new class{#n={};#o={};#r;constructor(){this.#r=document.querySelector(\"#app\")}async getContent(t,e=null){const s=this;this.#n[t]?await this.#i(this.#n[t],t,e):await i({url:t,method:\"get\",async success(n){s.#n[t]=n,await s.#i(n,t,e)}})}#i(t,e,s=null){const n=this,o=(new DOMParser).parseFromString(t,\"text/html\"),r=o.querySelectorAll(\"script\");if(this.#a(e),this.#o[e])for(const t in this.#o[e])this.#c(this.#o[e][t],t,e);else{this.#o[e]={};const t=o.querySelectorAll(\"style\");for(const s of t){if(s.getAttribute(\"src\"))i({url:s.getAttribute(\"src\"),success(t){n.#o[e][s.getAttribute(\"src\")]={code:t},n.#c(n.#o[e][s.getAttribute(\"src\")],s.getAttribute(\"src\"),e)}});else if(s.textContent){const t=(\"\"+Math.random()).replace(\"0.\",\"\");n.#o[e][t]={code:s.textContent},n.#c(n.#o[e][t],t,e)}s.remove()}}s?s.innerHTML=o.body.innerHTML:this.#r.innerHTML=o.body.innerHTML,Array.from(r).map((t=>{t.src&&t.src.includes(\".js\")?a({srcs:[t.src]}):a({scripts:[t.textContent]})}))}#c(t,e,s){const n=document.createElement(\"style\"),o=\"style-id-\"+(\"\"+Math.random()).replace(\"0.\",\"\");n.id=o,n.textContent=t.code,this.#o[s][e].id=o,document.head.append(n)}#a(t){for(const e in this.#o)if(e!==t&&Object.keys(this.#o[e]).length)for(const t of Object.values(this.#o[e]))document.querySelector(\"#\"+t.id).remove()}};async function h(t,e){await c.getContent(t,e)}function u(t,e,s,n={}){if(\"function\"!=typeof s||\"string\"!=typeof t||\"string\"!=typeof e&&e!==document&&e!==window)return;(t=t.toLowerCase()).includes(\",\")&&(t=t.replace(/\s+/g,\"\").split(\",\"));const o=\"string\"==typeof e?document:e;if(Array.isArray(t))for(const e of t)o.removeEventListener(e,r,n),o.addEventListener(e,r,n);else o.removeEventListener(t,r,n),o.addEventListener(t,r,n);function r(t){if(e!==document&&e!==window){if(t.target.matches(e)||t.target.closest(e)){const n=t.target.matches(e)?t.target:t.target.closest(e);s(t,n)}}else{const n=e===document?document:window;s(t,n)}}}function l(t){return document.querySelector(t)}function d(t){return document.querySelectorAll(t)}new class{#h={};#u=null;referer={};events={onLoad:t=>{},onChange:(t,e)=>{}};constructor(){this.#l()}async#l(){this.referer=null,await this.update(),this.#d(),this.events.onLoad(this.#u)}#d(){window.addEventListener(\"popstate\",(t=>{this.update(),this.#p(),setTimeout((()=>{\"function\"==typeof this.events.onChange&&this.events.onChange(t.state,this.referer)}),1)})),document.addEventListener(\"click\",(t=>{const e=t.target;if(e.matches(\"a[router]\")||e.closest(\"a[router]\")){const s=e.matches(\"a[router]\")?e:e.closest(\"a[router]\");if(!s.href)return;t.preventDefault(),this.go(s.href)}}))}#p(){const t=this.getHistoryLastId();this.referer={path:window.location.pathname,title:document.title,name:null,routeName:\"\"},t&&(this.referer.path=this.#h[t]?.route?.path||this.referer.path,this.referer.title=this.#h[t]?.route?.title||this.referer.title,this.referer.route=this.#h[t]?.route||null,this.referer.routeName=this.#h[t]?.routeName||\"\")}#f(t=null,e=!1){const s=t||window.location.href;if(t&&\"object\"==typeof r[t])return e?r[t]:t;for(const t in r){const n=r[t],o=this.parseUrl(window.location.origin+n.path,s);if(o.match)return r[t].variables=o.variables,e?r[t]:t}return\"object\"==typeof r[\"not-found\"]?e?r[\"not-found\"]:\"not-found\":null}getCurrent(){return this.#u}async update(){const t=this.#f();if(t){const e=r[t];this.#u=e,await h(\"https://ball.infinitycloud.ru/public\"+e.template),document.title=t?e.title:\"\"}}go(t,e=!1){if(window.location.href===t&&!e)return;const s=this.#f(t);if(s||!s&&e){const e={id:this.getHistoryLastId()+1},n=r[s]||{};if(s)e.page=n.name,e.routeName=s,e.route=n;else{if(!this.isURL(t))throw new Error(\"Route error: Route can't be force changed because \"+t+\" is not right url\");e.page=\"No name\",n.routeName=\"\",e.route=null}this.#p(),window.history.pushState(e,s?n.title:e.name,t),this.#m(e),this.update(),setTimeout((()=>{\"function\"==typeof this.events.onChange&&this.events.onChange(e,this.referer)}),1)}}getHistoryLastId(){const t=Object.keys(this.#h);return t.length?+t[t.length-1]:0}#m(t){const e=this.#h;e[this.getHistoryLastId()+1]=t,this.#h=e}isURL(t){return new RegExp(\"^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,6}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?(\\#[-a-zA-Z\\d_]*)?$\",\"i\").test(t)}parseUrl(t,e){const s=t.replace(/\{[^\}]+\}/g,\"([^/]+)\"),n=new RegExp(`^${s}$`),o=e.match(n);if(o){const e=t.match(/\{[^\}]+\}/g),s={};return e&&e.forEach(((t,e)=>{const n=t.replace(/[{}]/g,\"\");s[n]=o[e+1]})),{variables:s,match:!0}}return{variables:{},match:!1}}}},834:(t,e,s)=>{s.d(e,{Z:()=>o});var n=s(276);class o{srcs;scripts;constructor(t){this.srcs=t?.srcs||[],this.scripts=t?.scripts||[],this.#y()}async#y(){if(this.srcs)for(const t of this.srcs)await this.#w(t);if(this.scripts)for(const t of this.scripts)await eval(t)}async#w(t){await(0,n.hj)({url:t,success(t){eval(t)}})}}}},e={};function s(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,s),r.exports}s.d=(t,e)=>{for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};(()=>{var t=s(276);const e={};function n(s,n){e[s]=n;let o=(0,t.bG)(\"#css-variables\"),r=Object.keys(e).length?\":root{\":\"\";for(const t in e)r+=\" --\"+t+\":\"+e[t]+\";\";r+=r.length?\"}\":\"\",!o&&r&&(o=document.createElement(\"style\"),o.id=\"css-variables\",document.head.append(o)),o&&(o.textContent=r)}new class{constructor(){this.#g(),this.#b()}#g(){document.addEventListener(\"DOMContentLoaded\",(e=>{setTimeout((()=>{const s=document.querySelector(\"#page-loader-wrapper\");s.style.opacity=0,(0,t.bG)(\"#rotate-error-wrapper\")&&((0,t.bG)(\"#rotate-error-wrapper\").style.display=\"\");const o=(0,t.Rm)(\"#header .menu a\");if(o)for(const t of o)router.parseUrl(window.location.origin+e.path,t.href).match&&t.classList.add(\"active\");setTimeout((()=>{s.style.display=\"none\";const e=(0,t.bG)(\"#header\");e&&n(\"header-height\",e.offsetHeight+\"px\")}),400)}),500)})),(0,t.B)(\"scroll,resize,orientationChange\",window,(e=>{const s=(0,t.bG)(\"#header\");s&&n(\"header-height\",s.offsetHeight+\"px\")})),(0,t.B)(\"click\",\"#header .burger-button\",(function(e,s){const n=(0,t.bG)(\"#header\");n.classList.contains(\"menu-is-open\")?n.classList.remove(\"menu-is-open\"):n.classList.add(\"menu-is-open\")})),(0,t.B)(\"contextMenu\",document,(function(t){t.preventDefault()})),(0,t.B)(\"touchMove\",document,(function(t){1!==t.scale&&t.preventDefault()}),{passive:!1});let e=0;(0,t.B)(\"touchEnd\",document,(function(t){const s=(new Date).getTime();s-e<=300&&t.preventDefault(),e=s}),!1)}#b(){const e=this;let s=null,n=null;const o=window.matchMedia(\"(any-hover: none)\").matches,r=o?\"touchStart\":\"mouseDown\",i=o?\"touchEnd\":\"mouseUp\";(0,t.B)(r,\".controller-wrapper .control-button\",(function(o,r){if(r?.dataset?.isBrake)s=null,n=null;else{const t=r?.dataset?.direction;s=\"forward\"===t||\"backward\"===t?t:s,n=\"right\"===t||\"left\"===t?t:n}(0,t.bG)(\".temp\").textContent=\"Directions: \"+s+\" \"+n,e.#v(s,n)})),(0,t.B)(i,\".controller-wrapper .control-button\",(function(o,r){const i=r?.dataset?.direction;s=\"forward\"===i||\"backward\"===i?null:s,n=\"right\"===i||\"left\"===i?null:n,(0,t.bG)(\".temp\").textContent=\"Directions: \"+s+\" \"+n,e.#v(s,n)})),o||(0,t.B)(i,\".controller-wrapper\",(function(o,r){r?.dataset?.isBrake||(s=null,n=null,(0,t.bG)(\".temp\").textContent=\"Directions: \"+s+\" \"+n,e.#v(s,n))}))}#v(e,s){const n=s||e,o=n?\"/move-\"+n:\"/brake\";(0,t.hj)({url:o,success(t){}})}}})()})();</script></body></html>";
  
  return html;
}