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
resultKey.addEventListener('click', function(){
    result();
    blockNumKeys();
    unblockOperKeys();
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
        for (let i=0; i<numKeys.length; i++){
            numKeys[i].disabled = true;
        }
        for(let i=0; i<operKeys.length; i++){
            operKeys[i].disabled = true;
        }
    }
}


/* BLOKUJE KLAWISZE NUMERYCZNYE PO NACIŚNIĘCIU "=" */
function blockNumKeys(){
    for (let i=0; i<numKeys.length; i++){
        numKeys[i].disabled = true;
    }
}

///////////////////////////////////////////////////
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


/* ODBLOKOWUJE KLAWISZE FUNKCYJNE */
function unblockOperKeys(){
    for (let i=0; i<operKeys.length; i++){
        operKeys[i].disabled = false;
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


/* GDY WYNIK JEST LICZBĄ DZIESIĘTNĄ USUWA Z KOŃCA NIEPOTRZEBNE ZERA */ 
function updateResult(result) {
    if (result.indexOf('.') > -1 && result.indexOf('e') < 0) {
        result = result.replace(/.0+$/, '');
    }
    else{
        result;
    }
    return result;
}


/* POBIERA ZNAKI Z KLAWISZY I WYPISUJE JE NA EKRAN*/
function getValue(keyVal) {
    let lastChar = display.value[display.value.length-1];

    //blokuje możliwość wpisania kilkukrotnie znaku " + - * / "
    if (keyVal == '-' || keyVal == '+' || keyVal == '*' || keyVal == '/' ){
        
        if(operators.indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '');
        }    
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
        let twoCharsAfterLast = (display.value[display.value.length-3] + display.value[display.value.length-2]);
        
        //blokuje zero po znaku "-"
        if (('-0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "+"
        else if (('+0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "*"
        else if (('*0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po znaku "/"
        else if (('/0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }
        //blokuje zero po nawiasie "("
        else if (('(0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/.$/, '');
        }        
        //po nawiasie ")" zamienia "0" na "*0"
        else if((')').indexOf(lastChar) > -1){
            display.value = display.value.replace(/.$/, '*' + keyVal + ''); 
        }
    }

    if (keyVal == "."){
        //jeżeli na końcu jest "." - blokuje dodanie kolejnych "."
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
        keyVal == "7" || keyVal == "8" || keyVal == "9"  ) {

        //zamienia zero stojąca za znakiem "-" na wartość klikniętego klawisza numerycznego
        if (('-0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za znakiem "+" na wartość klikniętego klawisza numerycznego
        else if (('+0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za znakiem "*" na wartość klikniętego klawisza numerycznego
        else if (('*0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za znakiem "/" na wartość klikniętego klawisza numerycznego
        else if (('/0').indexOf(twoCharsAfterLast) > -1){
            display.value = display.value.replace(/..$/, keyVal);
        }
        //zamienia zero stojąca za nawiasem "(" na wartość klikniętego klawisza numerycznego
        else if (('(0').indexOf(twoCharsAfterLast) > -1){
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

    if (keyVal == '/' || keyVal == '*' || keyVal == '+' ){
        let lastTwoChars = (display.value[display.value.length-2] + display.value[display.value.length-1]);
        
        //blokuje użycie operatorów "+", "*", "/" po nawiasie "("
        if(('(').indexOf(lastChar) > -1){
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
}


/* SPRAWDZA CZY ILOŚĆ NAWIASÓW OTWIERAJĄCYCH I ZAMYKAJĄCYCH JEST TAKA SAMA */
function checkBrackets(display) {
    counter_1 = 0;
    counter_2 = 0;

    for (let i = 0; i < display.length; i++) {
        if (display[i] == '(' ) {
            counter_1++
        } else if (display[i] == ')' ) {
            counter_2++
        }
    }
    if (counter_1 == counter_2) {
        return true;
    } else {
        return false;
    }
}


/* WALIDUJE WPROWADZONY CIĄG ZNAKÓW I ZWRACA WYNIK LUB ERROR */
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
    if(display.value.indexOf("(") > -1 || display.value.indexOf(")") > -1){
        if(checkBrackets(display.value) == true){
            let regular = /(\(+)((\-|\+)?)((\d*\.\d+)|(\d+))((\-|\+|\*|\/)((\d*\.\d+)|(\d+)))*(\)+)/;
            let error_1 = /(\d+\.\d+\.)/;               // X.X.
            let error_2 = /(\.)(\(+|\)+)/;              // .)|( 
            
            if(regular.test(display.value) == false){
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            else if(error_1.test(display.value) == true){
                    display.value = "Error";
                    blockAllKeys(display.value);
            }
            else if(error_2.test(display.value) == true){
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
        let error =  /(\d+\.\d+\.)/;    // X.X.
        
        if(error.test(display.value) == true){
           display.value = "Error";
           blockAllKeys(display.value);
        }        
        else{
            let result = eval(display.value);

            if (result == "Infinity" || result == "-Infinity"){
                display.value = "Error";
                blockAllKeys(display.value);
            }
            else if (isNaN(result) == true) {
                display.value = "Error";
                blockAllKeys(display.value);
            }
            else{
                display.value = resultLength(result);
            }  
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

