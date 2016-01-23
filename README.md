#Калькулятор

#### Установка (install)
``` $ bower i CalculatorJS --save ```


Представляет из себя класс калькулятора на нативном JavaScript (CoffeeScript). Файл demo.html рабочий и полностью автономный. 

#### Методы
1. @toGlue. Продклеивает к выражению значения по символьно, принимает два аргумента.</br>
	```
	# toGlue: (char, typeChar) ->
	
	self.expression = "2 +";
	self.toGlue("3", "number");
	self.expression // "2 + 3"
	```
	
2. display: (elem, text) ->
3. add: (str) ->
4. subtract: (str) ->
5. multiply: (str) ->
6. divide: (str) ->
7. calculate: (str) ->
8. deleteLastChar: (str) ->
9. deleteChars: (str) ->
10. changeSign: (str) ->
	

#### Свойства экземпляра объекта
	``` @expression ```
	
	``` @lastCharType ```


	
#### HTML метки
	``` data-action ```
	
	``` data-type ```