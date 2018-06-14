let display = document.querySelector('#display');
let allKeys = document.querySelectorAll('.btn');
let numKeys = document.querySelectorAll('.number');
let operKeys = document.querySelectorAll('.operator');
let resultKey = document.querySelector('.result');
let clearKey = document.querySelector('.clear');
let decimalKey = document.querySelector('.btn[value = "."]');
let operators = ['+', '-', '*', '/'];


/* ZDARZENIA NA PRZUCISKU " = " */
resultKey.addEventListener('click', function(){
    result();
    blockNumKeys();
    changeToAC();
    changeFontSize();
});


/* ZDARZENIA NA PRZYCISKU " . " */
decimalKey.addEventListener('click', function(){
    blockDecimal();
});


/* ZDARZENIA NA PRZYCISKACH FUNKCYJNYCH */
for(let i=0; i<operKeys.length; i++){
    operKeys[i].addEventListener('click', function(){
        unblockAllKeys();
        changeToCE();
        changeFontSize();
    });
}


/* ZDARZENIA NA PRZYCISKACH NUMERYCZNYCH */
for(let i=0; i<numKeys.length; i++){
    numKeys[i].addEventListener('click', function(){
        changeFontSize();
        blockDisplayLength();    
    })
}


/* ZDARZENIE NA PRZYCISKU " CE " */
clearKey.addEventListener('click', function(){
     if(clearKey.className.indexOf('ac') > -1){
         unblockAllKeys();
         allClear();
         changeToCE();
         changeFontSize();
    }
    else if(clearKey.className.indexOf('ce') > -1 ){
        unblockAllKeys();
        clearEnter();
        changeFontSize();
    }
})


/* BLOKUJE WSZYSTKIE KLAWISZE (Z WYJĄTKIEM AC), GDY NA EKRANIE POJAWI SIĘ ERROR */
function blockAllKeys(display){
    if(display == 'Error'){
        for (let i=1; i<allKeys.length; i++){
            allKeys[i].disabled = true;
        }
    }
}


/* BLOKUJE KLAWISZE PO WYPISANIU WIĘCEJ NIŻ 20 ZNAKÓW */
function blockDisplayLength(){
    if(display.value.length >= 20){
        for (let i=1; i<numKeys.length-1; i++){
            numKeys[i].disabled = true;
        }
    }
}


/* BLOKUJE KLAWISZE NUMERYCZNYE PO NACIŚNIĘCIU " = " */
function blockNumKeys(){
    for (let i=0; i<numKeys.length; i++){
        numKeys[i].disabled = true;
    }
}


/* BLOKUJE KLAWISZ "." PO PIERWSZYM NACIŚNIĘCIU*/
function blockDecimal() {
    if (display.value.indexOf('.') > -1) {
        decimalKey.disabled = true;
    }
}


/* ODBLOKOWUJE WSZYSTKIE KLAWISZE */
function unblockAllKeys(){
    for (let i=1; i<allKeys.length; i++){
        allKeys[i].disabled = false;
    }
}
 

/* FORMATUJE WYNIK, ŻEBY ZMIEŚCIŁ SIĘ NA EKRANIE */
function resultLength(display){
        let result = 0;
        if(display.toString().length > 15){
            result = display.toPrecision(15);
        }
        else{
            result = display;
        }
        return result;
}


/* CE - USUWA PO JEDNYM ZNAKU Z EKRANU */
function clearEnter() {
    if(display.value.length > 1){
        display.value = display.value.replace(/.$/, '');
    }
    else{
        display.value = display.value.replace(/.$/, '0');
    }
}


/* AC - CZYŚCI CAŁY EKRAN */
function allClear(){
    display.value = '0';
}


/* ZMIENIA PRZYCISK "CE" NA "AC" */
function changeToAC(){
    clearKey.innerText = 'AC';
    clearKey.classList.remove('ce');
    clearKey.classList.add('ac');
}


/* ZMIENIA PRZYCISK "AC" NA "CE" */
function changeToCE(){
    clearKey.innerText = 'CE';
    clearKey.classList.remove('ac') ;
    clearKey.classList.add('ce');    
}


/* ZMIENIA WIELKOŚĆ CZCIONKI EKRANU PO WPISANIU 15 ZNAKÓW */
function changeFontSize(){
    if(display.value.length > 15){
        display.style.fontSize = '30px';
    }
    else {
        display.style.fontSize = '40px';
    }
}


