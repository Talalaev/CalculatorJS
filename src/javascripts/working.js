var My_calc,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

My_calc = (function(_super) {
  __extends(My_calc, _super);

  function My_calc(options) {
    var calc, display, self;
    this.options = options;
    self = this;
    this.expression = this.options.expression || "";
    this.lastCharType = this.options.lastCharType || "";
    calc = document.createElement("DIV");
    calc.id = "calculator";
    calc.innerHTML = Calc_template;
    document.body.appendChild(calc);
    display = document.getElementById("calc_display");
    calc.addEventListener('click', function(e) {
      var type;
      e.preventDefault();
      type = e.target.getAttribute("data-type");
      if (!!type) {
        display.innerHTML = self.toGlue(e.target.innerHTML, type);
      }
      if (e.target.getAttribute("data-action")) {
        display.innerHTML = self.expression = self[e.target.getAttribute("data-action")](self.expression);
      }
      return false;
    });
  }

  return My_calc;

})(Calculator);

window.onload = function() {
  var calc, calcStyle, clickToView;
  new My_calc({});
  calc = document.getElementById("calculator");
  calcStyle = calc.style;
  calcStyle.top = "-500px";
  calcStyle.left = "1000px";
  clickToView = document.getElementById("click_to_view");
  return clickToView.addEventListener("click", function() {
    calcStyle.top = window.innerHeight / 2 - calc.offsetHeight / 2 + "px";
    return calcStyle.left = window.innerWidth / 2 - calc.offsetWidth / 2 + "px";
  });
};
