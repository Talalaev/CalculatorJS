#Калькулятор

#### Установка (install)
``` $ bower i CalculatorJS --save ```


Представляет из себя класс калькулятора на нативном JavaScript (CoffeeScript). Файл demo.html рабочий и полностью автономный.</br>
![CalculatorJS img demo](http://2.bp.blogspot.com/-qhaAz7gBBi8/VqPV6xjAogI/AAAAAAAAAZI/aboZ4acCLR4/s1600/calc.jpg "demo")

#### Методы
1. @toGlue - Продклеивает к выражению значения по символьно, принимает два аргумента.</br>
	```
	# toGlue: (char, typeChar) ->
	
	self.expression = "2 +";
	self.toGlue("3", "number");
	self.expression # "2 + 3"
	```
	
2. @display - Просто обертка вокрук .innerHTLM.</br>
	```
	###
	display: (elem, text) ->
        elem.innerHTML = text
	###
	
	self.display(document.getElementById('someId'), "some text")
	
	```
3. @add - </br>
	```
	# add: (str) ->
	```
	
4. @subtract - 
	```
	# subtract: (str) ->
	```
	
5. @multiply - </br>
	```
	# multiply: (str) ->
	```
	
6. @divide - </br>
	```
	# divide: (str) ->
	```
	
7. @calculate - </br>
	```
	# calculate: (str) ->
	```
	
8. @deleteLastChar - </br>
	```
	# deleteLastChar: (str) ->
	```
	
9. @deleteChars - </br>
	```
	# deleteChars: (str) ->
	```
	
10. @changeSign - </br>
	```
	# changeSign: (str) ->
	```
	

#### Свойства экземпляра объекта
1. @expression - </br>
	``` @expression ```
	
2. @lastCharType - </br>
	``` @lastCharType ```


	
#### HTML метки
1. data-action - </br>
	``` data-action ```
	
2. data-type - </br>
	``` data-type ```