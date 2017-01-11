(function () {

  // GLOBALS
  var path_name = document.body.dataset.pathName;

  // Not responsive validation
  window.addEventListener('resize', not_responsive_check, true);
  not_responsive_check();

  // Sync input with else text
  each_node_evt("[data-synced-input]", "keyup", function (event) {
    var input = event.currentTarget;
    var sync_target = document.getElementById(input.dataset.syncedInput);
    var value = input.value.trim();
    sync_target.classList.toggle("clean", value === "")
    sync_target.textContent = (value === "") ? input.placeholder : value;
  });

  // Toggle password in inputs
  each_node_evt("[data-password-toggle]", "mousedown", function (event) {
    var input = event.currentTarget.parentNode.getElementsByTagName("INPUT")[0];
    input.type = "text";
  });
  each_node_evt("[data-password-toggle]", "mouseup", function (event) {
    var input = event.currentTarget.parentNode.getElementsByTagName("INPUT")[0];
    input.type = "password";
  });

  // Toggle classes in parents
  each_node_evt("[data-parent-class-toggle]", "click", function (event) {
    var target = event.currentTarget;
    target.parentNode.classList.toggle(target.dataset.parentClassToggle);
  });

  // Toggle classes for dropdowns
  each_node_evt("[data-dropdown-toggle]", "click", function (event) {
    event.stopPropagation();
    var parent_clist = event.currentTarget.parentNode.classList;
    var state_class = "dropdown--opened";
    if (parent_clist.contains(state_class))
      parent_clist.remove(state_class);
    else {
      parent_clist.add(state_class);
      onetime(document, "click", function () {
        parent_clist.remove(state_class);
      });
    }
  });

  // Image inputs with preview
  each_node_evt("[data-image-input] input[type='file']", "change", function (event) {

    var input = event.currentTarget;
    var image = input.parentNode.querySelector("img");
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        input.parentNode.classList.remove("clean");
        image.src = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  });

  // Form styles update
  each_node_evt_init_once("[data-appform-style-trigger]", "change", update_form_styles);

  // Color inputs
  _(document.querySelectorAll("[data-input-color]")).each(function (node) {
    var input = node.querySelector("[data-input]");
    var impostor = node.querySelector("[data-impostor]");
    input.addEventListener("change", function (event) {
      impostor.style.backgroundColor = input.value;
    }, false);
    impostor.style.backgroundColor = input.value;
  })

  // Dropdown inititalization
  _(document.querySelectorAll("[data-dd]")).each(function (node) {
    new Dropdown(node);
  })

  // Tabule inititalization
  _(document.querySelectorAll("[data-tabule]")).each(function (node) {
    new Tabule(node);
  })

  // Sticker JS init
  _(document.querySelectorAll("[data-sticker]")).each(function (node) {
    var opts_string = node.dataset.sticker || "{}";
    new Sticker(node, JSON.parse(opts_string));
  });

  // Forms Statistics
  Chart.defaults.global.title.display = true;

  var gender_chart_dom = document.getElementById("pie-chart");
  if (gender_chart_dom) {
    var gender_chart = new Chart(gender_chart_dom.getContext('2d'), {
      type: 'doughnut',
      options: {
        maintainAspectRatio: false,
        title: { text: "Género de los pacientes" }
      },
      data: {
        labels: ["Mujeres", "Hombres"],
        datasets: [{
          backgroundColor: [
            "#34495e",
            "#3498db"
        //         "#2ecc71",
        // "#3498db",
        // "#95a5a6",
        // "#9b59b6",
        // "#f1c40f",
        // "#e74c3c",
        // "#34495e"
          ],
          data: [522, 323]
        }]
      }
    });
  }

  var age_chart_dom = document.getElementById('age-chart');
  if (age_chart_dom) {
    var age_chart = new Chart(age_chart_dom.getContext('2d'), {
      type: 'bar',
      options: {
        maintainAspectRatio: false,
        title: { text: "Edad promedio de los pacientes" }
      },
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Mujeres',
          data: [12, 19, 3, 17, 6, 3, 7],
          backgroundColor: "#34495e"
        }, {
          label: 'Hombres',
          data: [2, 29, 5, 5, 2, 3, 10],
          backgroundColor: "#3498db"
        }]
      }
    });
  }

  var patients_chart_dom = document.getElementById('patients-chart');
  if (patients_chart_dom) {
    var patients_chart = new Chart(patients_chart_dom.getContext('2d'), {
      type: 'line',
      options: {
        maintainAspectRatio: false,
        title: {
          text: "Promedio de encuestados"
        }
      },
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Encuestados',
          data: [40, 19, 42, 17, 56, 12, 38],
          backgroundColor: "#34495e"
        }]
      }
    });
  }

  // Dragula on forms construction
  var questions_source = document.getElementById("questions-source");

  if (questions_source) {

    var dragula_containers = [questions_source];
    for (var i = 1; i < 5; i++) {
      var block = document.getElementById("visit-block-"+i);
      dragula_containers.push(block);
    }

    var drake = dragula(dragula_containers, {
      copy: function (el, source) {
        return source.id === "questions-source";
      }
    });

    drake.on("drop", function (element, container, src, s) {
      //drake.cancel(true);
      console.log(s);
      // Change the model here to refresh the view
    });
  }

  function update_form_styles () {

    if (!document.getElementById("af-bg-color")) return;
    var bg_color = document.getElementById("af-bg-color").value;
    var accent_color = document.getElementById("af-accent-color").value;
    var darken_accent_color = tinycolor(accent_color).darken(5);
    var shadow = (tinycolor(bg_color).getBrightness() < 120) ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";
    // Background color
    var style_sheet = ".af-bg { background-color: "+bg_color+"; }\n";
    // Accent color (like labels text)
    style_sheet += ".af-accent { color: "+accent_color+"; }\n";
    // Buttons
    style_sheet += ".af-button { background-color: "+accent_color+";\n";
    style_sheet += "color: "+(darken_accent_color.isDark() ? "#FFFFFF" : "rgba(0, 0, 0, 0.8)")+"; }\n";
    style_sheet += ".af-button:hover, .af-button:focus { background-color: "+darken_accent_color.toString()+";";
    style_sheet += "box-shadow: -6px 6px 0 "+shadow+"; }\n";
    style_sheet += ".af-button, .af-button:active { box-shadow: 0px 0px 0 "+shadow+"; }";
    // Inputs
    style_sheet += ".af-input { box-shadow: 0px 0px 0 "+shadow+"; }";
    style_sheet += ".af-input:focus { box-shadow: -6px 6px 0 "+shadow+"; }";
    // Separator
    style_sheet += ".af-separator { border-color: "+accent_color+"; }\n";
    // Write styles
    write_styles("af-styles", style_sheet);
    document.getElementById("af-container").classList.toggle("af--dark", tinycolor(bg_color).isDark());
  }

  // Write styles directly for form customization
  function write_styles (style_id, css_text) {
    var style_el = document.getElementById(style_id);
    if (style_el) document.getElementsByTagName("head")[0].removeChild(style_el);
    style_el = document.createElement('style');
    style_el.type = "text/css";
    style_el.id = style_id;
    style_el.innerHTML = css_text;
    document.getElementsByTagName("head")[0].appendChild(style_el);
  }

  function not_responsive_check () {
    var w = window.innerWidth;
    document.body.classList.toggle("not-responsive-notice", w < 980);
  }

  function each_node_evt (selector, type, cb) {
    var nodes = document.querySelectorAll(selector);
    _(nodes).each(function (node) {
      node.addEventListener(type, cb);
    });
  }

  function each_node_evt_init (selector, type, cb) {
    var nodes = document.querySelectorAll(selector);
    _(nodes).each(function (node) {
      node.addEventListener(type, cb);
      cb();
    });
  }

  function each_node_evt_init_once (selector, type, cb) {
    var nodes = document.querySelectorAll(selector);
    _(nodes).each(function (node) {
      node.addEventListener(type, cb);
    });
    cb();
  }

  function onetime (node, type, callback) {
    // create event
    node.addEventListener(type, function (e) {
      // remove event
      e.target.removeEventListener(e.type, arguments.callee);
      // call handler
      return callback(e);
    });
  }

  function nodes_to_arr (nodes) {
    return Array.prototype.slice.call(nodes);
  }

})();