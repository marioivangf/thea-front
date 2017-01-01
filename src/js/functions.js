(function () {

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

  // Dropdown inititalization
  _(document.querySelectorAll("[data-dd]")).each(function (node) {
    new Dropdown(node);
  })

  // Sticker JS init
  _(document.querySelectorAll("[data-sticker]")).each(function (node) {
    var opts_string = node.dataset.sticker || "{}";
    new Sticker(node, JSON.parse(opts_string));
  });

  // Forms Statistics
  if (document.body.classList.contains("forms")) {

    Chart.defaults.global.title.display = true;

    var gender_chart = new Chart(document.getElementById("pie-chart").getContext('2d'), {
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

    var age_chart = new Chart(document.getElementById('age-chart').getContext('2d'), {
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

    var patients_chart = new Chart(document.getElementById('patients-chart').getContext('2d'), {
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

  function each_node_evt (selector, type, cb) {
    var nodes = document.querySelectorAll(selector);
    _(nodes).each(function (node) {
      node.addEventListener(type, cb);
    });
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