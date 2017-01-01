/*

Dropdown v0.0.1
Copyright (c) 2016 Iván García / Eulr
GitHub: https://github.com/eulr/dropdown
License: http://www.opensource.org/licenses/mit-license.php

*/

(function () {

  var default_options = {
    on_change: function () {},
    multiple: false
  };

  var D = function (container, opts) {

    var opts = opts || {};

    this.options = extend(default_options, opts);
    this.container = container;
    this.opener = this.container.querySelector("[data-dd-opener]") || this.container;
    this.display = this.container.querySelector("[data-dd-display]");
    this.input = this.container.querySelector("[data-dd-input]");
    this.last_selected = null;
    this.opened = false;

    this.setup();

    return this;
  };

  D.prototype.setup = function () {

    var value;
    this.attach_events();
    // Check for set value
    if (this.input) {
      if (!(value = this.input.value)) return;
      var items = this.get_items();
      var values = value.split(",");
      for (var i = items.length - 1; i >= 0; i--) {
        if (values.indexOf(items[i].dataset.value) > -1)
          this.select_item(items[i]);
      }
    }
  };

  D.prototype.get_items = function () {

    var items = this.container.querySelectorAll("[data-dd-option]");
    return Array.prototype.slice.call(items);
  };

  D.prototype.attach_events = function () {

    this.container.addEventListener("click", this.click_handler.bind(this));
    this.opener.addEventListener("click", this.opener_click_handler.bind(this));
  };

  D.prototype.click_handler = function (event) {

    var target = event.target.closest("[data-dd-option], [data-dd]");
    if (target && target !== this.container)
      this.select_item(target); // Click on item
  };

  D.prototype.select_item = function (item) {

    var content = item.innerHTML;
    var selected_items;
    if (this.last_selected && !this.options.multiple)
      this.last_selected.classList.remove("dd-selected");
    this.last_selected = item;
    item.classList.toggle("dd-selected");
    if (this.input) {
      if (!this.options.multiple) // Replace html on display if not multiple
        this.display.innerHTML = content;
      selected_items = this.container.querySelectorAll(".dd-selected");
      this.input.value = _.map(selected_items, function (selected_item) {
        return selected_item.dataset.value;
      }).join(",");
    }
    this.close();
  };

  D.prototype.open = function () {

    this.container.classList.add("dd-opened");
    document.addEventListener("click", this.out_click_handler.bind(this));
    this.opened = true;
  };

  D.prototype.out_click_handler = function (event) {

    if (!this.container.contains(event.target)) this.close();
    event.target.removeEventListener(event.type, arguments.callee);
  };

  D.prototype.close = function (close_event) {

    this.container.classList.remove("dd-opened");
    this.opened = false;
  };

  D.prototype.opener_click_handler = function (event) {

    (this.opened) ? this.close() : this.open();
  };

  // Util

  function extend (a, b) {
    var c = {};
    for (var p in a) c[p] = (b[p] == null) ? a[p] : b[p];
    return c;
  }

  window.Dropdown = D;

})();