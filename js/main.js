let display = document.querySelector('#display');
let allKeys = document.querySelectorAll('.btn');
let numKeys = document.querySelectorAll('.number');
let operKeys = document.querySelectorAll('.operator');
let bracketsKeys = document.querySelectorAll('.bracket');
let clearKey = document.querySelector('.clear');
let resultKey = document.querySelector('.result');
let decimalKey = document.querySelector('.btn[value = "."]');
let operators = ['+', '-', '*', '/'];


/* ZDARZENIA NA PRZYCISKU "=" */
resultKey.addEventListener('click', function() {
    result();
    blockNumKeys();
    unblockOperKeys();
    changeToAC();
    changeFontSize();
});


/* ZDARZENIA NA PRZYCISKU "." */
decimalKey.addEventListener('click', function() {
    checkDecimal();
});


/* ZDARZENIA NA PRZYCISKACH "( )" */
for (let i=0; i<bracketsKeys.length; i++) {
    bracketsKeys[i].addEventListener('click', function() {
        checkDecimal();
    });
}


/* ZDARZENIA NA PRZYCISKACH FUNKCYJNYCH */
for (let i=0; i<operKeys.length; i++) {
    operKeys[i].addEventListener('click', function() {
        unblockAllKeys();
        blockDisplayLength();
        changeFontSize();
        changeToCE();
    });
}


/* ZDARZENIA NA PRZYCISKACH NUMERYCZNYCH */
for (let i=0; i<numKeys.length; i++) {
    numKeys[i].addEventListener('click', function() {
        changeFontSize();
        blockDisplayLength();  
    });
}


/* ZDARZENIA NA PRZYCISKU "CE" */
clearKey.addEventListener('click', function() {
    if (clearKey.className.indexOf('ac') > -1) {
        unblockAllKeys();
        allClear();
        changeToCE();
        changeFontSize();
    }
    else if (clearKey.className.indexOf('ce') > -1 ) {
        unblockAllKeys();
        clearEnter();
        changeFontSize();
        checkDecimal();
    }
});


/* BLOKUJE WSZYSTKIE KLAWISZE (Z WYJĄTKIEM "AC"), GDY NA EKRANIE POJAWI SIĘ ERROR */
function blockAllKeys(display) {
    if (display == 'Error') {
        for (let i=1; i<allKeys.length; i++) {
            allKeys[i].disabled = true;
        }
    }
}


/* BLOKUJE WSZYSTKIE KLAWISZE (OPRÓCZ "CE" I "=") PO WYPISANIU WIĘCEJ NIŻ 20 ZNAKÓW */
function blockDisplayLength() {
    if (display.value.length >= 20) {
        for (let i=0; i<numKeys.length; i++) {
            numKeys[i].disabled = true;
        }
        for (let i=0; i<operKeys.length; i++) {
            operKeys[i].disabled = true;
        }
    }
}


/* BLOKUJE KLAWISZE NUMERYCZNYE PO NACIŚNIĘCIU "=" */
function blockNumKeys() {
    for (let i=0; i<numKeys.length; i++) {
        numKeys[i].disabled = true;
    }
}


/* SPRAWDZA POZYCJĘ "." I BLOKUJE/ODBLOKOWUJE KLAWISZ "." */
function checkDecimal() {
    let plusSign =  display.value.lastIndexOf('+');
    let minusSign =  display.value.lastIndexOf('-');
    let timesSign =  display.value.lastIndexOf('*');
    let divisionSign =  display.value.lastIndexOf('/');
    
    let decimalSignPosition = display.value.lastIndexOf('.');
    let signPosition = Math.max(plusSign, minusSign, timesSign, divisionSign);

    decimalSignPosition > signPosition ? decimalKey.disabled = true : decimalKey.disabled = false;
}


/* ODBLOKOWUJE WSZYSTKIE KLAWISZE */
function unblockAllKeys() {
    for (let i=1; i<allKeys.length; i++) {
        allKeys[i].disabled = false;
    }
}


/* ODBLOKOWUJE KLAWISZE FUNKCYJNE */
function unblockOperKeys() {
    if (display.value == 'Error') {
        for (let i=0; i<operKeys.length; i++) {
            operKeys[i].disabled = true;
        }
    }
    else {
        for (let i=0; i<operKeys.length; i++) {
            operKeys[i].disabled = false;
        }
    }
}


/* "CE" - USUWA PO JEDNYM ZNAKU Z EKRANU */
function clearEnter() {
    if (display.value.length > 1) {
        display.value = display.value.replace(/.$/, '');
    }
    else {
        display.value = display.value.replace(/.$/, '0');
    }
}


