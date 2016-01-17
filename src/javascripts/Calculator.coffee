# zadebaj 4tob ne pridiralis'
# 1/0 = Infiniti
# 0/0 = NaN
# 8 * (9 : V dannom slu4ae ne rabotaet changeSign
class Calculator
    constructor: (@options)->
        @expression             = @options.expression || ""
        @lastCharType           = @options.lastCharType || ""
        
    toGlue: (char, typeChar) ->
        bracketsOpen    = if @expression.match(/\(/g) then @expression.match(/\(/g).length else 0
        bracketsClose   = if @expression.match(/\)/g) then @expression.match(/\)/g).length else 0
        return @expression if typeChar == "bracketClose" && bracketsOpen == bracketsClose
        return @expression if @expression.length >= 26
        return @expression if typeChar == "comma" && @expression.match(/\d+?\.\d+?$/)
        return @expression if typeChar == "comma" && (@lastCharType != "number" || @lastCharType == "comma")
        return @expression if typeChar == "bracketOpen" && (@lastCharType == "bracketClose" || @lastCharType == "comma" || @lastCharType == "number")
        return @expression if (typeChar == "bracketClose" || typeChar == "operator" || typeChar == "comma") && (!@lastCharType || @lastCharType == "bracketOpen" || @lastCharType == "operator" || @lastCharType == "comma")
            
        if @lastCharType == "operator" && typeChar == "number"
            @lastCharType = typeChar
            return @expression += " " + char[0]
        
        if @lastCharType && typeChar != @lastCharType && typeChar != "comma" && typeChar != "bracketClose" && typeChar != "number"
            @lastCharType = typeChar
            return @expression += " " + char[0]
        
        @lastCharType = typeChar
        @expression += char[0]
        
        
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
        res = str.replace(/((\-?\d+\.?(\d+)?\)?) ([\+\-\*\/]) ((\-?)(\d+\.?(\d+)?)))$/, (str, allStr, num1, num1Float, operator, allNum2, sign, num2, num2Float)->
            return "#{num1} + #{num2}" if operator == "-"
            return "#{num1} - #{num2}" if operator == "+"
            if (operator == "*" || operator == "/") && sign
                return "#{num1} #{operator} #{num2}"
            else
                "#{num1} #{operator} -#{num2}"
        )
        return res if res != str
        str.replace(/^(\(?)((\-?)(\d+\.?(\d+)?))$/, (str, bracket, allNum, sign, num) ->
            if sign
                return "#{bracket}#{num}"
            else
                "#{bracket}-#{num}"
        )
        