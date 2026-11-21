/* EDSP-Sainte Bible : barre d'onglets en bas (5 entrées) + menu « Plus » */
(function(){
var FR={lire:"Lire",contenu:"Contenu",cours:"Cours",sermon:"Sermon",plus:"Plus",notes:"Mes notes et surlignages",taille:"Taille du texte",theme:"Changer le thème",lang:"English",out:"Se déconnecter"};
var EN={lire:"Read",contenu:"Contents",cours:"Course",sermon:"Sermon",plus:"More",notes:"My notes and highlights",taille:"Text size",theme:"Switch theme",lang:"Français",out:"Log out"};
function svg(p){return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var IC={
lire:'<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
contenu:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
cours:'<path d="M12 4 2.5 9 12 14l9.5-5z"/><path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5"/>',
sermon:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
plus:'<path d="M5 12h.01M12 12h.01M19 12h.01" stroke-width="3"/>'};
var css=document.createElement("style");
css.textContent=
"header.bar{justify-content:center}header.bar .tools{display:none!important}"+
"body.hasnav{padding-bottom:calc(4.6rem + env(safe-area-inset-bottom,0px))}"+
".ntab{position:fixed;left:0;right:0;bottom:0;z-index:6;display:flex;background:rgba(20,13,8,.96);border-top:1px solid var(--line);padding:0 max(0px,calc((100% - 34rem)/2)) env(safe-area-inset-bottom,0px)}"+
".ntab button{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;min-height:3.6rem;padding:.4rem 0;border:0;border-radius:0;background:none;color:var(--mut);font:600 .72rem/1.1 system-ui,-apple-system,sans-serif}"+
".ntab button[aria-current=page]{color:var(--gold)}"+
".nsheet{position:fixed;z-index:7;right:max(.6rem,calc((100% - 34rem)/2 + .6rem));bottom:calc(4.2rem + env(safe-area-inset-bottom,0px));width:min(19rem,calc(100% - 1.2rem));background:rgba(20,13,8,.98);border:1px solid var(--line);border-radius:12px;padding:.3rem;box-shadow:0 6px 24px rgba(0,0,0,.5)}"+
".nsheet .r{display:flex;align-items:center;justify-content:space-between;gap:.5rem;width:100%;min-height:3rem;padding:0 .8rem;border:0;border-radius:8px;background:none;color:var(--fg);font:inherit;text-align:left}"+
".nsheet button.r:hover{background:rgba(214,183,92,.14)}"+
".nsheet .z{display:flex;gap:.4rem}.nsheet .z button{min-width:3rem;min-height:2.4rem;border:1px solid var(--line);border-radius:6px;background:none;color:var(--fg);font:inherit}"+
".nsheet hr{border:0;border-top:1px solid var(--line);margin:.2rem .4rem}";
document.head.appendChild(css);
var nav=document.createElement("nav");nav.className="ntab";nav.setAttribute("aria-label","Navigation");nav.hidden=true;
var sheet=document.createElement("div");sheet.className="nsheet";sheet.hidden=true;
document.body.appendChild(nav);document.body.appendChild(sheet);
var $=function(s){return document.querySelector(s)};
var T=function(){return document.documentElement.lang==="en"?EN:FR};
var sig="";
function build(){
var L=T(),k=["lire","contenu","cours","sermon","plus"];
nav.innerHTML=k.map(function(x){return '<button type="button" data-t="'+x+'"'+(x==="plus"?' aria-haspopup="true" aria-expanded="false"':'')+'>'+svg(IC[x])+'<span>'+L[x]+'</span></button>'}).join("");
sheet.innerHTML='<button type="button" class="r" data-a="notes">'+L.notes+'</button><div class="r"><span>'+L.taille+'</span><span class="z"><button type="button" data-a="sm" aria-label="A−">A−</button><button type="button" data-a="bg" aria-label="A+">A+</button></span></div><button type="button" class="r" data-a="th">'+L.theme+'</button><button type="button" class="r" data-a="lg">'+L.lang+'</button><hr><button type="button" class="r" data-a="out">'+L.out+'</button>';
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
else if(t==="cours"){if(!$("#crb"))click("#cr");else scrollTo(0,0)}
else if(t==="sermon"){location.href="sermon.html"}});
sheet.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var a=b.dataset.a;
if(a==="sm"||a==="bg"){click("#"+a);return}
closeSheet();
if(a==="notes"){if(!$("#nvb"))click("#nt")}
else if(a==="th")click("#th");
else if(a==="lg")click("#lg");
else if(a==="out"){try{sb.auth.signOut()}catch(x){}}});
document.addEventListener("click",function(e){if(!sheet.hidden&&!e.target.closest(".nsheet")&&!e.target.closest(".ntab"))closeSheet()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeSheet()});
var app=$("#app");if(app)new MutationObserver(sync).observe(app,{childList:true,subtree:true});
sync();
})();
