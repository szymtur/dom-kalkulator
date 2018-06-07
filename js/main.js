var display = document.getElementById('display');
var operators = ['', '', '+', '-', '*', '/', '.'];


//---------- FUNKCJA POBIERA ZNAKI Z KLAWISZY I WYPISUJE JE NA EKRAN --------------
function getValue(btn) {
    var lastChar = display.value[display.value.length-1];
    
    //blokuje możliwość wpisania kilkukrotnie znaku " + - * / ."
    if (btn == '-' || btn == '+' || 
        btn == '*' || btn == '/' || btn == '.'){
        
        if(operators.indexOf(lastChar) > -1)
            display.value = display.value.replace(/.$/, '');
    }
    
    //zamienia defaultowe "0" z ekranu na cyfrę lub "-" 
    //lub dodaje do "0" znaki " + - * / . "
    if(display.value === "0"){
        if( btn == '+' || btn == '*' || 
            btn == '/' || btn == '.' ){
            display.value = "0";
        }
        else{
            display.value = "";
            }
        }
    //wypisuje kliknięte klawisze na ekran
    display.value += btn;
}


//-------------------- FUNKCJA CZYSZCZĄCA EKRAN -----------------------------------
function clearDisplay() {
    display.value = "0";
}


//-------------------- FUNKCJA WALIDUJĄCA I ZWRACAJĄCA WYNIK ----------------------
function output(){
    var resultBtn = document.querySelector(".btn[value = '=']");
    
    resultBtn.addEventListener("click", function(){
        
        //sprawdza czy na końcu jest znak " + - * / ." jeśli tak to go usuwa
        var lastChar = display.value[display.value.length-1];
        if(operators.indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        
        //sprawdza poprawność wprowadzonego ciągu znaków
        if (display.value.indexOf("(") > -1 || display.value.indexOf(")") > -1){
            var regular = /(\(+)((\-|\.)?)((\d+\.\d+)|(\d+))((\-|\+|\*|\/)((\d+\.\d+)|(\d+)))*(\)+)/;
            var error_1 = /(\)+)(\.)(\d+|\(+|\)+)/;     //(X).X
            var error_2 = /((\d+\.\d+)|(\d+))(\(+)/;    //X(
            var error_4 = /(\)+)((\d+\.\d+)|(\d+))/;    //)X
            var error_3 = /(\(+)(\)+)/;                 //()
            
            if(checkBrackets(display.value) == true){
                
                if (regular.test(display.value) == false) {
                    display.value = "Error";
                }
                else if(error_1.test(display.value) == true){
                    display.value = "Error";
                }
                else if(error_2.test(display.value) == true){
                    display.value = "Error";
                }
                else if(error_3.test(display.value) == true){
                    display.value = "Error";
                }
                else if(error_4.test(display.value) == true){
                    display.value = "Error";
                }                 
                else {
                    display.value = eval(display.value);
                }
            }
            else{
                display.value = "Error";
            }
        }
         else{
            var result = eval(display.value);
            console.log(result);
            
            if (result == "Infinity" || result == "-Infinity") {
                display.value = "Error";
            } 
            else if (isNaN(result) == true) {
                display.value = "Error";
            }
            else  if (result == "function") {
                display.value = "Error";
            }
            else {
                display.value = result;
            }
        }
    });
} 
output();


//-------------------- BLOKOWANIE PRZYCISKU DZIESIĘTNYCH --------------------------
function checkDecimal(){
    let keys = document.querySelectorAll('.btn');

    for (let i = 0; i < keys.length; i++) {

        keys[i].addEventListener('click', function () {

            if (keys[i].value == '.') {
                
                    keys[i].disabled = 'true';
                }

            if (keys[i].value == 'c' || keys[i].value == '=' || 
                keys[i].value == '+' || keys[i].value == '-' ||
                keys[i].value == '*' || keys[i].value == '/' ||
                keys[i].value == '(' || keys[i].value == ')') {

                    keys[keys.length-2].disabled = false;
                }
        });
    }
} checkDecimal();


//----- FUNKCJA SPRAWDZAJĄCA ILOŚĆ NAWIASÓW OTWIERAJĄCYCH I ZAMYKAJĄCYCH ----------
function checkBrackets(str) {
    counter_1 = 0;
    counter_2 = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] == '(') {
            counter_1++
        } else if (str[i] == ')') {
            counter_2++
        }
    }
    if (counter_1 == counter_2) {
        return true;
    } else {
        return false;
    }
}


//-------------------- OBSŁUGA KLAWIATURY -----------------------------------------
document.addEventListener("keypress", function(event) {
    switch (event.keyCode) {
        case 48: // 0
            getValue(event.key);
        break;    
        case 49: // 1
            getValue(event.key);
        break;
        case 50: // 2
            getValue(event.key);
        break;
        case 51: // 3
            getValue(event.key);
        break;
        case 52: // 4
            getValue(event.key);
        break;
        case 53: // 5
            getValue(event.key);
        break;
        case 54: // 6
            getValue(event.key);
        break;
        case 55: // 7
            getValue(event.key);
        break;
        case 56: // 8
            getValue(event.key);
        break;
        case 57: // 9
            getValue(event.key);
        break;
        case 41: // )
            getValue(event.key);
        break;
        case 40: // (
            getValue(event.key);
        break;
    }
});


//obsługa klawiszy " + - * / = . , " kalkulatora za pomocą przycisków klawiatury
document.addEventListener("keypress", function(event) {
    if (event.keyCode === 43 ) {
        document.querySelector(".btn[value = '+']").click();
    }
    if (event.keyCode === 45 ) {
        document.querySelector(".btn[value = '-']").click();
    }
    if (event.keyCode === 42 ) {
        document.querySelector(".btn[value = '*']").click();
    }
    if (event.keyCode === 47 ) {
        document.querySelector(".btn[value = '/']").click();
    }
    if (event.keyCode === 13) {
        document.querySelector(".btn[value = '=']").click();
    }
    if (event.keyCode === 61) {
        document.querySelector(".btn[value = '=']").click();
    }
    if (event.keyCode === 46 || event.keyCode === 44) {
        document.querySelector(".btn[value = '.']").click();
    }
});


//obsługa klawisza " C " kalkulatora za pomocą przycisków " del/backspace/esc "
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 27) {
        document.querySelector(".btn[value = 'c']").click();
    }
});

