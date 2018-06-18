let display = document.querySelector('#display');
let allKeys = document.querySelectorAll('.btn');
let numKeys = document.querySelectorAll('.number');
let operKeys = document.querySelectorAll('.operator');
let resultKey = document.querySelector('.result');
let clearKey = document.querySelector('.clear');
let decimalKey = document.querySelector('.btn[value = "."]');
let operators = ['+', '-', '*', '/'];


/* ZDARZENIA NA PRZYCISKU "=" */
resultKey.addEventListener('click', function(){
    result();
    blockNumKeys();
    changeToAC();
    changeFontSize();
});


/* ZDARZENIA NA PRZYCISKU "." */
decimalKey.addEventListener('click', function(){
    blockDecimal();
});


/* ZDARZENIA NA PRZYCISKACH FUNKCYJNYCH */
for(let i=0; i<operKeys.length; i++){
    operKeys[i].addEventListener('click', function(){
        unblockAllKeys();
        changeFontSize();
        changeToCE();
        blockDisplayLength();    
    });
}


/* ZDARZENIA NA PRZYCISKACH NUMERYCZNYCH */
for(let i=0; i<numKeys.length; i++){
    numKeys[i].addEventListener('click', function(){
        changeFontSize();
        blockDisplayLength();  
    });
}


/* ZDARZENIA NA PRZYCISKU "CE" */
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


/* BLOKUJE WSZYSTKIE KLAWISZE (Z WYJĄTKIEM "AC"), GDY NA EKRANIE POJAWI SIĘ ERROR */
function blockAllKeys(display){
    if(display == 'Error'){
        for (let i=1; i<allKeys.length; i++){
            allKeys[i].disabled = true;
        }
    }
}


/* BLOKUJE WSZYSTKIE KLAWISZE (OPRÓCZ "CE" I "=") PO WYPISANIU WIĘCEJ NIŻ 20 ZNAKÓW */
function blockDisplayLength(){
    if(display.value.length >= 20){
        for (let i=1; i<numKeys.length-1; i++){
            numKeys[i].disabled = true;
        }
    }
}


/* BLOKUJE KLAWISZE NUMERYCZNYE PO NACIŚNIĘCIU "=" */
function blockNumKeys(){
    for (let i=0; i<numKeys.length; i++){
        numKeys[i].disabled = true;
    }
}


/* BLOKUJE KLAWISZ "." PO PIERWSZYM NACIŚNIĘCIU */
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


/* "CE" - USUWA PO JEDNYM ZNAKU Z EKRANU */
function clearEnter() {
    if(display.value.length > 1){
        display.value = display.value.replace(/.$/, '');
    }
    else{
        display.value = display.value.replace(/.$/, '0');
    }
}


/* "AC" - CZYŚCI CAŁY EKRAN */
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
 

/* FORMATUJE WYNIK, ŻEBY ZMIEŚCIŁ SIĘ NA EKRANIE */
function resultLength(result){
    if(result.toString().length > 12){
        result = result.toPrecision(10);
    }
    else{
         result = result.toString();
    }
    return updateResult(result);
}


// GDY WYNIK JEST LICZBĄ DZIESIĘTNĄ USUWA Z KOŃCA NIEPOTRZEBNE ZERA 
function updateResult(result) {
    if (result.indexOf('.') > -1 && result.indexOf('e') < 0) {
        result = result.replace(/0+$/, '');
    }
    else{
        result;
    }
    return result;
}


/*POBIERA ZNAKI Z KLAWISZY I WYPISUJE JE NA EKRAN*/
function getValue(keyVal) {
    let lastChar = display.value[display.value.length-1];
    let firstChar = display.value[0];

    //blokuje możliwość wpisania kilkukrotnie znaku " + - * / "
    if (keyVal == '-' || keyVal == '+' || keyVal == '*' || keyVal == '/' ){
        
        if(operators.indexOf(lastChar) > -1)
            display.value = display.value.replace(/.$/, '');
    }    
    
    //zamienia defaultowe "0" z ekranu na cyfrę lub dodaje do "0" znaki " + - * / . "
    if (display.value == "0"){
        if (keyVal == '+' || keyVal == '*' || keyVal =='-' ||
            keyVal == '/' || keyVal == '.' ){
            display.value += keyVal;
        }
        else{
            display.value = keyVal;
            }
        }
    else{
        display.value += keyVal;
    }
    
    
    if (keyVal == '0'){
        let twoCharAfterLast = (display.value[display.value.length-3] + display.value[display.value.length-2]);
        //blokuje zero po znaku "-"
        if (('-0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "+"
        else if (('+0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "*"
        else if (('*0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "/"
        else if (('/0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po nawiasie ")"
        else if ((')0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po nawiasie "("
        else if (('(0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }        
        //po znaku " + - * / " zamienia "0" na "0."
        else if(operators.indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '0.'); 
        }
        //po nawiasie ")" zamienia "0" na "*0."
        else if((')').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '*' + keyVal + '.'); 
        }
        //po nawiasie "(" zamienia "0" na "0."
        else if(('(').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, keyVal + '.');
        }
    }
        
    if (keyVal == "."){
        //jeżeli na końcu jest "." - blokuje dodanie kolejnych
        if (('.').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //po znaku " + - * / " zamienia "." na "0."
        else if((operators).indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '0' + keyVal); 
        }
        //po nawiasie "(" zamienia "." na "0."
        else if (('(').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '0' + keyVal); 
        }
        //po nawiasie ")" zamienia "." na "*0."
        else if((')').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '*0' + keyVal);
        }
    }
        
    if (keyVal == "1" || keyVal == "2" || keyVal == "3" ||
        keyVal == "4" || keyVal == "5" || keyVal == "6" ||
        keyVal == "7" || keyVal == "8" || keyVal == "9" ){
                
        let twoCharAfterLast = (display.value[display.value.length-3] + display.value[display.value.length-2]);
        
        //zamienia zero stojąca za znakiem "-" na wartość klikniętego klawisza numerycznego
        if (('-0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za znakiem "+" na wartość klikniętego klawisza numerycznego
        else if (('+0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za znakiem "*" na wartość klikniętego klawisza numerycznego
        else if (('*0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za znakiem "/" na wartość klikniętego klawisza numerycznego
        else if (('/0').indexOf(twoCharAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //dodaje znak "*" między nawias ")" i liczbę
        else if ((')').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '*' + keyVal); 
        }
    }
    
    if (keyVal == '(' ){
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        //jeśli na ekranie jest tylko "0" to zamienia je na nawias "("
        if(display.value.length == 1){
            if (('0').indexOf(lastChar) > -1){
                display.value = display.value.replace(/.$/, keyVal); 
            }
        }
        //jeśli ostatnim znakiem jest ")" dodaje "*" przed nawias "("
        else if ((')').indexOf(lastChar)>-1){
            display.value = display.value.replace(/.$/, '*' + keyVal);
        }
        //dodaje znak mnożenia "*" między liczbę i nawias "("
        else if (numbers.indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '*' + keyVal); 
        }
    }
    
    if (keyVal == '/' || keyVal == '*'){
        //blokuje użycie operatorów "*" i "/" po nawiasie "("
        if(('(').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, ''); 
        }
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
    
    //sprawdza czy na końcu jest znak " + - * /" i usuwa go
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


