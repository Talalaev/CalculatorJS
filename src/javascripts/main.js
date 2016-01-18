var Calculator;

Calculator = (function() {
  function Calculator(options) {
    this.options = options;
    this.expression = this.options.expression || "";
    this.lastCharType = this.options.lastCharType || "";
  }

  Calculator.prototype.toGlue = function(char, typeChar) {
    var bracketsClose, bracketsOpen;
    bracketsOpen = this.expression.match(/\(/g) ? this.expression.match(/\(/g).length : 0;
    bracketsClose = this.expression.match(/\)/g) ? this.expression.match(/\)/g).length : 0;
    if (typeChar === "bracketClose" && bracketsOpen === bracketsClose) {
      return this.expression;
    }
    if (this.expression.length >= 26) {
      return this.expression;
    }
    if (typeChar === "comma" && this.expression.match(/\d+?\.\d+?$/)) {
      return this.expression;
    }
    if (typeChar === "comma" && (this.lastCharType !== "number" || this.lastCharType === "comma")) {
      return this.expression;
    }
    if (typeChar === "bracketOpen" && (this.lastCharType === "bracketClose" || this.lastCharType === "comma" || this.lastCharType === "number")) {
      return this.expression;
    }
    if ((typeChar === "bracketClose" || typeChar === "operator" || typeChar === "comma") && (!this.lastCharType || this.lastCharType === "bracketOpen" || this.lastCharType === "operator" || this.lastCharType === "comma")) {
      return this.expression;
    }
    if (this.lastCharType === "operator" && typeChar === "number") {
      this.lastCharType = typeChar;
      return this.expression += " " + char[0];
    }
    if (this.lastCharType && typeChar !== this.lastCharType && typeChar !== "comma" && typeChar !== "bracketClose" && typeChar !== "number") {
      this.lastCharType = typeChar;
      return this.expression += " " + char[0];
    }
    this.lastCharType = typeChar;
    return this.expression += char[0];
  };

  Calculator.prototype.display = function(elem, text) {
    return elem.innerHTML = text;
  };

  Calculator.prototype.add = function(str) {
    var replacer, res;
    replacer = function(str, num1, num1Float, num2, num2Float) {
      return ((+num1 * 1e9) + (+num2 * 1e9)) / 1e9;
    };
    res = str.replace(/(\-?\d+\.?(\d+)?) ?\+ ?(\-?\d+\.?(\d+)?)/, replacer);
    if (res !== str) {
      res = this.add(res);
    }
    return res;
  };

  Calculator.prototype.subtract = function(str) {
    var replacer, res;
    replacer = function(str, num1, num1Float, num2, num2Float) {
      return (num1 * 1e9 - num2 * 1e9) / 1e9;
    };
    res = str.replace(/(\-?\d+\.?(\d+)?) ?\- ?(\-?\d+\.?(\d+)?)/, replacer);
    if (res !== str) {
      res = this.subtract(res);
    }
    return res;
  };

  Calculator.prototype.multiply = function(str) {
    var replacer, res;
    replacer = function(str, num1, num1Float, num2, num2Float) {
      return ((num1 * 1e9) * (num2 * 1e9)) / 1e18;
    };
    res = str.replace(/(\-?\d+\.?(\d+)?) ?\* ?(\-?\d+\.?(\d+)?)/, replacer);
    if (res !== str) {
      res = this.multiply(res);
    }
    return res;
  };

  Calculator.prototype.divide = function(str) {
    var replacer, res;
    replacer = function(str, num1, num1Float, num2, num2Float) {
      return num1 / num2;
    };
    res = str.replace(/(\-?\d+\.?(\d+)?) ?\/ ?(\-?\d+\.?(\d+)?)/, replacer);
    if (res !== str) {
      res = this.divide(res);
    }
    return res;
  };

  Calculator.prototype.calculate = function(str) {
    var res, self;
    self = this;
    res = str.replace(/\(([^(^)]+)\)/g, function(str, inBrackets) {
      return self.add(self.subtract(self.multiply(self.divide(inBrackets))));
    });
    if (res !== str) {
      res = this.calculate(res);
    }
    return this.add(this.subtract(this.multiply(this.divide(res))));
  };

  Calculator.prototype.deleteLastChar = function(str) {
    var lastButOne, res;
    res = null;
    lastButOne = str.slice(str.length - 2, str.length - 1);
    if (lastButOne === '.' || lastButOne === ' ') {
      res = str.slice(0, str.length - 2);
      if (~res[res.length - 1].search(/\d/)) {
        this.lastCharType = "number";
      }
      if (~res[res.length - 1].search(/\(/)) {
        this.lastCharType = "bracketOpen";
      }
      if (~res[res.length - 1].search(/\)/)) {
        this.lastCharType = "bracketClose";
      }
      if (~res[res.length - 1].search(/[\+\-\*\/]/)) {
        this.lastCharType = "operator";
      }
      return res;
    }
    if (lastButOne === '-') {
      res = str.slice(0, str.length - 3);
      if (~res[res.length - 1].search(/\d/)) {
        this.lastCharType = "number";
      }
      if (~res[res.length - 1].search(/\(/)) {
        this.lastCharType = "bracketOpen";
      }
      if (~res[res.length - 1].search(/\)/)) {
        this.lastCharType = "bracketClose";
      }
      if (~res[res.length - 1].search(/[\+\-\*\/]/)) {
        this.lastCharType = "operator";
      }
      return res;
    }
    if (str.length <= 1) {
      return this.lastCharType = "";
    }
    res = str.slice(0, str.length - 1);
    if (~res[res.length - 1].search(/\d/)) {
      this.lastCharType = "number";
    }
    if (~res[res.length - 1].search(/\(/)) {
      this.lastCharType = "bracketOpen";
    }
    if (~res[res.length - 1].search(/\)/)) {
      this.lastCharType = "bracketClose";
    }
    if (~res[res.length - 1].search(/[\+\-\*\/]/)) {
      this.lastCharType = "operator";
    }
    return res;
  };

  Calculator.prototype.deleteChars = function(str) {
    return this.lastCharType = "";
  };

  Calculator.prototype.changeSign = function(str) {
    var res;
    res = str.replace(/((\-?\d+\.?(\d+)?\)?) ([\+\-\*\/]) ((\-?)(\d+\.?(\d+)?)))$/, function(str, allStr, num1, num1Float, operator, allNum2, sign, num2, num2Float) {
      if (operator === "-") {
        return num1 + " + " + num2;
      }
      if (operator === "+") {
        return num1 + " - " + num2;
      }
      if ((operator === "*" || operator === "/") && sign) {
        return num1 + " " + operator + " " + num2;
      } else {
        return num1 + " " + operator + " -" + num2;
      }
    });
    if (res !== str) {
      return res;
    }
    return str.replace(/^(\(?)((\-?)(\d+\.?(\d+)?))$/, function(str, bracket, allNum, sign, num) {
      if (sign) {
        return "" + bracket + num;
      } else {
        return bracket + "-" + num;
      }
    });
  };

  return Calculator;

})();

var My_calc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

My_calc = (function(superClass) {
  extend(My_calc, superClass);

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