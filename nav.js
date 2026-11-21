/* EDSP-Sainte Bible : barre de navigation en bas + bouton Sermon */
(function(){
var css=document.createElement("style");
css.textContent=
"header.bar{position:fixed!important;top:auto!important;bottom:0;left:0;right:0;border-bottom:0!important;border-top:1px solid var(--line);padding:.4rem .5rem calc(.4rem + env(safe-area-inset-bottom,0px))!important}"+
"header.bar>b{display:none}"+
"header.bar .tools{display:flex;flex-wrap:wrap;justify-content:space-around;gap:.25rem;width:100%}"+
"header.bar .tools button{margin-left:0!important;min-width:2.3rem;min-height:2.6rem;padding:0 .4rem;font-size:.85rem}"+
"body{padding-bottom:5rem}";
document.head.appendChild(css);
function inject(){
var t=document.querySelector("header.bar .tools");
if(!t||t.querySelector("#sr"))return;
var b=document.createElement("button");
b.id="sr";b.type="button";b.textContent="Sermon";
b.setAttribute("aria-label","Préparation du sermon");
b.onclick=function(){location.href="sermon.html"};
var c=t.querySelector("#cr");
t.insertBefore(b,c?c.nextSibling:null);
}
var app=document.getElementById("app");
if(app){new MutationObserver(inject).observe(app,{childList:true,subtree:true})}
inject();
})();
