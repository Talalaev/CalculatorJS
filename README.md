#Калькулятор

Представляет из себя класс калькулятора на нативном JavaScript (CoffeeScript).</br>

#### Установка (install)
``` $ bower i CalculatorJS --save ```

#### Демонстрация (Demo)
Пример полностью живой и его можно потрогать скачав архив и запустив файл demo.html (полностью автономный) в своем браузере. </br> 
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
3. @add - Принимает выражение ввиде строки с любым поличеством операндов и операторов сложения.</br>
	```
	# add: (str) ->
	self.add("2 + 4 + 8") # return "14"
	self.add("2+4+8") # return "14"
	self.add("2+  4+8") # вернет не коректный результат
	self.add("2 + (4 + 7)") # return "2 + (11)"
	```
	
4. @subtract - Принимает выражение ввиде строки с любым поличеством операндов и операторов вычитания.
	```
	# subtract: (str) ->
	self.subtract("2-4-8") # return "-10"
	```
	
5. @multiply - Принимает выражение ввиде строки с любым поличеством операндов и операторов умножения.</br>
	```
	# multiply: (str) ->
	self.multiply("2* 4*8") # return "64"
	self.multiply("2 * (4 * 7)") # return "2 * (28)"
	```
	
6. @divide - Принимает выражение ввиде строки с любым поличеством операндов и операторов деления.</br>
	```
	# divide: (str) ->
	self.divide("2/ 4/8") # return "0.0625"
	self.divide("2 / (4 / 7)") # return "2 / (0.5714285714285714)"
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