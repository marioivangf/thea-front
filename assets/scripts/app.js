!function(){function e(){var e=document.getElementById("af-container"),n={};n.bg=document.getElementById("af-bg-color").value,n.accent=document.getElementById("af-accent-color").value,n.text=tinycolor(n.bg).isDark()?"white":"rgba(0, 0, 0, 0.8)",n.input_bg=tinycolor(n.bg).getBrightness()>246?"#ECECEC":"white",n.accent_darken=tinycolor(n.accent).darken(5),n.accent_text=tinycolor(n.accent_darken).isDark()?"white":"rgba(0, 0, 0, 0.8)";var a=S.styles,r=Mustache.render(a,n);t("af-styles",r),e.classList.toggle("af--dark",tinycolor(n.bg).isDark())}function t(e,t){var n=document.getElementById(e);n&&document.getElementsByTagName("head")[0].removeChild(n),n=document.createElement("style"),n.type="text/css",n.id=e,n.innerHTML=t,document.getElementsByTagName("head")[0].appendChild(n)}function n(){var e=window.innerWidth;document.body.classList.toggle("not-responsive-notice",e<980)}function a(e,t,n){var a=document.querySelectorAll(e);_(a).each(function(e){e.addEventListener(t,n)})}function r(e,t,n){var a=document.querySelectorAll(e);_(a).each(function(e){e.addEventListener(t,n)}),a.length>0&&n()}function o(e,t,n){e.addEventListener(t,function(e){return e.target.removeEventListener(e.type,arguments.callee),n(e)})}function c(){var e=document.getElementById("question-options");_(e.children).each(function(e,t){var n=e.querySelector("[data-reply]"),a=e.querySelector("[data-value]");n.name=n.id="id_form-"+t+"-reply",a.name=a.id="id_form-"+t+"-value"})}function d(e,t){if(!e.files||!e.files[0])return!1;var n=new FileReader;n.onload=function(e){t(e.target.result)},n.readAsDataURL(e.files[0])}document.body.dataset.pathName;window.addEventListener("resize",n,!0),n(),a("[data-synced-input]","keyup",function(e){var t=e.currentTarget,n=document.getElementById(t.dataset.syncedInput),a=t.value.trim();n.classList.toggle("clean",""===a),n.textContent=""===a?t.placeholder:a}),a("[data-password-toggle]","mousedown",function(e){var t=e.currentTarget.parentNode.getElementsByTagName("INPUT")[0];t.type="text"}),a("[data-password-toggle]","mouseup",function(e){var t=e.currentTarget.parentNode.getElementsByTagName("INPUT")[0];t.type="password"}),a("[data-parent-class-toggle]","click",function(e){var t=e.currentTarget;t.parentNode.classList.toggle(t.dataset.parentClassToggle)}),a("[data-close-parent]","click",function(e){var t=e.currentTarget;t.parentNode.style.display="none"}),a("[data-dropdown-toggle]","click",function(e){e.stopPropagation();var t=e.currentTarget.parentNode.classList,n="dropdown--opened";t.contains(n)?t.remove(n):(t.add(n),o(document,"click",function(){t.remove(n)}))}),a("[data-image-input] input[type='file']","change",function(e){var t=e.currentTarget,n=t.parentNode.querySelector("img");t.value?d(t,function(e){t.parentNode.classList.remove("clean"),n.src=e}):(t.parentNode.classList.add("clean"),n.src="")}),a("[data-proxy-click]","click",function(e){var t=e.currentTarget;document.querySelector(t.dataset.proxyClick).click()}),a("[data-unset]","click",function(e){var t=e.currentTarget,n=document.querySelector(t.dataset.unset);n.value="",n.dispatchEvent(new Event("change"))});var i=document.getElementById("med-logo-in");if(i){var l=document.getElementById("af-logos");i.addEventListener("change",function(){var e=document.getElementById("med-logo");e&&e.parentNode.removeChild(e),i.value&&d(i,function(e){var t=new Image;t.id="med-logo",t.src=e,l.appendChild(t)})})}var s=document.querySelectorAll("[data-searcher]");_(s).each(function(e){e.addEventListener("submit",function(t){t.preventDefault();var n=e.action,a=e.dataset.searcher,r=new FormData(e);qwest.post(n,r).then(function(e,t){document.getElementById(a).innerHTML=t})})}),_(document.querySelectorAll("[data-input-color]")).each(function(e){var t=e.querySelector("[data-input]"),n=e.querySelector("[data-impostor]");t.addEventListener("change",function(e){n.style.backgroundColor=t.value},!1),n.style.backgroundColor=t.value}),_(document.querySelectorAll("[data-calendar-range]")).each(function(e){rome.use(moment);var t=e.querySelector("[data-calendar-range-start]"),n=e.querySelector("[data-calendar-range-end]"),a=rome(t,{time:!1,monthsInCalendar:2,dateValidator:rome.val.beforeEq(n)}),r=rome(n,{time:!1,monthsInCalendar:2,dateValidator:rome.val.afterEq(t)}),o=e.closest(".scrollable");o&&o.addEventListener("scroll",function(){a.hide(),r.hide()}),window.addEventListener("scroll",function(){a.hide(),r.hide()})}),_(document.querySelectorAll("[data-date-input]")).each(function(e){rome.use(moment);var t=rome(e,{time:!1}),n=e.closest(".scrollable");n&&n.addEventListener("scroll",function(){t.hide()}),window.addEventListener("scroll",function(){t.hide()})}),_(document.querySelectorAll("[data-dd]")).each(function(e){new Dropdown(e)}),_(document.querySelectorAll("[data-tagin]")).each(function(e){new Tagin(e)}),_(document.querySelectorAll("[data-autocomplete]")).each(function(e){var t,n=e.dataset.autocomplete;new autoComplete({selector:e,minChars:2,source:function(e,a){try{t.abort()}catch(e){}qwest.post(n,{q:e}).then(function(e,t){a(t)})}})}),_(document.querySelectorAll("[data-woofmark]")).each(function(e){var t=woofmark(e,{markdown:!1,html:!1,parseHTML:domador,parseMarkdown:megamark,defaultMode:"wysiwyg",render:{modes:function(e,t){return!1},commands:function(e,t){if("code"===t||"image"===t)return e.style.display="none",!1;var n="";switch(t){case"bold":n="&#xE238;";break;case"italic":n="&#xE23F;";break;case"quote":n="&#xE244;";break;case"ol":n="&#xE242;";break;case"ul":n="&#xE241;";break;case"heading":n="&#xE245;";break;case"link":n="&#xE250;"}e.innerHTML='<i class="material-icons">'+n+"</i>"}}}),n=e.form;n.addEventListener("submit",function(){e.value=t.value()})}),_(document.querySelectorAll("[data-tabule]")).each(function(e){new Tabule(e)}),_(document.querySelectorAll("[data-sticker]")).each(function(e){var t=e.dataset.sticker||"{}";new Sticker(e,JSON.parse(t))}),_(document.querySelectorAll("[data-adder]")).each(function(e){var t=e.querySelector("[data-adder-list]"),n=e.querySelector("[data-adder-sample]"),a=n.cloneNode(!0),r=e.querySelector("[data-adder-button]");r.addEventListener("click",function(){var e=a.cloneNode(!0);t.appendChild(e),c()})});var u=document.getElementById("formulary-form");if(u){var m=document.getElementById("form-data");u.addEventListener("submit",function(e){for(var t=[],n=1;n<=4;n++){var a=[],r=document.getElementById("visit-block-"+n);_(r.children).each(function(e){a.push(e.dataset.id)}),t.push(a)}m.value=JSON.stringify(t)})}var g=document.getElementById("question-options");if(g){var v=document.getElementById("quest-options-cont"),f=document.getElementById("quest-type"),y=function(){var e=f.options[f.selectedIndex];v.style.display=e.dataset.options?"block":"none"};f.addEventListener("change",y),y();var p=dragula([g],{removeOnSpill:!0,moves:function(e,t,n,a){return!(t.children.length<2)&&n.classList.contains("drag-handle")}});p.on("dragend",function(e){c()})}Chart.defaults.global.title.display=!0;var h=document.getElementById("pie-chart");if(h){var E=JSON.parse(h.dataset.chart);new Chart(h.getContext("2d"),E)}var q=document.getElementById("age-chart");if(q){var E=JSON.parse(q.dataset.chart);new Chart(q.getContext("2d"),E)}var k=document.getElementById("patients-chart");if(k){var E=JSON.parse(k.dataset.chart);new Chart(k.getContext("2d"),E)}var w=document.getElementById("questions-source");if(w){var b=["number","select","multiple","scale","yes-no","radio","osdi","pain","styles"],S={};_(b).each(function(e){var t=document.getElementById(e+"-quest-tmpl").innerHTML;S[e]=t,Mustache.parse(S[e],["<%","%>"])});for(var L=[w],I=1;I<5;I++){var B=document.getElementById("visit-block-"+I);L.push(B)}var N=dragula(L,{removeOnSpill:!0,copy:function(e,t){return"questions-source"===t.id},accepts:function(e,t){return"questions-source"!==t.id},moves:function(e,t,n){return"questions-source"===t.id||n.classList.contains("drag-handle")}});N.on("drop",function(e,t,n,a){var r=e.dataset.questionDefinition;N.cancel(!0);var o=JSON.parse(r),c=t.querySelectorAll('[data-id="'+o.id+'"]');if(c.length>0)alert("Esta pregunta ya existe para esta visita");else{e.classList.contains("js-source")||e.remove(),o.visit_block=t.dataset.blockName,o.definition=r;var d=S[o.type],i=Mustache.render(d,o),l=document.createElement("div");l.innerHTML=i,t.insertBefore(l.children[0],a)}})}r("[data-appform-style-trigger]","change",e)}();
//# sourceMappingURL=app.js.map
