describe("Calculator::", function() {
    var calc = new Calculator({});
    /*
    var chars = ["(", ")", "2", "+", "-", "*", "/", "."],
    exps = ["", "(", "3", "5.", "2+", "(2+", "((", "((2*", "((2*2)", "2-4", "4-7.", "(6/8)"],
    disc = [],
    count = 0;
    
    for (var i = 0, expsLength = exps.length; i < expsLength; i++) {
        for (var j = 0 charsLength = chars.length; j < charsLength; j++) {
            
        }
    }
    */
    
    describe("@toGlue", function() {
        it("first char can't be comma", function() {
            expect(calc.toGlue(".")).toEqual("");
        });
        
        it("first char can't be bracket Close", function() {
            expect(calc.toGlue(")")).toEqual("");
        });
        
        it("first char can't be operator", function() {
            expect(calc.toGlue("*")).toEqual("");
        });
        
        it("first char can be bracket Open", function() {
            expect(calc.toGlue("(")).toEqual("(");
        });
        
        it("after bracket Open can't goes bracket Close", function() {
            expect(calc.toGlue(")")).toEqual("(");
        });
        
        it("after bracket Open can't goes comma", function() {
            expect(calc.toGlue(".")).toEqual("(");
        });
        
        it("after bracket Open can't goes operator", function() {
            expect(calc.toGlue("+")).toEqual("(");
        });
        
        it("after bracket Open can goes number", function() {
            expect(calc.toGlue("4")).toEqual("(4");
        });
        
        it("after number can goes number", function() {
            expect(calc.toGlue("5")).toEqual("(45");
        });
        
        it("after number can goes comma", function() {
            expect(calc.toGlue(".")).toEqual("(45.");
        });
        
        it("after comma can't goes comma", function() {
            expect(calc.toGlue(".")).toEqual("(45.");
        });
        
        it("after comma can't goes operator", function() {
            expect(calc.toGlue("/")).toEqual("(45.");
        });
        
        it("after comma can't goes brackets", function() {
            expect(calc.toGlue("(")).toEqual("(45.");
            expect(calc.toGlue(")")).toEqual("(45.");
        });
        
        it("after comma can goes number", function() {
            expect(calc.toGlue("7")).toEqual("(45.7");
        });
        
        it("after Float number can't goes comma", function() {
            expect(calc.toGlue(".")).toEqual("(45.7");
        });
        
        it("after number can't goes bracket Open", function() {
            expect(calc.toGlue("(")).toEqual("(45.7");
        });
        
        it("after number can goes bracket Close", function() {
            expect(calc.toGlue(")")).toEqual("(45.7)");
        });
        
        it("after bracket Close can goes operator", function() {
            expect(calc.toGlue("*")).toEqual("(45.7)*");
        });
        
        it("after operator can't goes operator", function() {
            expect(calc.toGlue("*")).toEqual("(45.7)*");
        });
        
        it("after operator can't goes bracket Close", function() {
            expect(calc.toGlue(")")).toEqual("(45.7)*");
        });
        
        it("after operator can't goes comma", function() {
            expect(calc.toGlue(".")).toEqual("(45.7)*");
        });
        
        it("after operator can goes bracket Open or number", function() {
            expect(calc.toGlue("4")).toEqual("(45.7)*4");
        });
        
        it("after number can goes operator", function() {
            expect(calc.toGlue("-")).toEqual("(45.7)*4-");
        });
        
        it("after bracket Close can't goes comma", function() {
            expect(calc.toGlue("(")).toEqual("(45.7)*4-(");
            expect(calc.toGlue("8")).toEqual("(45.7)*4-(8");
            expect(calc.toGlue(")")).toEqual("(45.7)*4-(8)");
            expect(calc.toGlue(".")).toEqual("(45.7)*4-(8)");
        });
        
        it("the number of open brackets equals the number of closed", function() {
            expect(calc.toGlue(")")).toEqual("(45.7)*4-(8)");
        });
        
        it("after bracket Close can't goes bracket Open", function() {
            expect(calc.toGlue("(")).toEqual("(45.7)*4-(8)");
        });
    });
    
    describe("@add", function() {
        it("adds numbers", function() {
            expect(calc.add("2 + 7 + 11")).toEqual("20");
        });
        
        it("adds minus numbers", function() {
            expect(calc.add("2 +-7 + 11")).toEqual("6");
        });
        
        it("adds floating numbers", function() {
            expect(calc.add("1.15 + 2.30 + 1.5")).toEqual("4.95");//4.949999999999999
        });
    });
    
    describe("@subtract", function() {
        it("subtract numbers", function() {
            expect(calc.subtract("10 - 2 - -3")).toEqual("11");
        });
        
        it("subtract minus numbers", function() {
            expect(calc.subtract("-10 - -2 - -3")).toEqual("-5");
        });
        
        it("subtract numbers", function() {
            expect(calc.subtract("10.15 - 2.05 - 3.07")).toEqual("5.03");//5.030000000000001
        });
    });
    
    describe("@multiply", function() {
        it("multiply numbers", function() {
            expect(calc.multiply("14 * 3 * 2")).toEqual("84");
        });
        
        it("multiply minus numbers", function() {
            expect(calc.multiply("14 * -3 * 2")).toEqual("-84");
        });
        
        it("multiply numbers", function() {
            expect(calc.multiply("1.15 * 2.3")).toEqual("2.645");//2.6449999999999996
        });
    });
    
    describe("divide", function() {
        it("divide numbers, result a plus number", function() {
            expect(calc.divide("14 / 7 / 2")).toEqual("1");
        });
        
        it("divide two numbers, result minus number", function() {
            expect(calc.divide("14 / 7 / -2")).toEqual("-1");
        });
        
        it("divide two numbers, result minus number", function() {
            expect(calc.divide("14.5 / 7.1 / -2.8")).toEqual("-0.7293762575452717");//-0.73
        });
    });
    
    describe("@deleteLastChar", function() {
        it("delete Last Char when he is one", function() {
            expect(calc.deleteLastChar("8")).toEqual("");
        });
        
        it("delete Last Char", function() {
            expect(calc.deleteLastChar("452")).toEqual("45");
        });
        
        it("delete Last Char with '.'", function() {
            expect(calc.deleteLastChar("45.2")).toEqual("45");
        });
        
        it("delete Last Char with space", function() {
            expect(calc.deleteLastChar("45 + 5")).toEqual("45 +");
        });
        
        it("delete Last minus number", function() {
            expect(calc.deleteLastChar("45 + -5")).toEqual("45 +");
        });
    });
    
    describe("@deleteChars", function() {
        it("delete Chars", function() {
            expect(calc.deleteChars("452")).toEqual("");
        });
    });
    
    describe("@changeSign", function() {
        it("change operator sign", function() {
            expect(calc.changeSign("2.1")).toEqual("-2.1");
        });
        
        it("change operator sign", function() {
            expect(calc.changeSign("45")).toEqual("-45");
        });
        
        it("change operator '+' on '-' or '-' on '+'", function() {
            expect(calc.changeSign("45+52")).toEqual("45-52");
        });
        
        it("change Sign when operator equal '*' or '/'", function() {
            expect(calc.changeSign("45*52")).toEqual("45*-52");
        });
        
        it("change Sign when operator equal '*' or '/'", function() {
            expect(calc.changeSign("45*-52")).toEqual("45*52");
        });
        
        it("change Sign in brackets", function() {
            expect(calc.changeSign("(45")).toEqual("(-45");
        });
        
        it("change Sign after brackets", function() {
            expect(calc.changeSign("(45+5)*6")).toEqual("(45+5)*-6");
        });
        
        it("change Sign after brackets", function() {
            expect(calc.changeSign("(45+5)*-6")).toEqual("(45+5)*6");
        });
    });
    
    describe("@calculate", function() {
        it("calculate expression one group bracket", function() {
            expect(calc.calculate("(2 + 2 * 3) / 4")).toEqual("2");
        });
        
        it("calculate expression more than one group of the bracket", function() {
            expect(calc.calculate("100 - (2 + 64 / (2 + 2)) * 4")).toEqual("28");
        });
        
        it("calculate expression of two Bracket group", function() {
            expect(calc.calculate("(45.7) * 4 - (8)")).toEqual("174.8");
        });
    });
});
