class My_calc extends Calculator
    constructor: (@options)->
        self                    = this
        @expression             = @options.expression || ""
        @lastCharType           = @options.lastCharType || ""
        
        calc                    = document.createElement("DIV")
        calc.id                 = "calculator"
        calc.innerHTML          = Calc_template
        document.body.appendChild(calc)
        display                 = document.getElementById("calc_display")
        
        calc.addEventListener('click', (e)->
            e.preventDefault()
            type = e.target.getAttribute("data-type")
            if !!type
                display.innerHTML = self.toGlue(e.target.innerHTML, type)
            if e.target.getAttribute("data-action")
                display.innerHTML = self.expression = self[e.target.getAttribute("data-action")](self.expression)
            false
        )
    

window.onload = ->
    new My_calc({})
    
    calc                        = document.getElementById("calculator")
    calcStyle                   = calc.style
    calcStyle.top               = "-500px"
    calcStyle.left              = "1000px"
    
    clickToView                 = document.getElementById("click_to_view")
    
    clickToView.addEventListener("click", ->
        calcStyle.top           = window.innerHeight/2 - calc.offsetHeight/2 + "px"
        calcStyle.left          = window.innerWidth/2 - calc.offsetWidth/2 + "px"
    )