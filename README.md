#Калькулятор

#### Установка (install)
``` $ bower i CalculatorJS --save ```


Представляет из себя класс калькулятора на нативном JavaScript (CoffeeScript). Файл demo.html рабочий и полностью автономный. 

Методы
	1. @toGlue. Продклеивает к выражению значения по символьно. Принимает два аргумента (тип строка): ```toGlue: (char, typeChar) ->```. 
		Пример:
		`self.expression = "2 +";
		self.toGlue("3", "number");
		self.expression // "2 + 3"`
	
    ``` display: (elem, text) -> ```
	
    ``` add: (str) -> ```
	
    ``` subtract: (str) -> ```
	
    ``` multiply: (str) -> ```
	
    ``` divide: (str) -> ```
	
    ``` calculate: (str) -> ```
	
    ``` deleteLastChar: (str) -> ```
	
    ``` deleteChars: (str) -> ```
	
    ``` changeSign: (str) -> ```
	
	
	

Свойства экземпляра объекта
	``` @expression ```
	
	``` @lastCharType ```


	
HTML метки
	``` data-action ```
	
	``` data-type ```