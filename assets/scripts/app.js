!function(){function e(){var e=document.getElementById("af-container"),a={};a.bg=document.getElementById("af-bg-color").value,a.accent=document.getElementById("af-accent-color").value,a.text=tinycolor(a.bg).isDark()?"white":"rgba(0, 0, 0, 0.8)",a.input_bg=tinycolor(a.bg).getBrightness()>246?"#ECECEC":"white",a.accent_darken=tinycolor(a.accent).darken(5),a.accent_text=tinycolor(a.accent_darken).isDark()?"white":"rgba(0, 0, 0, 0.8)";var n=S.styles,o=Mustache.render(n,a);t("af-styles",o),e.classList.toggle("af--dark",tinycolor(a.bg).isDark())}function t(e,t){var a=document.getElementById(e);a&&document.getElementsByTagName("head")[0].removeChild(a),a=document.createElement("style"),a.type="text/css",a.id=e,a.innerHTML=t,document.getElementsByTagName("head")[0].appendChild(a)}function a(){var e=window.innerWidth;document.body.classList.toggle("not-responsive-notice",e<980)}function n(e,t,a){var n=document.querySelectorAll(e);_(n).each(function(e){e.addEventListener(t,a)})}function o(e,t,a){var n=document.querySelectorAll(e);_(n).each(function(e){e.addEventListener(t,a)}),n.length>0&&a()}function r(e,t,a){e.addEventListener(t,function(e){return e.target.removeEventListener(e.type,arguments.callee),a(e)})}function c(){var e=document.getElementById("question-options");_(e.children).each(function(e,t){var a=e.querySelector("[data-reply]"),n=e.querySelector("[data-value]");a.name=a.id="id_form-"+t+"-reply",n.name=n.id="id_form-"+t+"-value"})}function d(e,t){if(!e.files||!e.files[0])return!1;var a=new FileReader;a.onload=function(e){t(e.target.result)},a.readAsDataURL(e.files[0])}document.body.dataset.pathName;window.addEventListener("resize",a,!0),a(),n("[data-synced-input]","keyup",function(e){var t=e.currentTarget,a=document.getElementById(t.dataset.syncedInput),n=t.value.trim();a.classList.toggle("clean",""===n),a.textContent=""===n?t.placeholder:n}),n("[data-password-toggle]","mousedown",function(e){var t=e.currentTarget.parentNode.getElementsByTagName("INPUT")[0];t.type="text"}),n("[data-password-toggle]","mouseup",function(e){var t=e.currentTarget.parentNode.getElementsByTagName("INPUT")[0];t.type="password"}),n("[data-parent-class-toggle]","click",function(e){var t=e.currentTarget;t.parentNode.classList.toggle(t.dataset.parentClassToggle)}),n("[data-close-parent]","click",function(e){var t=e.currentTarget;t.parentNode.style.display="none"}),n("[data-dropdown-toggle]","click",function(e){e.stopPropagation();var t=e.currentTarget.parentNode.classList,a="dropdown--opened";t.contains(a)?t.remove(a):(t.add(a),r(document,"click",function(){t.remove(a)}))}),n("[data-image-input] input[type='file']","change",function(e){var t=e.currentTarget,a=t.parentNode.querySelector("img");t.value?d(t,function(e){t.parentNode.classList.remove("clean"),a.src=e}):(t.parentNode.classList.add("clean"),a.src="")}),n("[data-proxy-click]","click",function(e){var t=e.currentTarget;document.querySelector(t.dataset.proxyClick).click()}),n("[data-unset]","click",function(e){var t=e.currentTarget,a=document.querySelector(t.dataset.unset);a.value="",a.dispatchEvent(new Event("change"))});var i=document.getElementById("med-logo-in");if(i){var l=document.getElementById("af-logos");i.addEventListener("change",function(){var e=document.getElementById("med-logo");e&&e.parentNode.removeChild(e),i.value&&d(i,function(e){var t=new Image;t.id="med-logo",t.src=e,l.appendChild(t)})})}var s=document.querySelectorAll("[data-searcher]");_(s).each(function(e){e.addEventListener("submit",function(t){t.preventDefault();var a=e.action,n=e.dataset.searcher,o=new FormData(e);qwest.post(a,o).then(function(e,t){document.getElementById(n).innerHTML=t})})}),_(document.querySelectorAll("[data-input-color]")).each(function(e){var t=e.querySelector("[data-input]"),a=e.querySelector("[data-impostor]");t.addEventListener("change",function(e){a.style.backgroundColor=t.value},!1),a.style.backgroundColor=t.value}),_(document.querySelectorAll("[data-dd]")).each(function(e){new Dropdown(e)}),_(document.querySelectorAll("[data-tagin]")).each(function(e){new Tagin(e)}),_(document.querySelectorAll("[data-autocomplete]")).each(function(e){var t,a=e.dataset.autocomplete;new autoComplete({selector:e,minChars:2,source:function(e,n){try{t.abort()}catch(e){}qwest.post(a,{q:e}).then(function(e,t){n(t)})}})}),_(document.querySelectorAll("[data-woofmark]")).each(function(e){var t=woofmark(e,{markdown:!1,html:!1,parseHTML:domador,parseMarkdown:megamark,defaultMode:"wysiwyg",render:{modes:function(e,t){return!1},commands:function(e,t){if("code"===t||"image"===t)return e.style.display="none",!1;var a="";switch(t){case"bold":a="&#xE238;";break;case"italic":a="&#xE23F;";break;case"quote":a="&#xE244;";break;case"ol":a="&#xE242;";break;case"ul":a="&#xE241;";break;case"heading":a="&#xE245;";break;case"link":a="&#xE250;"}e.innerHTML='<i class="material-icons">'+a+"</i>"}}}),a=e.form;a.addEventListener("submit",function(){e.value=t.value()})}),_(document.querySelectorAll("[data-tabule]")).each(function(e){new Tabule(e)}),_(document.querySelectorAll("[data-sticker]")).each(function(e){var t=e.dataset.sticker||"{}";new Sticker(e,JSON.parse(t))}),_(document.querySelectorAll("[data-adder]")).each(function(e){var t=e.querySelector("[data-adder-list]"),a=e.querySelector("[data-adder-sample]"),n=a.cloneNode(!0),o=e.querySelector("[data-adder-button]");o.addEventListener("click",function(){var e=n.cloneNode(!0);t.appendChild(e),c()})});var u=document.getElementById("formulary-form");if(u){var m=document.getElementById("form-data");u.addEventListener("submit",function(e){for(var t=[],a=1;a<=4;a++){var n=[],o=document.getElementById("visit-block-"+a);_(o.children).each(function(e){n.push(e.dataset.id)}),t.push(n)}m.value=JSON.stringify(t)})}var g=document.getElementById("question-options");if(g){var p=document.getElementById("quest-options-cont"),v=document.getElementById("quest-type"),y=function(){var e=v.options[v.selectedIndex];p.style.display=e.dataset.options?"block":"none"};v.addEventListener("change",y),y();var f=dragula([g],{removeOnSpill:!0,moves:function(e,t,a,n){return!(t.children.length<2)&&a.classList.contains("drag-handle")}});f.on("dragend",function(e){c()})}Chart.defaults.global.title.display=!0;var h=document.getElementById("pie-chart");if(h){var E=JSON.parse(h.dataset.chart);new Chart(h.getContext("2d"),{type:"doughnut",options:{maintainAspectRatio:!1,title:{text:"Género de los pacientes"}},data:{labels:["Mujeres","Hombres"],datasets:[{backgroundColor:["#34495e","#3498db"],data:E}]}})}var b=document.getElementById("age-chart");if(b){var E=JSON.parse(b.dataset.chart);new Chart(b.getContext("2d"),{type:"bar",options:{maintainAspectRatio:!1,title:{text:"Edad promedio de los pacientes"}},data:{labels:["M","T","W","T","F","S","S"],datasets:[{label:"Mujeres",data:E.women,backgroundColor:"#34495e"},{label:"Hombres",data:E.men,backgroundColor:"#3498db"}]}})}var k=document.getElementById("patients-chart");if(k){var E=JSON.parse(k.dataset.chart);new Chart(k.getContext("2d"),{type:"line",options:{maintainAspectRatio:!1,title:{text:"Promedio de encuestados"}},data:{labels:["M","T","W","T","F","S","S"],datasets:[{label:"Encuestados",data:E,backgroundColor:"#34495e"}]}})}var q=document.getElementById("questions-source");if(q){var w=["number","select","multiple","scale","yes-no","radio","osdi","styles"],S={};_(w).each(function(e){var t=document.getElementById(e+"-quest-tmpl").innerHTML;S[e]=t,Mustache.parse(S[e],["<%","%>"])});for(var L=[q],B=1;B<5;B++){var T=document.getElementById("visit-block-"+B);L.push(T)}var I=dragula(L,{removeOnSpill:!0,copy:function(e,t){return"questions-source"===t.id},accepts:function(e,t){return"questions-source"!==t.id},moves:function(e,t,a){return"questions-source"===t.id||a.classList.contains("drag-handle")}});I.on("drop",function(e,t,a,n){var o=e.dataset.questionDefinition;I.cancel(!0);var r=JSON.parse(o),c=t.querySelectorAll('[data-id="'+r.id+'"]');if(c.length>0)alert("Esta pregunta ya existe para esta visita");else{e.classList.contains("js-source")||e.remove(),r.visit_block=t.dataset.blockName,r.definition=o;var d=S[r.type],i=Mustache.render(d,r),l=document.createElement("div");l.innerHTML=i,t.insertBefore(l.children[0],n)}})}o("[data-appform-style-trigger]","change",e)}();
//# sourceMappingURL=app.js.map