/* "AC" - CZYŚCI CAŁY EKRAN */
function allClear() {
    display.value = '0';
}


/* ZMIENIA PRZYCISK "CE" NA "AC" */
function changeToAC() {
    clearKey.innerText = 'AC';
    clearKey.classList.remove('ce');
    clearKey.classList.add('ac');
}


/* ZMIENIA PRZYCISK "AC" NA "CE" */
function changeToCE() {
    clearKey.innerText = 'CE';
    clearKey.classList.remove('ac') ;
    clearKey.classList.add('ce');    
}


/* ZMIENIA WIELKOŚĆ CZCIONKI EKRANU PO WPISANIU 15 ZNAKÓW */
function changeFontSize() {
    if (display.value.length > 15) {
        display.style.fontSize = '30px';
    }
    else {
        display.style.fontSize = '40px';
    }
}
 

/* FORMATUJE WYNIK, ŻEBY ZMIEŚCIŁ SIĘ NA EKRANIE */
function resultLength(result) {
    if (result.toString().length > 15) {
        result = result.toPrecision(8);
    }
    else {
        result = result.toString();
    }
    return updateResult(result);
}


/* GDY WYNIK JEST LICZBĄ DZIESIĘTNĄ USUWA Z KOŃCA NIEPOTRZEBNE ZERA ORAZ "." */ 
function updateResult(result) {
    if (result.indexOf('.') > -1 && result.indexOf('e') == -1) {
        result = result.replace(/0+$/, '');
        if (result.length-1 == result.lastIndexOf('.')) {
            result = result.replace(/\.$/, '');
        }
    }
    else {
        result;
    }
    return result;
}


