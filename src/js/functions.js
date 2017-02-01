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

  // Toggle classes in parents
  each_node_evt("[data-close-parent]", "click", function (event) {
    var target = event.currentTarget;
    target.parentNode.style.display = "none";
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

  // Adder for question options
  _(document.querySelectorAll("[data-adder]")).each(function (node) {
    var list = node.querySelector("[data-adder-list]");
    var sample = node.querySelector("[data-adder-sample]");
    var sample_clone = sample.cloneNode(true);
    var btn = node.querySelector("[data-adder-button]");
    btn.addEventListener("click", function () {
      var clone = sample_clone.cloneNode(true);
      list.appendChild(clone);
    });
  });

  // Questions creation init
  var quests = document.getElementById("question-options");
  if (quests) {
    var quests_cont = document.getElementById("quest-options-cont");
    var quest_type_sel = document.getElementById("quest-type");
    var option_check = function () {
      var opt = quest_type_sel.options[quest_type_sel.selectedIndex];
      console.log(opt.dataset.options);
      quests_cont.style.display = opt.dataset.options ? "block" : "none";
    };
    quest_type_sel.addEventListener("change", option_check);
    option_check();
    var quest_drake = dragula([quests], {
      removeOnSpill: true,
      moves: function (el, container, handle, sibling) {
        if (container.children.length < 2) return false;
        return handle.classList.contains("drag-handle");
      }
    });
  }

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

    var questions = ["number", "multiple", "scale", "yes-no", "styles"];
    var question_templs = {};
    _(questions).each(function (question) {
      var tmpl = document.getElementById(question+"-quest-tmpl").innerHTML;
      question_templs[question] = tmpl;
      Mustache.parse(question_templs[question], ["<%", "%>"]);
    });

    var dragula_containers = [questions_source];
    for (var i = 1; i < 5; i++) {
      var block = document.getElementById("visit-block-"+i);
      dragula_containers.push(block);
    }

    var drake = dragula(dragula_containers, {
      removeOnSpill: true,
      copy: function (el, source) {
        return source.id === "questions-source";
      },
      accepts: function (el, target) {
        return target.id !== "questions-source";
      },
      moves: function (el, container, handle) {
        if (container.id === "questions-source")
          return true;
        return handle.classList.contains("drag-handle");
      }
    });

    drake.on("drop", function (element, container, src, sibling) {
      // Get definition
      var def = element.dataset.questionDefinition;
      // Render question
      drake.cancel(true);
      var definition = JSON.parse(def);
      // Validate if question already in block
      var exists = container.querySelectorAll('[data-id="'+definition.id+'"]');
      if (exists.length > 0) {
        alert("Esta pregunta ya existe para esta visita");
      } else {
        // Else do render
        if (!element.classList.contains("js-source"))
          element.remove();
        definition.visit_block = container.dataset.blockName;
        definition.definition = def;
        var tmpl = question_templs[definition.type];
        var rendered = Mustache.render(tmpl, definition);
        var wrapper= document.createElement("div");
        wrapper.innerHTML = rendered;
        container.insertBefore(wrapper.children[0], sibling);
      }
    });
  }

  function update_form_styles () {

    var cont = document.getElementById("af-container");
    // Get color values
    var v = {};
    v["bg"] = document.getElementById("af-bg-color").value;
    v["accent"] = document.getElementById("af-accent-color").value;
    // Calc colors
    v["text"] = tinycolor(v["bg"]).isDark() ? "white" : "rgba(0, 0, 0, 0.8)"
    v["input_bg"] = (tinycolor(v["bg"]).getBrightness() > 246) ? "#ECECEC" : "white";
    v["accent_darken"] = tinycolor(v["accent"]).darken(5);
    v["accent_text"] = tinycolor(v["accent_darken"]).isDark() ? "white" : "rgba(0, 0, 0, 0.8)";
    // Set template
    var tmpl = question_templs["styles"];
    var style_sheet = Mustache.render(tmpl, v);
    write_styles("af-styles", style_sheet);
    // Change controls accordingly
    cont.classList.toggle("af--dark", tinycolor(v["bg"]).isDark());
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

  // Form styles update
  each_node_evt_init_once("[data-appform-style-trigger]", "change", update_form_styles);

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
    if (nodes.length > 0) cb();
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