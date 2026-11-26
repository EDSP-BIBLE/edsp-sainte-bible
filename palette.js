/* EDSP-Sainte Bible : couleurs partagées par admin.html, priere.html et sermon.html.
   La palette est celle choisie dans l'application (Plus > Couleurs). */
(function(){
var P={
"logo": {
"page": "linear-gradient(160deg,#1E3AE0 0%,#5B21B6 55%,#A0148C 100%)",
"pagel": "linear-gradient(160deg,#2F48DD 0%,#6A2BCB 55%,#AE1D98 100%)",
"fg": "#FFF8DA",
"mut": "#F7EEFF",
"gold": "#FFE680",
"line": "rgba(255,221,85,.45)",
"bar": "rgba(30,12,90,.92)",
"barl": "rgba(60,25,150,.92)",
"ccard": "#FFFBEA",
"cfg": "#1A0840",
"cmut": "#3B2A6E",
"cgold": "#5B21B6",
"cline": "rgba(26,8,64,.28)",
"cbtn": "#4B1AA8",
"con": "#FFF8DA",
"cerr": "#A30F2D",
"cborder": "#FFC81E",
"cardbg": "linear-gradient(145deg,#FFF8DA,#FFE9A8)",
"htmlbg": "#5B21B6"
},
"ocean": {
"page": "linear-gradient(160deg,#0A2A8F 0%,#0A5FA8 55%,#066A80 100%)",
"pagel": "linear-gradient(160deg,#1A55C4 0%,#0A72A6 55%,#096A84 100%)",
"fg": "#F3FBFF",
"mut": "#EAF8FD",
"gold": "#FFE08A",
"line": "rgba(255,209,102,.45)",
"bar": "rgba(5,30,90,.92)",
"barl": "rgba(10,60,140,.92)",
"ccard": "#F8FDFF",
"cfg": "#06233D",
"cmut": "#1F4A68",
"cgold": "#0B5FA5",
"cline": "rgba(6,35,61,.28)",
"cbtn": "#0B4F8A",
"con": "#F2FBFF",
"cerr": "#A30F2D",
"cborder": "#FFD166",
"cardbg": "linear-gradient(145deg,#F2FBFF,#CFF0FA)",
"htmlbg": "#0A5FA8"
},
"aurore": {
"page": "linear-gradient(160deg,#6D1B9A 0%,#B01655 55%,#B03A0A 100%)",
"pagel": "linear-gradient(160deg,#7E27A8 0%,#C21A64 55%,#B8420B 100%)",
"fg": "#FFF6EA",
"mut": "#FFF0E0",
"gold": "#FFE070",
"line": "rgba(255,213,74,.45)",
"bar": "rgba(70,10,80,.92)",
"barl": "rgba(110,25,120,.92)",
"ccard": "#FFFAF2",
"cfg": "#3A0D2E",
"cmut": "#5E2447",
"cgold": "#A3134E",
"cline": "rgba(58,13,46,.28)",
"cbtn": "#8E1250",
"con": "#FFF4E5",
"cerr": "#A30F2D",
"cborder": "#FFD54A",
"cardbg": "linear-gradient(145deg,#FFF4E5,#FFDDB8)",
"htmlbg": "#C2185B"
},
"foret": {
"page": "linear-gradient(160deg,#05402F 0%,#0A6E44 55%,#0C7A42 100%)",
"pagel": "linear-gradient(160deg,#0B6E49 0%,#0C7447 55%,#0D7544 100%)",
"fg": "#F4FFEB",
"mut": "#EEFADF",
"gold": "#FFE070",
"line": "rgba(255,212,59,.45)",
"bar": "rgba(4,40,26,.92)",
"barl": "rgba(8,80,50,.92)",
"ccard": "#FAFFF2",
"cfg": "#0B2A14",
"cmut": "#25502F",
"cgold": "#0B6B35",
"cline": "rgba(11,42,20,.28)",
"cbtn": "#0B5A2E",
"con": "#F4FFE8",
"cerr": "#A30F2D",
"cborder": "#FFD43B",
"cardbg": "linear-gradient(145deg,#F4FFE8,#D8F5B8)",
"htmlbg": "#0B7A4B"
},
"classic": {
"page": "linear-gradient(160deg,#2A190F 0%,#1E2A18 55%,#0F2A1C 100%)",
"pagel": "linear-gradient(160deg,#6A4A34 0%,#5A5A3E 50%,#4C6B4A 100%)",
"fg": "#E6DDBF",
"mut": "#BDB394",
"gold": "#D6B75C",
"line": "rgba(214,183,92,.38)",
"bar": "rgba(20,13,8,.92)",
"barl": "rgba(58,40,26,.93)",
"ccard": "#C4BC8C",
"cfg": "#1E1A10",
"cmut": "#2A2514",
"cgold": "#2E1E02",
"cline": "rgba(30,26,16,.28)",
"cbtn": "#26331F",
"con": "#E6DDBF",
"cerr": "#7A1A10",
"cborder": "#D6B75C",
"cardbg": "linear-gradient(145deg,#B4AA79,#9D9461)",
"htmlbg": "#1E2A18"
}
};
var p="logo";try{p=localStorage.getItem("edsp_palette")||"logo"}catch(e){}
if(!P[p])p="logo";
var r=document.documentElement;r.setAttribute("data-palette",p);
var css="";
Object.keys(P).forEach(function(n){var d=P[n];
css+=':root[data-palette="'+n+'"]{--page:'+d.page+';--fg:'+d.fg+';--mut:'+d.mut+';--gold:'+d.gold+';--line:'+d.line+';--ink:'+d.cfg+';--cm:'+d.cmut+';--cl:'+d.cgold+';--btn:'+d.cbtn+';--on:'+d.con+';--cardbg:'+d.cardbg+';--err:'+d.cerr+';--card:'+d.ccard+'}\n';
css+=':root[data-palette="'+n+'"][data-theme="light"]{--page:'+d.pagel+'}\n'});
css+=':root[data-palette="classic"][data-theme="light"]{--fg:#F2EACF;--mut:#E8E0C2}\n';
Object.keys(P).forEach(function(n){var d=P[n];
css+=':root[data-palette="'+n+'"]{--bar2:'+d.bar+';--cborder:'+d.cborder+';--ccard:'+d.ccard+';--cline:'+d.cline+';--htmlbg:'+d.htmlbg+'}\n'});
css+='html{background:var(--htmlbg)}.card{border-color:var(--cborder)}'
+'input,textarea,select,.chip{background:var(--ccard);border-color:var(--cline)}'
+'button{background:var(--ccard);border-color:var(--cline)}'
+'.bn{background:var(--bar2)}.tabs button{background:var(--bar2);color:var(--fg)}';
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var m=document.querySelector('meta[name=theme-color]'),c=getComputedStyle(r).getPropertyValue("--htmlbg").trim();
if(m&&c)m.setAttribute("content",c);
})();