/*POBIERA ZNAKI Z KLAWISZY I WYPISUJE JE NA EKRAN*/
function getValue(keyVal) {
    let lastChar = display.value[display.value.length-1];
    
    //blokuje możliwość wpisania kilkukrotnie znaku " + - * / "
    if (keyVal == '-' || keyVal == '+' || keyVal == '*' || keyVal == '/' ){
        
        if(operators.indexOf(lastChar) > -1)
            display.value = display.value.replace(/.$/, '');
    }
    
    //zamienia defaultowe "0" z ekranu na cyfrę lub dodaje do "0" znaki " + - * / . "
    if(display.value === "0"){
        if( keyVal == '+' || keyVal == '*' || keyVal =='-' ||
            keyVal == '/' || keyVal == '.' ){
            display.value += keyVal ;
        }
        else{
            display.value = keyVal;
            }
        }
    else{
        display.value += keyVal;
    }
}


/* SPRAWDZA CZY ILOŚĆ NAWIASÓW OTWIERAJĄCYCH I ZAMYKAJĄCYCH JEST TAKA SAMA */
function checkBrackets(display) {
    counter_1 = 0;
    counter_2 = 0;

    for (let i = 0; i < display.length; i++) {
        if (display[i] == '(') {
            counter_1++
        } else if (display[i] == ')') {
            counter_2++
        }
    }
    if (counter_1 == counter_2) {
        return true;
    } else {
        return false;
    }
}

/*WALIDUJE WPROWADZONY CIĄG ZNAKÓW I ZWRACA WYNIK LUB ERROR */
function result(){
    
    //sprawdza czy na końcu jest znak " + - * /" jeśli tak to go usuwa
    let lastChar = display.value[display.value.length-1];
    if(operators.indexOf(lastChar) > -1){
        display.value = display.value.replace(/.$/, '');
    }
    
    //zamienia ")(" na ")*("
    let reg = /\)\(/;
    for(let i=0; i<display.value.length; i++){
        if(reg.test(display.value) == true){
            display.value = display.value.replace(/\)\(/g, ')*(');
        }    
    }
    
    //sprawdza poprawność wprowadzonego ciągu znaków i zwraca wynik lub "Error"
    if (display.value.indexOf("(") > -1 || display.value.indexOf(")") > -1){
        if(checkBrackets(display.value) == true){
            let regular = /(\(+)((\-|\+)?)((\d*\.\d+)|(\d+))((\-|\+|\*|\/)((\d*\.\d+)|(\d+)))*(\)+)/;
            let error_1 = /(\)+)(\.)/;                  // ).
            let error_2 = /(\.)(\(+|\)+)/;              // .)|(
            let error_3 = /((\d+\.\d+)|(\d+))(\(+)/;    // X(
            let error_4 = /(\)+)((\d+\.\d+)|(\d+))/;    // )X
            let error_5 = /(\(+)(\)+)/;                 // ()
            
            if (regular.test(display.value) == false) {
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            if(error_1.test(display.value) == true){
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            else if(error_2.test(display.value) == true){
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            else if(error_3.test(display.value) == true){
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            else if(error_4.test(display.value) == true){
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            else if(error_5.test(display.value) == true){
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            else{
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
        else{
            display.value = "Error";
            blockAllKeys(display.value); 
        }
    }    
    else{
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
    if (event.keyCode === 61) {
        document.querySelector(".btn[value = '=']").click();
    }
    if (event.keyCode === 46 || 
        event.keyCode === 44) {
        document.querySelector(".btn[value = '.']").click();
    }
    if (event.keyCode === 40) {
        document.querySelector(".btn[value = '(']").click();
    }
    if (event.keyCode === 41) {
        document.querySelector(".btn[value = ')']").click();
    }
    if (event.keyCode === 48 ) {
        document.querySelector(".btn[value = '0']").click();
    }
    if (event.keyCode === 49) {
        document.querySelector(".btn[value = '1']").click();
    }
    if (event.keyCode === 50) {
        document.querySelector(".btn[value = '2']").click();
    }
    if (event.keyCode === 51) {
        document.querySelector(".btn[value = '3']").click();
    }
    if (event.keyCode === 52) {
        document.querySelector(".btn[value = '4']").click();
    }
    if (event.keyCode === 53) {
        document.querySelector(".btn[value = '5']").click();
    }
    if (event.keyCode === 54) {
        document.querySelector(".btn[value = '6']").click();
    }
    if (event.keyCode === 55) {
        document.querySelector(".btn[value = '7']").click();
    }
    if (event.keyCode === 56) {
        document.querySelector(".btn[value = '8']").click();
    }
    if (event.keyCode === 57) {
        document.querySelector(".btn[value = '9']").click();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13 ) {
        document.querySelector(".btn[value = '=']").click();
    }
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 27) {
        document.querySelector(".btn[value = 'ce']").click();
    }
});


