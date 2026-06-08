$(function () {

    let $aktEgyenleg = $('#aktEgyenleg');
    let $koltsegForm = $('#koltsegForm');
    let $nTarolo = $('#nTarolo');
    let adatTarolo = [];

    Betoltes();
    AktualPenz();

    $koltsegForm.submit(function (e) {
        e.preventDefault();
        let $koltsegInput = $('#koltsegInput');
        let $dropDown = $('#dropDown');
        let $osszegInput = $('#osszegInput');
        let dolog = $koltsegInput.val().trim();
        let tipus = $dropDown.val().trim();
        let osszeg = $osszegInput.val().trim();
        if (dolog === '' || tipus === '' || osszeg === '') {
            return;
        }
        let osszegSzam = parseInt(osszeg);
        const now = new Date();
        const datum = `${now.getFullYear()}.${now.getMonth() + 1}`;
        adatTarolo.push({id: Date.now(), dolog: dolog, mi: tipus, mennyi: osszegSzam, mikor: datum});
        Epites();
        AktualPenz();
        Menetes();
        $koltsegInput.val('');
        $dropDown.val('');
        $osszegInput.val('');
    });

    function Epites() {
        $nTarolo.empty();
        for (let i = adatTarolo.length-1; i >= 0; i--) {
            var egyAdat = adatTarolo[i];
            var vett = adatTarolo[i].dolog;
            var beKi = adatTarolo[i].mi;
            var mennyi = adatTarolo[i].mennyi;
            var mikor = adatTarolo[i].mikor;
            var $btnTorol = $('<button type="button" class="btnTorol">Törlés</button>');
            $btnTorol.data("id", egyAdat.id);
            let $kTarolo = $('<div></div>');
            $kTarolo.addClass('kTarolo');
            $kTarolo.append(`Költség típusa: <span style="color:${bekiSzin(beKi)}">${beKi}</span>, Megnevezés: ${vett}, Összeg: ${mennyi}, Időpont: ${mikor}`, $btnTorol).hide();
            $nTarolo.append($kTarolo);
            $kTarolo.fadeIn(400);
        }
    };

    $(document).on('click', '.btnTorol', function () {
        let id = $(this).data('id');
        let item = adatTarolo.find(function (x) {
            return x.id === id;
        }); adatTarolo.splice(adatTarolo.indexOf(item), 1);
        $(this).parent().fadeOut(400, function () {
            AktualPenz();
            Menetes();
        });
    });

    function AktualPenz() {
        let pez = 0;
        for (let i = 0; i <adatTarolo.length; i++) {
            if (adatTarolo[i].mi === "Kiadás" || adatTarolo[i].mi === "Kiadas") {
                pez -= adatTarolo[i].mennyi;
            }
            else if (adatTarolo[i].mi === "Bevétel" || adatTarolo[i].mi === "Bevetel") {
                pez += adatTarolo[i].mennyi;
            }
            else continue;
        }
        $aktEgyenleg.text(pez);
        if (pez >= 0) {
            $aktEgyenleg.css("color", "green");
        } else {
            $aktEgyenleg.css("color", "red");
        }
    }

    function bekiSzin(ertek) {
        if (ertek === "Kiadás" || ertek === "Kiadas") {
            return "red";
        } else if (ertek === "Bevétel" || ertek === "Bevetel") {
            return "green";
        }
        else return "black";
    }

    function Menetes() {
        localStorage.setItem('adatTarolo', JSON.stringify(adatTarolo));
    };

    function Betoltes() {
        const mentettTarolo = localStorage.getItem('adatTarolo');
        adatTarolo = mentettTarolo ? JSON.parse(mentettTarolo) : [];
        Epites();
        AktualPenz();
    }
});