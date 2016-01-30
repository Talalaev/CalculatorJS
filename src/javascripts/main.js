var Calculator, isNumeric;

Calculator = (function() {
  function Calculator(options) {
    this.options = options;
    this.expression = this.options.expression || "";
    this.lastCharType = this.options.lastCharType || "";
  }

  Calculator.prototype.toGlue = function(char, exp) {
    var closeBrackets, lastChar, openBrackets;
    exp = this.expression;
    if (exp === "") {
      if (isNumeric(char) || char === '(') {
        return this.expression += char;
      }
    }
    lastChar = exp.slice(exp.length - 1);
    if (isNumeric(lastChar)) {
      if (isNumeric(char)) {
        return this.expression += char;
      }
      if (char === ')') {
        openBrackets = exp.match(/\(/g);
        if (!openBrackets) {
          return this.expression;
        }
        closeBrackets = exp.match(/\)/g);
        if (closeBrackets && openBrackets.length >= closeBrackets.length + 1) {
          return this.expression += char;
        } else {
          return this.expression += char;
        }
      }
      if (char === '+' || char === '-' || char === '*' || char === '/') {
        return this.expression += char;
      }
      if (char === '.' && !exp.match(/\.[0-9]+$/)) {
        return this.expression += char;
      }
    }
    if (lastChar === '(') {
      if (isNumeric(char) || char === '(') {
        return this.expression += char;
      }
    }
    if (lastChar === ')') {
      if (char === '+' || char === '-' || char === '*' || char === '/') {
        return this.expression += char;
      }
      if (char === ')') {
        openBrackets = exp.match(/\(/g);
        if (!openBrackets) {
          return this.expression;
        }
        closeBrackets = exp.match(/\)/g);
        if (closeBrackets) {
          if (openBrackets.length >= closeBrackets.length + 1) {
            return this.expression += char;
          } else {
            return this.expression;
          }
        } else {
          return this.expression += char;
        }
      }
    }
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
      if (isNumeric(char) || char === '(') {
        return this.expression += char;
      }
    }
    if (lastChar === '.') {
      if (isNumeric(char)) {
        return this.expression += char;
      }
    }
    return this.expression;
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
    var lastChar, lastTwoChars, num;
    num = null;
    str = str.replace(/(\d+\.?(\d+)?)$/, function(match) {
      num = match;
      return "";
    });
    if (num) {
      lastChar = str.slice(-1);
      if (lastChar === '') {
        return "-" + num;
      }
      if (lastChar === '(' || lastChar === '*' || lastChar === '/') {
        str += "-" + num;
      }
      if (lastChar === '-') {
        if (str[0] === '-' && str.length === 1) {
          str = num;
        } else {
          str = str.slice(0, -1) + "+" + num;
        }
      }
      if (lastChar === '+') {
        str = str.slice(0, -1) + "-" + num;
      }
    }
    num = null;
    str = str.replace(/(\d+\.?(\d+)?)$/, function(match) {
      num = match;
      return "";
    });
    if (num) {
      lastTwoChars = str.slice(-2);
      if (lastTwoChars === '(+' || lastTwoChars === '*+' || lastTwoChars === '/+') {
        str = str.slice(0, -2) + lastTwoChars.slice(0, 1) + num;
      } else {
        str += num;
      }
    }
    return str;
  };

  return Calculator;

})();

isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

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
