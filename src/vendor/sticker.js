/*!
 * Sticker.js
 *
 * Simple js lib to stick scrollable sidebars without missing main scroll on document
 *
 * Copyright 2017 Iván García
 * Released under the MIT license
 */

(function () {

  var default_options = {
    offset: 0,
    bottom: 0,
    perc_width: null
  };

  var animation_frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  S = function (sticker, opts) {

    var opts = opts || {};

    this.options = extend(default_options, opts);
    this.sticker = sticker;
    this.last_scroll = 0;
    this.ticking = false;
    this.down = false;
    this.get_variables();
    this.set_events();
    this.reset_sticker();
    this.calc();
  };

  S.prototype.get_variables = function () {

    this.last_scroll = 0;
    this.parentw = this.sticker.parentNode.offsetWidth;
    this.sticker_y = this.sticker.offsetTop;
    this.winh = window.innerHeight;
    // this.max_height = this.sticker.parentNode.offsetHeight - this.options.offset - this.options.bottom;
  };

  S.prototype.set_events = function () {

    document.addEventListener("scroll", this.scroll_handler.bind(this), false);
    window.addEventListener("resize", this.resize_handler.bind(this), false);
  };

  S.prototype.scroll_handler = function (event) {

    this.last_scroll = window.scrollY;
    if (!this.ticking)
      animation_frame(this.calc.bind(this));
    else return false;
    this.ticking = true;
  };

  S.prototype.resize_handler = function (event) {

    this.reset_sticker();
    this.get_variables();
    this.down = false;
    this.scroll_handler();
  };

  S.prototype.reset_sticker = function () {

    this.sticker.style.position = "relative";
    this.sticker.style.top = "0px";
    if (this.options.perc_width)
      this.sticker.style.width = (this.parentw * this.options.perc_width) + "px";
  };

  S.prototype.calc = function () {

    this.ticking = false;

    var scroll = this.last_scroll;
    var el = this.sticker;
    var off = this.options.offset;
    var bot = this.options.bottom;
    var wh = this.winh;
    var y = this.sticker_y;

    var line = y - off - scroll;
    var height = wh - y + scroll;
    // height = (height >= this.max_height) ? this.max_height : height;

    if (line >= 0) {

      el.style.height = height - bot + "px";
      if (this.down) this.reset_sticker();
      this.down = false;

    } else {

      if (!this.down) {
        el.style.height = wh - off - bot + "px";
        el.style.position = "fixed";
        el.style.top = off + "px";
      } this.down = true;
    }
  };

  // Util

  function extend (a, b) {
    var c = {};
    for (var p in a) c[p] = (b[p] == null) ? a[p] : b[p];
    return c;
  }

  window.Sticker = S;

})();