/* POBIERA ZNAKI Z KLAWISZY I WYPISUJE JE NA EKRAN */
function getValue(keyVal) {
    let lastChar = display.value[display.value.length-1];

    if (display.value == "0") {
        //dodaje do defaultowego "0" na ekranie operator " + - * / . "
        if (keyVal == '+' || keyVal == '*' || keyVal =='-' ||
            keyVal == '/' || keyVal == '.' ) {
            display.value += keyVal;
        }
        //zamienia defaultowe "0" z ekranu na cyfrę
        else {
            display.value = keyVal;
            }
        }
    //dodaje kolejne cyfry i znaki na ekranie
    else {
        display.value += keyVal;
    }

    if (keyVal == '-' || keyVal == '+' || keyVal == '*' || keyVal == '/') {
        //blokuje możliwość wpisania kilkukrotnie po sobie operatorów " + - * / "
        if (operators.indexOf(lastChar) > -1) {
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia stojący na końcu znak "." na operator " + - * / "
        if ( ('.').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/..$/, keyVal); 
        }
    }

    if (keyVal == '/' || keyVal == '*' || keyVal == '+' ) {
        let lastTwoChars = (display.value[display.value.length-2] + display.value[display.value.length-1]);
        
        //blokuje użycie operatorów  " + - * / " po nawiasie "("
        if ( ('(').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, ''); 
        }
        else if(('(+').indexOf(lastTwoChars) > -1){
            display.value = display.value.replace(/..$/, '(-'); 
        }
        else if(('(/').indexOf(lastTwoChars) > -1){
            display.value = display.value.replace(/..$/, '(-');
        }
        else if(('(*').indexOf(lastTwoChars) > -1){
            display.value = display.value.replace(/..$/, '(-');
        }
    }
    
    if (keyVal == '0') {
        let twoCharsAfterLast = (display.value[display.value.length-3] + display.value[display.value.length-2]);
        
        //blokuje zero po znaku "-"
        if (('-0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "+"
        else if (('+0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "*"
        else if (('*0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "/"
        else if (('/0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po nawiasie "("
        else if (('(0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/.$/, '');
        }        
        //po nawiasie ")" zamienia "0" na "*0"
        else if ((')').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, '*' + keyVal + ''); 
        }
    }

    if (keyVal == ".") {
        //po operatorach " + - * / " zamienia "." na "0."
        if ((operators).indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, '0' + keyVal); 
        }
        //po nawiasie "(" zamienia "." na "0."
        else if (('(').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, '0' + keyVal); 
        }
        //po nawiasie ")" zamienia "." na "*0."
        else if ((')').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, '*0' + keyVal);
        }
    }

    if (keyVal == "1" || keyVal == "2" || keyVal == "3" ||
        keyVal == "4" || keyVal == "5" || keyVal == "6" ||
        keyVal == "7" || keyVal == "8" || keyVal == "9"  ) {
                
        let twoCharsAfterLast = (display.value[display.value.length-3] + display.value[display.value.length-2]);

        //zamienia zero stojąca za operatorem "-" na wartość klikniętego klawisza numerycznego
        if (('-0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za operatorem "+" na wartość klikniętego klawisza numerycznego
        else if (('+0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za operatorem "*" na wartość klikniętego klawisza numerycznego
        else if (('*0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za operatorem "/" na wartość klikniętego klawisza numerycznego
        else if (('/0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za nawiasem "(" na wartość klikniętego klawisza numerycznego
        else if (('(0').indexOf(twoCharsAfterLast) > -1) {
            display.value = display.value.replace(/..$/, keyVal);
        }
        //dodaje znak "*" między nawias ")" i liczbę
        else if ((')').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, '*' + keyVal); 
        }
    }
    
    if (keyVal == '(' ) {
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        //jeśli na ekranie jest tylko "0" to zamienia je na nawias "("
        if (display.value.length == 1) {
            if (('0').indexOf(lastChar) > -1) {
                display.value = display.value.replace(/.$/, keyVal); 
            }
        }
        //jeśli ostatnim znakiem jest ")" dodaje "*" przed nawias "("
        else if ((')').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, '*' + keyVal);
        }
        //dodaje znak mnożenia "*" między liczbę i nawias "("
        else if (numbers.indexOf(lastChar) > -1) {
            display.value = display.value.replace(/.$/, '*' + keyVal); 
        }
        //jeśli ostatnim znakiem jest "." to zamienia go na "*("
        else if (('.').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/..$/, '*' + keyVal); 
        }
    }

    if (keyVal == ')' ) {
        //jeśli ostatnim znakiem jest "." to zamienia go na ")"
        if (('.').indexOf(lastChar) > -1) {
            display.value = display.value.replace(/..$/, keyVal); 
        }
        //jeżeli na końcu jest operator  " + - * / " to zamienia go na ")"
        else if (operators.indexOf(lastChar) > -1) {
            display.value = display.value.replace(/..$/, keyVal); 
        }
    }
}


/* SPRAWDZA CZY ILOŚĆ NAWIASÓW OTWIERAJĄCYCH I ZAMYKAJĄCYCH JEST TAKA SAMA */
function checkBrackets(display) {
    let counterLeft = 0;
    let counterRight = 0;

    for (let i = 0; i < display.length; i++) {
        if (display[i] == '(' ) {
            counterLeft++
        } else if (display[i] == ')' ) {
            counterRight++
        }
    }

    if (counterLeft == counterRight) {
        return true;
    } else {
        return false;
    }
}


/* WALIDUJE WPROWADZONY CIĄG ZNAKÓW I ZWRACA WYNIK LUB ERROR */
function result() {
    //sprawdza czy na końcu jest operator " + - * / " i usuwa go
    let lastChar = display.value[display.value.length-1];
    if (operators.indexOf(lastChar) > -1) {
        display.value = display.value.replace(/.$/, '');
    }
    
    //sprawdza poprawność wprowadzonego ciągu znaków i zwraca wynik lub "Error"
    if (display.value.indexOf("(") > -1 || display.value.indexOf(")") > -1) {
        if (checkBrackets(display.value) == true) {
            let regular = /(\(+)((\-|\+)?)((\d*\.\d+)|(\d+))((\-|\+|\*|\/)((\d*\.\d+)|(\d+)))*(\)+)/;
            let error_1 = /(\)+)(\+|\-|\*|\/)*(\(+\)+)/;            // )*()
            let error_2 = /(\(+\)+)(\+|\-|\*|\/)*(\(+)/;            // ()*( 
            
            if (regular.test(display.value) == false) {
                display.value = "Error";
                blockAllKeys(display.value);
            }
            else if (error_1.test(display.value) == true) {
                display.value = "Error";
                blockAllKeys(display.value);
            }
            else if (error_2.test(display.value) == true) {
                display.value = "Error";
                blockAllKeys(display.value);
            }
            else {
                let result = eval(display.value);

                if (result == "Infinity" || result == "-Infinity") {
                    display.value = "Error";
                    blockAllKeys(display.value);
                }
                else if (isNaN(result) == true) {
                    display.value = "Error";
                    blockAllKeys(display.value);
                }
                else {
                    display.value = resultLength(result);
                }
            }
        }
        else {
            display.value = "Error";
            blockAllKeys(display.value); 
        }
    }   
    else {
        let result = eval(display.value);

        if (result == "Infinity" || result == "-Infinity") {
            display.value = "Error";
            blockAllKeys(display.value);
        }
        else if (isNaN(result) == true) {
            display.value = "Error";
            blockAllKeys(display.value);
        }
        else {
            display.value = resultLength(result);
        }  
    }
}


/* OBSŁUGA KLAWISZY KALKULATORA ZA POMOCĄ KLAWIATURY */
document.addEventListener("keypress", function(event) {
    if (event.keyCode === 43 ) {
        let btn = document.querySelector(".btn[value = '+']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 45 ) {
        let btn = document.querySelector(".btn[value = '-']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 42 ) {
        let btn = document.querySelector(".btn[value = '*']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 47 ) {
        let btn = document.querySelector(".btn[value = '/']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 61) {
        let btn = document.querySelector(".btn[value = '=']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 46 || event.keyCode === 44) {
        let btn = document.querySelector(".btn[value = '.']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 40) {
        let btn = document.querySelector(".btn[value = '(']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 41) {
        let btn = document.querySelector(".btn[value = ')']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 48 ) {
        let btn = document.querySelector(".btn[value = '0']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 49) {
        let btn = document.querySelector(".btn[value = '1']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 50) {
        let btn = document.querySelector(".btn[value = '2']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 51) {
        let btn = document.querySelector(".btn[value = '3']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 52) {
        let btn = document.querySelector(".btn[value = '4']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 53) {
        let btn = document.querySelector(".btn[value = '5']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 54) {
        let btn = document.querySelector(".btn[value = '6']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 55) {
        let btn = document.querySelector(".btn[value = '7']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 56) {
        let btn = document.querySelector(".btn[value = '8']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 57) {
        let btn = document.querySelector(".btn[value = '9']");
            btn.click();
            btn.classList.add('hover');
    }
});

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13 ) {
        let btn = document.querySelector(".btn[value = '=']");
            btn.click();
            btn.classList.add('hover');
    }
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 27) {
        let btn = document.querySelector(".btn[value = 'ce']");
            btn.click();
            btn.classList.add('hover');        
    }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 187 || event.keyCode === 107 ) {
        document.querySelector(".btn[value = '+']").classList.remove('hover');
    }
    if (event.keyCode === 189 || event.keyCode === 109 ) {
        document.querySelector(".btn[value = '-']").classList.remove('hover');
    }
    if (event.keyCode === 56 || event.keyCode === 106 ) {
        document.querySelector(".btn[value = '*']").classList.remove('hover');
    }
    if (event.keyCode === 191 || event.keyCode === 111 ) {
        document.querySelector(".btn[value = '/']").classList.remove('hover');
    }
    if (event.keyCode === 187) {
        document.querySelector(".btn[value = '=']").classList.remove('hover');
    }
    if (event.keyCode === 188 || event.keyCode === 190 || event.keyCode === 110) {
        document.querySelector(".btn[value = '.']").classList.remove('hover');
    }
    if (event.keyCode === 57) {
        document.querySelector(".btn[value = '(']").classList.remove('hover');
    }
    if (event.keyCode === 48) {
        document.querySelector(".btn[value = ')']").classList.remove('hover');
    }
    if (event.keyCode === 48 || event.keyCode === 96) {
        document.querySelector(".btn[value = '0']").classList.remove('hover');
    }
    if (event.keyCode === 49 || event.keyCode === 97) {
        document.querySelector(".btn[value = '1']").classList.remove('hover');
    }
    if (event.keyCode === 50 || event.keyCode === 98) {
        document.querySelector(".btn[value = '2']").classList.remove('hover');
    }
    if (event.keyCode === 51 || event.keyCode === 99) {
        document.querySelector(".btn[value = '3']").classList.remove('hover');
    }
    if (event.keyCode === 52 || event.keyCode === 100) {
        document.querySelector(".btn[value = '4']").classList.remove('hover');
    }
    if (event.keyCode === 53 || event.keyCode === 101) {
        document.querySelector(".btn[value = '5']").classList.remove('hover');
    }
    if (event.keyCode === 54 || event.keyCode === 102) {
        document.querySelector(".btn[value = '6']").classList.remove('hover');
    }
    if (event.keyCode === 55 || event.keyCode === 103) {
        document.querySelector(".btn[value = '7']").classList.remove('hover');
    }
    if (event.keyCode === 56 || event.keyCode === 104) {
        document.querySelector(".btn[value = '8']").classList.remove('hover');
    }
    if (event.keyCode === 57 || event.keyCode === 105) {
        document.querySelector(".btn[value = '9']").classList.remove('hover');
    }
    if (event.keyCode === 13 ) {
        document.querySelector(".btn[value = '=']").classList.remove('hover');
    }
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 27) {
        document.querySelector(".btn[value = 'ce']").classList.remove('hover');
    }    
});    
