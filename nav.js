/* EDSP-Sainte Bible : barre d'onglets en bas (5 entrées) + menu « Plus » */
(function(){
var FR={lire:"Lire",contenu:"Contenu",cours:"Cours",sermon:"Sermon",plus:"Plus",notes:"Mes notes et surlignages",taille:"Taille du texte",theme:"Changer le thème",lang:"English",out:"Se déconnecter",news:"Nouveautés",admin:"Espace super admin",close:"Fermer",priere:"Sujets de prière",plan:"Plans de lecture",ver:"Version",upd:"Une nouvelle version est disponible.",refresh:"Actualiser",pal:"Couleurs",p_logo:"Logo",p_ocean:"Océan",p_aurore:"Aurore",p_foret:"Forêt",p_classic:"Classique"};
var EN={lire:"Read",contenu:"Contents",cours:"Course",sermon:"Sermon",plus:"More",notes:"My notes and highlights",taille:"Text size",theme:"Switch theme",lang:"Français",out:"Log out",news:"What’s new",admin:"Super admin area",close:"Close",priere:"Prayer requests",plan:"Reading plans",ver:"Version",upd:"A new version is available.",refresh:"Refresh",pal:"Colours",p_logo:"Logo",p_ocean:"Ocean",p_aurore:"Dawn",p_foret:"Forest",p_classic:"Classic"};
function svg(p){return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var IC={
lire:'<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
contenu:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
cours:'<path d="M12 4 2.5 9 12 14l9.5-5z"/><path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5"/>',
sermon:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
plus:'<path d="M5 12h.01M12 12h.01M19 12h.01" stroke-width="3"/>'};
var PALS=[["logo","linear-gradient(135deg,#1E3AE0,#B5179E)"],["ocean","linear-gradient(135deg,#0A2A8F,#077C94)"],["aurore","linear-gradient(135deg,#6D1B9A,#C2410C)"],["foret","linear-gradient(135deg,#05402F,#0E8A4A)"],["classic","linear-gradient(135deg,#2A190F,#0F2A1C)"]];
function curPal(){var p="logo";try{p=localStorage.getItem("edsp_palette")||"logo"}catch(e){}return PALS.some(function(x){return x[0]===p})?p:"logo"}
function applyPal(p){var r=document.documentElement;if(p==="logo")r.removeAttribute("data-palette");else r.setAttribute("data-palette",p);
var m=document.querySelector('meta[name=theme-color]'),c=getComputedStyle(r).getPropertyValue("--htmlbg").trim();if(m&&c)m.setAttribute("content",c)}
function setPal(p){try{localStorage.setItem("edsp_palette",p)}catch(e){}applyPal(p)}
function palRow(L){var cur=curPal();return '<div class="r pr"><span>'+L.pal+'</span><span class="pz">'+PALS.map(function(p){return '<button type="button" data-p="'+p[0]+'" aria-label="'+L["p_"+p[0]]+'" aria-pressed="'+(p[0]===cur)+'" style="background:'+p[1]+'"></button>'}).join("")+'</span></div>'}
applyPal(curPal());
var css=document.createElement("style");
css.textContent=
"header.bar{justify-content:center}header.bar .tools{display:none!important}"+
"body.hasnav{padding-bottom:calc(4.6rem + env(safe-area-inset-bottom,0px))}"+
".ntab{position:fixed;left:0;right:0;bottom:0;z-index:6;display:flex;background:var(--bar);border-top:1px solid var(--line);padding:0 max(0px,calc((100% - 34rem)/2)) env(safe-area-inset-bottom,0px)}"+
".ntab button{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;min-height:3.6rem;padding:.4rem 0;border:0;border-radius:0;background:none;color:var(--mut);font:600 .72rem/1.1 system-ui,-apple-system,sans-serif}"+
".ntab button[aria-current=page]{color:var(--gold)}"+
".nsheet{position:fixed;z-index:7;right:max(.6rem,calc((100% - 34rem)/2 + .6rem));bottom:calc(4.2rem + env(safe-area-inset-bottom,0px));width:min(19rem,calc(100% - 1.2rem));background:var(--sheet);border:1px solid var(--line);border-radius:12px;padding:.3rem;box-shadow:0 6px 24px rgba(0,0,0,.5)}"+
".nsheet .r{display:flex;align-items:center;justify-content:space-between;gap:.5rem;width:100%;min-height:3rem;padding:0 .8rem;border:0;border-radius:8px;background:none;color:var(--fg);font:inherit;text-align:left}"+
".nsheet button.r:hover{background:rgba(255,255,255,.14)}"+
".nsheet .z{display:flex;gap:.4rem}.nsheet .z button{min-width:3rem;min-height:2.4rem;border:1px solid var(--line);border-radius:6px;background:none;color:var(--fg);font:inherit}"+
".ntab button{position:relative}"+
".ntab button.unread::after{content:\"\";position:absolute;top:.55rem;left:calc(50% + .45rem);width:.6rem;height:.6rem;border-radius:50%;background:#E5533D;border:2px solid var(--sheet)}"+
".nsheet .nb{background:#E5533D;color:#fff;border-radius:999px;min-width:1.4rem;height:1.4rem;line-height:1.4rem;text-align:center;font-size:.8rem;font-weight:700;padding:0 .35rem}"+
".nmodal{position:fixed;inset:0;z-index:9;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center}"+
".nmc{width:min(34rem,100%);max-height:80vh;overflow:auto;background:var(--cardbg);color:var(--cfg);border-radius:16px 16px 0 0;padding:1rem 1rem calc(1rem + env(safe-area-inset-bottom,0px));box-shadow:0 -4px 24px rgba(0,0,0,.5)}"+
".nmc h2{font:600 1.25rem Georgia,serif;margin:0 0 .5rem}"+
".nmc article{border-bottom:1px solid var(--cline);padding:.6rem 0}"+
".nmc small{display:block;opacity:.75}"+
".nmc p{white-space:pre-wrap;margin:.3rem 0;color:var(--cfg)}"+
".nmx{margin-top:.8rem;min-height:2.7rem;width:100%;border:0;border-radius:8px;background:var(--deep);color:var(--deept);font:600 1rem system-ui,sans-serif}"+
".nsheet .vf{padding:.45rem .8rem .5rem;font-size:.78rem;color:var(--mut)}"+
".nupd{position:fixed;z-index:10;left:.6rem;right:.6rem;top:calc(.6rem + env(safe-area-inset-top,0px));max-width:34rem;margin:0 auto;display:flex;align-items:center;gap:.6rem;background:var(--deep);color:var(--deept);border:1.5px solid var(--gold);border-radius:12px;padding:.6rem .8rem;box-shadow:0 4px 18px rgba(0,0,0,.5);font:600 .92rem system-ui,sans-serif}"+
".nupd span{flex:1}"+
".nupd button{min-height:2.4rem;border:0;border-radius:8px;padding:0 .9rem;font:600 .9rem system-ui,sans-serif;background:var(--btn);color:var(--on)}"+
".nupd button.x{background:none;color:var(--deept);padding:0 .4rem;font-size:1.1rem}"+
".nsheet hr{border:0;border-top:1px solid var(--line);margin:.2rem .4rem}";
css.textContent+=
/* Lecture : surlignage en bloc propre, au lieu de bandes cassées ligne par ligne */
".hx{padding:0}"+
".hx.hl1,.hx.hl2,.hx.hl3,.hx.hl4{display:block;padding:.2rem .45rem;margin:-.2rem -.45rem;border-radius:8px}"+
".v .t{hyphens:manual;overflow-wrap:break-word;min-width:0;text-align:left;text-wrap:pretty}"+
".v{padding:.4rem 0}.v .t{line-height:1.45}"+
/* Téléphone : plus de largeur pour le texte, numéro et étoile alignés sur la première ligne */
"@media (max-width:640px){"+
"main.wide{padding:1rem .7rem 2rem}"+
"#vs.card{padding:.1rem .75rem;border-radius:12px}"+
".v{gap:.55rem;padding:.4rem 0;align-items:flex-start}"+
".v .n{width:1.4rem;font-size:.75em;line-height:1.93;text-align:right}"+
".v .t{line-height:1.45}"+
".v .f{min-width:1.9rem;align-self:flex-start;padding:0;font-size:1.15em;line-height:1.26}"+
".ni{align-self:flex-start;font-size:.85em;line-height:1.7}"+
"}";
css.textContent+=".ntab[hidden],.nsheet[hidden]{display:none!important}";
css.textContent+="#splash{background:var(--splash)!important}#splash #nlogo{width:104px;height:104px;border-radius:24px;margin:0 0 1.2rem;box-shadow:0 6px 24px rgba(0,0,0,.45)}";
css.textContent+=".nsheet .pr{flex-direction:column;align-items:flex-start;justify-content:center;gap:.45rem;min-height:0;padding:.6rem .8rem}.nsheet .pz{display:flex;gap:.5rem}.nsheet .pz button{width:2.4rem;height:2.4rem;border-radius:50%;border:2px solid var(--line);padding:0;cursor:pointer}.nsheet .pz button[aria-pressed=true]{border-color:var(--fg);box-shadow:0 0 0 2px var(--gold)}";
document.head.appendChild(css);
var spl=document.getElementById("splash");
if(spl&&!document.getElementById("nlogo")){var lg=document.createElement("img");lg.id="nlogo";lg.src="icon-192.png";lg.alt="";lg.width=104;lg.height=104;spl.insertBefore(lg,spl.firstChild)}
var nav=document.createElement("nav");nav.className="ntab";nav.setAttribute("aria-label","Navigation");nav.hidden=true;
var sheet=document.createElement("div");sheet.className="nsheet";sheet.hidden=true;
document.body.appendChild(nav);document.body.appendChild(sheet);
var $=function(s){return document.querySelector(s)};
var T=function(){return document.documentElement.lang==="en"?EN:FR};
var sig="";
function build(){
var L=T(),k=["lire","contenu","cours","sermon","plus"];
nav.innerHTML=k.map(function(x){return '<button type="button" data-t="'+x+'"'+(x==="plus"?' aria-haspopup="true" aria-expanded="false"':'')+'>'+svg(IC[x])+'<span>'+L[x]+'</span></button>'}).join("");
sheet.innerHTML='<div id="nx"></div><button type="button" class="r" data-a="plan">'+L.plan+'</button><button type="button" class="r" data-a="priere">'+L.priere+'</button><button type="button" class="r" data-a="notes">'+L.notes+'</button><div class="r"><span>'+L.taille+'</span><span class="z"><button type="button" data-a="sm" aria-label="A−">A−</button><button type="button" data-a="bg" aria-label="A+">A+</button></span></div><button type="button" class="r" data-a="th">'+L.theme+'</button>'+palRow(L)+'<button type="button" class="r" data-a="lg">'+L.lang+'</button><hr><button type="button" class="r" data-a="out">'+L.out+'</button><div class="vf" id="nv"></div>';
fillExtras();
}
function active(){return $("#tcb")?1:$("#crb")?2:$("#nvb")?4:0}
function sync(){
var on=!!$("header.bar");nav.hidden=!on;document.body.classList.toggle("hasnav",on);
if(!on){sheet.hidden=true}
var s=document.documentElement.lang;if(s!==sig){sig=s;build()}
var a=active();nav.querySelectorAll("button").forEach(function(b,i){if(i===a)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
}
function closeSheet(){sheet.hidden=true;var p=nav.querySelector('[data-t=plus]');if(p)p.setAttribute("aria-expanded","false")}
function click(s){var e=$(s);if(e)e.click()}
nav.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var t=b.dataset.t;
if(t==="plus"){var o=sheet.hidden;sheet.hidden=!o;b.setAttribute("aria-expanded",String(o));return}
closeSheet();
if(t==="lire"){var r=$("#tcb")||$("#crb")||$("#nvb")||$("#bk0");if(r)r.click();else scrollTo(0,0)}
else if(t==="contenu"){if(!$("#tcb"))click("#tc");else scrollTo(0,0)}
else if(t==="cours"){if(!$("#crb"))click("#cr");else if($("#crl"))click("#crl");else scrollTo(0,0)}
else if(t==="sermon"){location.href="sermon.html"}});
sheet.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;if(b.dataset.p){setPal(b.dataset.p);build();return}var a=b.dataset.a;
if(a==="sm"||a==="bg"){click("#"+a);return}
closeSheet();
if(a==="notes"){if(!$("#nvb"))click("#nt")}
else if(a==="news")showNews();
else if(a==="admin")location.href="admin.html";
else if(a==="priere")location.href="priere.html";
else if(a==="plan")location.href="plan.html";
else if(a==="th")click("#th");
else if(a==="lg")click("#lg");
else if(a==="out"){try{sb.auth.signOut()}catch(x){}}});
document.addEventListener("click",function(e){if(!sheet.hidden&&!e.target.closest(".nsheet")&&!e.target.closest(".ntab"))closeSheet()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeSheet()});
var app=$("#app");if(app)new MutationObserver(sync).observe(app,{childList:true,subtree:true});

/* ---- Nouveautés, espace super admin et contenus modifiables (lus depuis Supabase) ---- */
var EX={admin:false,ann:[],ver:null},exKey="",applied=false,autoShown=false;
function esc2(x){return String(x==null?"":x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function seenId(){try{return +localStorage.getItem("edsp_ann_seen")||0}catch(e){return 0}}
function unread(){var s=seenId();return EX.ann.filter(function(a){return a.id>s}).length}
function fillExtras(){
var box=sheet.querySelector("#nx");if(!box)return;
var L=T(),n=unread(),h="";
if(EX.ann.length)h+='<button type="button" class="r" data-a="news">'+L.news+(n?'<span class="nb">'+n+'</span>':'')+'</button>';
if(EX.admin)h+='<button type="button" class="r" data-a="admin">'+L.admin+'</button>';
if(h)h+='<hr>';
box.innerHTML=h;
var vf=sheet.querySelector("#nv");if(vf)vf.textContent=EX.ver?L.ver+" "+EX.ver.version+" · "+new Date(EX.ver.updated_at).toLocaleDateString(document.documentElement.lang==="en"?"en-GB":"fr-FR",{day:"numeric",month:"short",year:"numeric"}):"";
var pb=nav.querySelector("[data-t=plus]");if(pb)pb.classList.toggle("unread",n>0);
}
function showNews(){
if($(".nmodal"))return;
var L=T(),m=document.createElement("div"),loc=document.documentElement.lang==="en"?"en-GB":"fr-FR";
m.className="nmodal";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-label",L.news);
m.innerHTML='<div class="nmc"><h2>'+L.news+'</h2>'+EX.ann.map(function(a){return '<article><b>'+esc2(a.titre)+'</b><small>'+new Date(a.created_at).toLocaleDateString(loc,{day:"numeric",month:"long",year:"numeric"})+'</small><p>'+esc2(a.contenu)+'</p></article>'}).join("")+'<button type="button" class="nmx">'+L.close+'</button></div>';
document.body.appendChild(m);
function key(e){if(e.key==="Escape")close()}
function close(){m.remove();document.removeEventListener("keydown",key);try{localStorage.setItem("edsp_ann_seen",String(Math.max.apply(null,EX.ann.map(function(a){return a.id}).concat([0]))))}catch(e){}fillExtras()}
m.addEventListener("click",function(e){if(e.target===m||e.target.classList.contains("nmx"))close()});
document.addEventListener("keydown",key);
m.querySelector(".nmx").focus();
}
function mergeC(base,d){var o=Object.assign({},base||{},d||{});Object.keys(d||{}).forEach(function(k){if(Array.isArray(d[k])&&!d[k].length)delete o[k]});return o}
function applyContent(rows){
if(typeof INTRO==="undefined"||typeof COURS==="undefined")return false;
var ch=false;
rows.slice().sort(function(a,b){return a.cle<b.cle?-1:1}).forEach(function(r){var m;
if(m=/^intro:([A-Z0-9]{3})$/.exec(r.cle)){INTRO[m[1]]=mergeC(INTRO[m[1]],r.donnees);ch=true}
else if(m=/^cours:(\d{1,2})$/.exec(r.cle)){var i=+m[1],o=mergeC(COURS[i],r.donnees);if(i<COURS.length)COURS[i]=o;else COURS.push(o);ch=true}
});
return ch}
function initExtras(){
if(typeof sb==="undefined"||!sb||!sb.auth||typeof sb.auth.getSession!=="function")return;
sb.auth.getSession().then(function(r){var ses=r&&r.data&&r.data.session;
if(!ses){EX={admin:false,ann:[],ver:null};exKey="";fillExtras();return}
if(exKey===ses.user.id)return;exKey=ses.user.id;
Promise.all([sb.rpc("est_admin"),sb.from("annonces").select("id,titre,contenu,created_at").eq("publie",true).order("created_at",{ascending:false}).limit(20),sb.from("contenus").select("cle,donnees"),sb.from("app_info").select("version,updated_at").eq("id",1).limit(1)]).then(function(a){
EX.admin=!!(a[0]&&a[0].data===true);EX.ann=(a[1]&&a[1].data)||[];EX.ver=(a[3]&&a[3].data&&a[3].data[0])||null;
var changed=false;if(!applied){applied=true;changed=applyContent((a[2]&&a[2].data)||[])}
fillExtras();
if(changed&&typeof render==="function"){try{render()}catch(e){}}
if(unread()>0&&!autoShown){autoShown=true;setTimeout(showNews,600)}
}).catch(function(){})
}).catch(function(){})
}
if(typeof sb!=="undefined"&&sb&&sb.auth&&sb.auth.onAuthStateChange)sb.auth.onAuthStateChange(function(){setTimeout(initExtras,50)});
setTimeout(initExtras,300);
function showUpdate(v){
if($(".nupd"))return;
var L=T(),d=document.createElement("div");d.className="nupd";d.setAttribute("role","status");
d.innerHTML='<span>'+L.upd+' ('+esc2(v)+')</span><button type="button" class="go">'+L.refresh+'</button><button type="button" class="x" aria-label="'+L.close+'">✕</button>';
d.querySelector(".go").onclick=function(){location.reload()};
d.querySelector(".x").onclick=function(){d.remove()};
document.body.appendChild(d);
}
function checkVersion(){
if(!exKey||typeof sb==="undefined"||!sb)return;
sb.from("app_info").select("version,updated_at").eq("id",1).limit(1).then(function(r){
var v=r&&r.data&&r.data[0];if(!v||!EX.ver)return;
if(v.version!==EX.ver.version){EX.ver=v;fillExtras();showUpdate(v.version)}
}).catch(function(){})
}
document.addEventListener("visibilitychange",function(){if(!document.hidden)checkVersion()});
setInterval(checkVersion,600000);


sync();
})();
