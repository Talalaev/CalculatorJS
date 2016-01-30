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
