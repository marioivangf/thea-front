/*!
 * Tabule.js
 *
 * Simple tab engine based on CSS classes
 *
 * Copyright 2017 Iván García
 * Released under the MIT license
 */

(function () {

  var T = function (container) {

    this.cont = container;
    this.triggers = this.cont.querySelectorAll("[data-tabule-trigger]");
    this.tabs = this.cont.querySelectorAll("[data-tabule-tab]");
    this.setup();
  };

  T.prototype.setup = function () {

    for (var index = 0; index < this.triggers.length; index++)
      this.triggers[index].addEventListener("click", this.trigger_click_handler.bind(this, index), false);
    this.activate(0);
  };

  T.prototype.trigger_click_handler = function (active_index) {

    for (var index = 0; index < this.tabs.length; index++)
      this.deactivate(index);
    this.activate(active_index);
  };

  T.prototype.activate = function (index) {

    this.triggers[index].classList.add("tabule-active");
    this.tabs[index].classList.add("tabule-active");
  };

  T.prototype.deactivate = function (index) {

    this.triggers[index].classList.remove("tabule-active");
    this.tabs[index].classList.remove("tabule-active");
  };

  window.Tabule = T;

})();