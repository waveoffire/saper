var t = [];
var wysokosc;
var szerokosc;
var bomby;
var flaga = bomby;
var wygrana = 0;

function komunikat(tekst) {
    var p = document.getElementById("komunikat");
    p.innerHTML = tekst + "<button id='restart' onclick='restart()'>Restart</button>";
    p.style.display = "block";
}

function wielkoscplanszy() {
    var g = prompt("podaj poziom trudnosci planszy      1 - 10/10    2 - 15/15   3 - 20/20")
    var wys = document.getElementById("wyswietlacz");
    if (g == 1) {
        wysokosc = 10;
        szerokosc = 10;
        bomby = 10;
        flaga = bomby;
        wys.innerHTML = "Flag: " + flaga;
    } else if (g == 2) {
        wysokosc = 20;
        szerokosc = 20;
        bomby = 20;
        flaga = bomby;
        wys.innerHTML = "Flag: " + flaga;
    } else if (g == 3) {
        wysokosc = 30;
        szerokosc = 30;
        bomby = 30;
        flaga = bomby;
        wys.innerHTML = "Flag: " + flaga;
    } else {
        wielkoscplanszy();
    }
}

function restart() {
    location.reload();
}

function nowaplansza() {
    t = [];
    var wiersz;
    for (wiersz = 0; wiersz < wysokosc; wiersz++) {
        t.push([]);
        var kol;
        for (kol = 0; kol < szerokosc; kol++) {
            t[wiersz].push(0);
        }

    }
}

function pokazbomby() {
    var wiersz;
    for (wiersz = 0; wiersz < wysokosc; wiersz++) {
        var kol;
        for (kol = 0; kol < szerokosc; kol++) {
            var id = "b" + wiersz + "_" + kol;
            var button = document.getElementById(id);
            if (t[wiersz][kol] == -1) {
                button.className = "hidden"
            }

        }

    }

}

function ukryjprzycisk(wiersz, kolumna) {
    var id = "b" + wiersz + "_" + kolumna;
    var button = document.getElementById(id);
    if (button.className != "hidden") {
        button.className = "hidden";
        wygrana++;
        if (button.dataset.pomoc == 1) {
            var wys = document.getElementById("wyswietlacz");
            button.dataset.pomoc = 0;
            button.style.backgroundImage = "url('0')";
            flaga++;
            wys.innerHTML = "Flag: " + flaga;
        }
        if (t[wiersz][kolumna] == 0) {
            //lewo
            if (kolumna > 0) {
                ukryjprzycisk(wiersz, kolumna - 1);
            }
            //prawo
            if (kolumna < szerokosc - 1) {
                ukryjprzycisk(wiersz, kolumna + 1);
            }
            //gora
            if (wiersz > 0) {
                ukryjprzycisk(wiersz - 1, kolumna);
            }
            //dol
            if (wiersz < wysokosc - 1) {
                ukryjprzycisk(wiersz + 1, kolumna);
            }

            //skosy
            if ((wiersz < wysokosc - 1) && (kolumna < szerokosc - 1)) {
                ukryjprzycisk(wiersz + 1, kolumna + 1);
            }
            if ((wiersz > 0) && (kolumna > 0)) {
                ukryjprzycisk(wiersz - 1, kolumna - 1);
            }
            if ((wiersz > 0) && (kolumna < szerokosc - 1)) {
                ukryjprzycisk(wiersz - 1, kolumna + 1);
            }
            if ((wiersz < wysokosc - 1) && (kolumna > 0)) {
                ukryjprzycisk(wiersz + 1, kolumna - 1);
            }
        }
    }
    if (t[wiersz][kolumna] == -1) {
        var koniec = 1;
        pokazbomby();
        komunikat("Przegrałes");

    }


    var sprawdz = wysokosc * szerokosc - bomby;
    if ((wygrana == sprawdz) && (koniec != 1)) {
        komunikat("wygrałes");
    }






}

function buttonright(e) {
    var wys = document.getElementById("wyswietlacz");
    var button = e.target;
    e.preventDefault();

    if (button.dataset.pomoc != 1) {
        button.style.backgroundImage = "url('flaga.jpg')";
        button.style.backgroundSize = "contain";
        button.style.backgroundRepeat = "no-repeat";
        button.dataset.pomoc = 1;
        flaga--;
        wys.innerHTML = "Flag: " + flaga;
    } else {
        button.dataset.pomoc = 0;
        button.style.backgroundImage = "url('0')";
        flaga++;
        wys.innerHTML = "Flag: " + flaga;
    }


}

function buttonclick(e) {
    var button = e.target;
    var wiersz = parseInt(button.dataset.wiersz);
    var kolumna = parseInt(button.dataset.kolumna);
    ukryjprzycisk(wiersz, kolumna);
}

function pokazplansze() {
    var plansza = document.getElementById("plansza");
    var wiersz;
    for (wiersz = 0; wiersz < wysokosc; wiersz++) {
        var tr = document.createElement("tr");
        plansza.appendChild(tr);
        var kol;
        for (kol = 0; kol < szerokosc; kol++) {
            var td = document.createElement("td");
            td.innerHTML = t[wiersz][kol];
            td.className = "p" + t[wiersz][kol];
            var button = document.createElement("button");
            button.id = "b" + wiersz + "_" + kol;
            button.dataset.wiersz = wiersz;
            button.dataset.kolumna = kol;
            button.addEventListener("click", buttonclick);
            button.addEventListener("contextmenu", buttonright);
            td.appendChild(button);
            tr.appendChild(td);
        }

    }
}

function postawbomby(ile) {
    var i = 0;
    while (i < ile) {
        var w = Math.floor(Math.random() * wysokosc);
        var k = Math.floor(Math.random() * szerokosc);
        if (t[w][k] != -1) {
            t[w][k] = -1;
            i++;
            //lewo
            if ((k != 0) && (t[w][k - 1] != -1)) {
                t[w][k - 1]++;
            }
            //prawo
            if ((k != szerokosc - 1) && (t[w][k + 1] != -1)) {
                t[w][k + 1]++;
            }
            //gora
            if ((w != 0) && (t[w - 1][k] != -1)) {
                t[w - 1][k]++;
            }
            //dol
            if ((w != wysokosc - 1) && (t[w + 1][k] != -1)) {
                t[w + 1][k]++;
            }

            //skosy
            if ((k != szerokosc - 1) && (w != wysokosc - 1) && (t[w + 1][k + 1] != -1)) {
                t[w + 1][k + 1]++;
            }
            if ((k != 0) && (w != 0) && (t[w - 1][k - 1] != -1)) {
                t[w - 1][k - 1]++;
            }
            if ((k != szerokosc - 1) && (w != 0) && (t[w - 1][k + 1] != -1)) {
                t[w - 1][k + 1]++;
            }
            if ((k != 0) && (w != wysokosc - 1) && (t[w + 1][k - 1] != -1)) {
                t[w + 1][k - 1]++;
            }


        }

    }

}

wielkoscplanszy();
nowaplansza();
postawbomby(bomby);
pokazplansze();