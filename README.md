#Калькулятор

Представляет из себя класс калькулятора на нативном JavaScript (CoffeeScript).</br>

#### Установка (install)
``` $ bower i CalculatorJS --save ```

#### Демонстрация (Demo)
Пример полностью живой и его можно потрогать скачав архив и запустив файл demo.html (полностью автономный) в своем браузере. </br> 
![CalculatorJS img demo](http://2.bp.blogspot.com/-qhaAz7gBBi8/VqPV6xjAogI/AAAAAAAAAZI/aboZ4acCLR4/s1600/calc.jpg "demo")

#### Методы
1. @toGlue - Продклеивает к выражению значения по символьно, принимает два аргумента. Второй аргумент не обязательный, если его не указать метод использует this.expression.</br>
	```
	# toGlue: (char, expression) ->
	
	self.expression = "2 +";
	self.toGlue("3");
	self.expression # "2 + 3"
	```
	
2. @display - Просто обертка вокрук .innerHTLM. При желании тут можно организовать форматирование вывода, например расставить отступы от операторов.</br>
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
	
7. @calculate - Принимает выражение ввиде строки с любым количеством операндов, операторов сложения, вычитания, умножения, деления и скобочных групп</br>
	```
	# calculate: (str) ->
	
	c.calculate("((2 + 2)/4 * (16 - 1))/-3") # return "-5"
	```
	
8. @deleteLastChar - Принимает выражение ввиде строки и возвращает новую без последнего символа. 
Автоматически меняет тип последнего введенного символа `@lastCharType`. Сохранение возвращаемого значения нужно выполнить явно.</br>
	```
	# deleteLastChar: (str) ->
	
	self.deleteLastChar("((2 + 2)/4 * (16 - 1))/-3") # return "((2 + 2)/4 * (16 - 1))"
	```
	
9. @deleteChars - Возвращает пустую строку и сбрасывает значение для типа последнего символа `@lastCharType`</br>
	```
	# deleteChars: (str) ->
	```
	
10. @changeSign - Принимает строку и изменяет знак операнда стоящего последним в выражении на противоположный. Возвращает новую строку.</br>
	```
	# changeSign: (str) ->
	
	self.changeSign("(86 * 9) / 5") # return "(86 * 9) / -5"
	```
	

#### Свойства экземпляра объекта
1. @expression - Выражение ввиде строки. Записывается явно.</br>
	``` 
	@expression 
	
	self.expression = "2+5";
	```
	
2. @lastCharType - Содержит тип последнего введенного символа. Предусматривается 4 типа символов.</br>
	``` 
	@lastCharType
	
	self.lastCharType = "number" || "bracketOpen" || "bracketClose" || "operator" || "comma" || ""
	```


	
#### HTML метки
HTML метки нужны для правильной реакции на действия пользователя. Возможны два варианта реакции на действия пользователя, это ввод выражения или произведение
вычислений над выражением. К вычислениям относится такие действия как: удалить все выражение, удалить послений символ, сменитьс знак последнего операнда
и вычислить выражение. За каждое из перечисленных действий отвечает отдельный метод, имя которого указывается в специальном html атрибуте `data-action`.
</br>
Все остальное относится к вводу и не требует вызова различных методов, всегда вызывается метод toGlue.

1. data-action - Содержит имя вызываемого метода. При взаимодействии пользователя с элементом имеющим данный атрибут будет вызван метод указанный
в html атрибуте</br>
	``` 
	<div data-action="calculate" class="calc_calculate calc_button">=</div>
	
	# Click on the element invokes a method @calculate
	# Клик на элементе вызовет метод @calculate
	```
	
2. data-type - Содержит тип символа. Если элемент содержит атрибут data-type то следует вызвать метод @toGlue</br>
	```
	<div class="calc_one calc_button" data-type="number">1</div>
	
	# when you click on an element we can know what the figure was pressed
	# при клике на элементе можем знать что была нажата цифра
	```