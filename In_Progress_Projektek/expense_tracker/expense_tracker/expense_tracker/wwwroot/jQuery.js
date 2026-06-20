$(function () {

    let $aktEgyenleg = $('#aktEgyenleg');
    let $koltsegForm = $('#koltsegForm');
    let $nTarolo = $('#nTarolo');
    let kiadas = $('#kiadas');
    let bevetel = $('#bevetel');
    let adatTarolo = [];

    Betoltes();
    AktualPenz();

    $koltsegForm.submit(function (e) {
        e.preventDefault();
        let $koltsegInput = $('#koltsegInput');
        let $dropDown = $('#KiBeVmi');
        let $osszegInput = $('#osszegInput');
        let dolog = $koltsegInput.val().trim();
        let tipus = $dropDown.val().trim();
        let osszeg = $osszegInput.val().trim();
        if (dolog === '' || tipus === '' || osszeg === '' || isNaN(osszeg) ) {
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
            let $kkTarolo = $('<div></div>');
            let $nkTarolo = $('<div></div>');
            $kTarolo.addClass('kTarolo');
            $kkTarolo.addClass('kkTarolo');
            $nkTarolo.addClass('nkTarolo').hide();
            $kTarolo.append(`Költség típusa: <span style="color:${bekiSzin(beKi)}">${beKi}</span>,  Megnevezés: ${vett},`);
            $kkTarolo.append(`Összeg: ${mennyi}, Időpont: ${mikor}`);
            $nkTarolo.append($kTarolo, $kkTarolo, $btnTorol);
            if (adatTarolo[i].mi === "Kiadás") {
                kiadas.append($nkTarolo);
                $nTarolo.append(kiadas)
            }
            else if (adatTarolo[i].mi === "Bevétel") {
                bevetel.append($nkTarolo);
                $nTarolo.append(bevetel)
            }
            $nkTarolo.fadeIn(400);
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
            if (adatTarolo[i].mi === "Kiadás") {
                pez -= adatTarolo[i].mennyi;
                $aktEgyenleg.text(pez);
            }
            else if (adatTarolo[i].mi === "Bevétel") {
                pez += adatTarolo[i].mennyi;
                $aktEgyenleg.text(pez);
            }
            else if (adatTarolo.length === 0) {
                $aktEgyenleg.text("Nincs még költség rögzítve");
            }
        }
        if (pez >= 0) {
            $aktEgyenleg.css("color", "green");
        } else {
            $aktEgyenleg.css("color", "red");
        }
    }

    function bekiSzin(ertek) {
        if (ertek === "Kiadás") {
            return "red";
        } else if (ertek === "Bevétel") {
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
    };
});