async function a(t){await s({url:n+"/../site/contents/"+t+".html",method:"get",async success(t){await c(t)}})}async function c(t){const e=new DOMParser,r=e.parseFromString(t,"text/html"),n=r.querySelectorAll("script"),a=await Array.from(n).map((async t=>{if(t.src&&t.src.includes(".js")){let e="";return await s({url:t.src,method:"get",success(t){e=t}}),e}return t.textContent}));for(const t of n)t.remove();document.body.innerHTML=r.body.innerHTML;for(const t of a)eval(t)}