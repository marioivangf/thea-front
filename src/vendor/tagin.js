/*

Tagin v0.0.1
Copyright (c) 2016 Iván García / Eulr
GitHub: https://github.com/eulr/tagin
License: http://www.opensource.org/licenses/mit-license.php

*/

(function () {

  // Keys
  var ENTER = 13;
  var BACKSPACE = 8;
  var COMMA = 188;
  var SPACE = 32;

  var T = function (input) {

    this.output = document.createElement("input");
    this.input = input;
    this.tags = [];
    this.dom_tags = [];
    this.container = document.createElement("div");
    this.selected = null;
    this.setup();
  };

  T.prototype.setup = function () {

    var output = this.output;
    var input = this.input;
    var wrapper = this.container;
    // Make new input be the input
    output.name = input.name;
    input.removeAttribute("name");
    // Wrap the input inside a new container
    wrapper.classList.add("tagin");
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(output);
    input.classList.add("tagin-in");
    wrapper.dataset.inputDisguise = true;
    output.dataset.disguisedInput = true;
    output.style.display = "none";
    // Append input
    input.type = "text";
    this.attach_events();
    wrapper.insertBefore(input, wrapper.firstChild);
    // Get the tags written in the input if any
    var tags = input.value;
    if (tags) {
      tags = tags.split(",");
      for (var i = 0; i < tags.length; i++)
        this.add(tags[i]);
    }
  };

  T.prototype.attach_events = function () {

    var input = this.input;
    this.container.addEventListener("click", this.click_handler.bind(this));
    input.addEventListener("focus", this.focus_handler.bind(this));
    input.addEventListener("blur", this.blur_handler.bind(this));
    input.addEventListener("keydown", this.keydown_handler.bind(this));
    input.addEventListener("keyup", this.keyup_handler.bind(this));
  };

  T.prototype.click_handler = function (event) {
    // Click handler on container, achieving event delegation on tags
    var tag_index = this.dom_tags.indexOf(event.target);
    if (tag_index > -1) this.select(tag_index);
    if (event.target !== this.input) this.input.focus();
  };

  T.prototype.focus_handler = function (event) {
    this.container.classList.add("focus");
  };

  T.prototype.blur_handler = function (event) {
    this.container.classList.remove("focus");
    this.unselect();
    this.tag_submit();
  };

  T.prototype.keydown_handler = function (event) {
    // Prevent form submitting and comma or space printing
    var key = event.keyCode;
    if (key === ENTER || key === COMMA) // if (key === ENTER || key === SPACE || key === COMMA)
      event.preventDefault();
    else if (key === BACKSPACE && !this.input.value) // Call solver if input is empty
      this.backspace_solver();
    else this.unselect();
  };

  T.prototype.keyup_handler = function (event) {

    var key = event.keyCode;
    if (key === ENTER || key === COMMA) // if (key === ENTER || key === SPACE || key === COMMA)
      this.tag_submit();
  };

  T.prototype.backspace_solver = function () {
    // Return if there are no tags
    if (this.dom_tags.length <= 0) return;
    var dom_tags = this.dom_tags;
    // Check for selected class, for delete confirmation
    if (this.selected !== null) {
      // if there is a selection, delete it
      this.remove(this.selected);
      this.selected = null;
    } else // otherwise select last
      this.select(dom_tags.length-1);
  };

  T.prototype.tag_submit = function () {

    var tag = this.input.value;
    if (!tag) return;
    tag = tag.replace(/[, ]+/g, " ").trim();
    this.add(tag);
  };

  T.prototype.unselect = function (index) {
    // Clean the class from last selected
    if (this.selected === null) return;
    this.dom_tags[this.selected].classList.remove("tagin-selected");
    this.selected = null;
  };

  T.prototype.select = function (index) {

    this.unselect();
    this.selected = index;
    this.dom_tags[index].classList.add("tagin-selected");
  };

  T.prototype.remove = function (index) {

    var dom_tag = this.dom_tags[index];
    this.dom_tags.splice(index, 1);
    this.tags.splice(index, 1);
    dom_tag.parentNode.removeChild(dom_tag);
    this.output.value = this.tags.join(",");
  };

  T.prototype.add = function (tag) {
    // Return if tag already on the list
    var index = this.tags.indexOf(tag);
    if (index > -1) {
      var index_tag = this.dom_tags[index];
      index_tag.classList.remove("tagin-blink");
      index_tag.offsetWidth; // Trigger reflow to reset whatever animation tagin-blink defined
      index_tag.classList.add("tagin-blink");
      return;
    }
    // Create the tag
    var dom_tag = document.createElement("span");
    var wrapper = this.container;
    dom_tag.className = "tagin-tag";
    // Insert tag in container
    wrapper.insertBefore(dom_tag, this.input);
    dom_tag.textContent = tag;
    // Update our list and input
    this.tags.push(tag);
    this.dom_tags.push(dom_tag);
    this.output.value = this.tags.join(",");
    // Clear the input if all good
    this.input.value = "";
  };

  window.Tagin = T;

})();