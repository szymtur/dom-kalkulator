function pobierzWartosc(cyferki) {
    document.getElementById('ekran').value += cyferki;
}


function wyczyscEkran() {
    document.getElementById('ekran').value = '';
}

function pokazWynik() {
    var wynik = document.getElementById('ekran').value = eval(document.getElementById("ekran").value);

    if (wynik == "Infinity" || wynik == "function Error() { [native code] }" || wynik == "-Infinity") {
        document.getElementById('ekran').value = "Error";
    } else {
        document.getElementById('ekran').value = wynik;
    }
}
