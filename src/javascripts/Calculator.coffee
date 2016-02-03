# zadebaj 4tob ne pridiralis'
# 1/0 = Infiniti
# 0/0 = NaN
# 8 * (9 : V dannom slu4ae ne rabotaet changeSign

# bugs:
# "((2 + 2)/4 * (16 - 1))/-3" - ne vvodit do conca dannoe virajenie. spotikaets9 na cifre 3 "((2 + 2)/4 * (16 - 1))/"
# "((2" - ne men9et znak

# BUGS FIXED !!!!

class Calculator
    constructor: (@options)->
        @expression             = @options.expression || ""
        @lastCharType           = @options.lastCharType || ""
        
    toGlue: (char, exp) ->
        exp = @expression unless exp
        if exp == ""
            if isNumeric(char) || char == '('
                return @expression += char

        lastChar = exp.slice( exp.length - 1 )

        if isNumeric(lastChar)
            if isNumeric(char)
                return @expression += char
            if char == ')'
                openBrackets = exp.match(/\(/g)
                unless openBrackets
                    return @expression
                closeBrackets = exp.match(/\)/g)
                if closeBrackets && openBrackets.length >= closeBrackets.length + 1 
                    return @expression += char
                else
                    return @expression += char
            if char == '+' || char == '-' || char == '*' || char == '/'
                return @expression += char
            if char == '.' && !exp.match(/\.[0-9]+$/)
                return @expression += char

        if lastChar == '('
            if isNumeric(char) || char == '('
                return @expression += char

        if lastChar == ')'
            if char == '+' || char == '-' || char == '*' || char == '/'
                return @expression += char
            if char == ')'
                openBrackets = exp.match(/\(/g)
                unless openBrackets
                    return @expression
                closeBrackets = exp.match(/\)/g)
                if closeBrackets
                    if openBrackets.length >= closeBrackets.length + 1
                        return @expression += char
                    else
                        return @expression
                else
                    return @expression += char

        if lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/'
            if isNumeric(char) || char == '(' 
                return @expression += char

        if lastChar == '.'
            if isNumeric(char)
                return @expression += char
                
        @expression
        
        
    display: (elem, text) ->
        elem.innerHTML = text
        
        
    add: (str) ->
        replacer = ( str, num1, num1Float, num2, num2Float ) -> ((+num1*1e9) + (+num2*1e9))/1e9
        res = str.replace(/(\-?\d+\.?(\d+)?) ?\+ ?(\-?\d+\.?(\d+)?)/, replacer)
        res = @add(res) if res != str
        res 
        
        
    subtract: (str) ->
        replacer = ( str, num1, num1Float, num2, num2Float ) -> (num1*1e9 - num2*1e9)/1e9 
        res = str.replace(/(\-?\d+\.?(\d+)?) ?\- ?(\-?\d+\.?(\d+)?)/, replacer)
        res = @subtract(res) if res != str
        res
        
        
    multiply: (str) ->
        replacer = ( str, num1, num1Float, num2, num2Float ) -> ((num1*1e9) * (num2*1e9))/1e18
        res = str.replace(/(\-?\d+\.?(\d+)?) ?\* ?(\-?\d+\.?(\d+)?)/, replacer)
        res = @multiply(res) if res != str
        res
        
        
    divide: (str) ->
        replacer = ( str, num1, num1Float, num2, num2Float ) -> num1 / num2 
        res = str.replace(/(\-?\d+\.?(\d+)?) ?\/ ?(\-?\d+\.?(\d+)?)/, replacer)
        res = @divide(res) if res != str
        res
        
        
    calculate: (str) ->
        self = @
        res = str.replace(/\(([^(^)]+)\)/g, (str, inBrackets) ->
            self.add(self.subtract(self.multiply(self.divide(inBrackets))))
        )
        if res != str
            res = @calculate(res)
        @add(@subtract(@multiply(@divide(res))))
        
        
    deleteLastChar: (str) ->
        res                     = null
        lastButOne              = str.slice(str.length - 2, str.length - 1)
        
        if lastButOne == '.' || lastButOne == ' '
            res                 = str.slice(0, str.length - 2)
            if ~res[res.length - 1].search(/\d/)
                @lastCharType   = "number"
            if ~res[res.length - 1].search(/\(/)
                @lastCharType   = "bracketOpen"
            if ~res[res.length - 1].search(/\)/)
                @lastCharType   = "bracketClose"
            if ~res[res.length - 1].search(/[\+\-\*\/]/)
                @lastCharType   = "operator"
            return res
        
        if lastButOne == '-'
            res         = str.slice(0, str.length - 3)
            if ~res[res.length - 1].search(/\d/)
                @lastCharType   = "number"
            if ~res[res.length - 1].search(/\(/)
                @lastCharType   = "bracketOpen"
            if ~res[res.length - 1].search(/\)/)
                @lastCharType   = "bracketClose"
            if ~res[res.length - 1].search(/[\+\-\*\/]/)
                @lastCharType   = "operator"
            return res
        
        if str.length <= 1
            return @lastCharType       = ""
            
        res             = str.slice(0, str.length - 1)
        if ~res[res.length - 1].search(/\d/)
            @lastCharType   = "number"
        if ~res[res.length - 1].search(/\(/)
            @lastCharType   = "bracketOpen"
        if ~res[res.length - 1].search(/\)/)
            @lastCharType   = "bracketClose"
        if ~res[res.length - 1].search(/[\+\-\*\/]/)
            @lastCharType   = "operator"
        res
        
    deleteChars: (str) ->
        @lastCharType = ""
    
    
    changeSign: (str) ->
        num = null
        str = str.replace(/(\d+\.?(\d+)?)$/, (match) ->
            num = match
            ""
        )

        if num
            lastChar = str.slice(-1)
            if lastChar == ''
                return "-" + num
            if lastChar == '(' || lastChar == '*' || lastChar == '/'
                str += "-" + num
            if lastChar == '-'
                if str[0] == '-' && str.length == 1
                    str = num
                else
                    str = str.slice(0, -1) + "+" + num
            if lastChar == '+'
                str = str.slice(0, -1) + "-" + num

        num = null
        str = str.replace(/(\d+\.?(\d+)?)$/, (match) ->
            num = match
            ""
        )

        if num
            lastTwoChars = str.slice(-2)
            if lastTwoChars == '(+' || lastTwoChars == '*+' || lastTwoChars == '/+'
                str = str.slice(0, -2) + lastTwoChars.slice(0,1) + num
            else
                str += num
        str

isNumeric = (n) ->
    !isNaN(parseFloat(n)) && isFinite(n)