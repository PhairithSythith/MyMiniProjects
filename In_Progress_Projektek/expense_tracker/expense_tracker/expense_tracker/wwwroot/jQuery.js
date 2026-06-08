$(function () {

    let $aktEgyenleg = $('#aktEgyenleg');
    let $koltsegForm = $('#koltsegForm');
    let $nTarolo = $('#nTarolo');
    let adatTarolo = [];

    $koltsegForm.submit(function (e) {
        e.preventDefault();
        let $koltsegInput = $('#koltsegInput');
        let $dropDown = $('#dropDown');
        let $osszegInput = $('#osszgInput');
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
            $kTarolo.append(`Költség típusa: ${beKi}, Megnevezés: ${vett}, Összeg: ${mennyi}, Időpont: ${mikor}`, $btnTorol);
            $nTarolo.append($kTarolo);
        }
    };

    $(document).on('click', '.btnTorol', function () {
        let id = $(this).data('id');
        let item = adatTarolo.find(function (x) {
            return x.id === id;
        }); adatTarolo.splice(adatTarolo.indexOf(item), 1);
        $(this).parent().fadeOut(400, function () {
            Epites();
            AktualPenz();
        });
    });

    function AktualPenz() {
        let pez = 0;
        for (let i = adatTarolo.length - 1; i >= 0; i--) {
            if (adatTarolo[i].mi === "Kiadás" || adatTarolo[i].mi === "Kiadas") {
                pez-= adatTarolo[i].mennyi;
            }
            else {
                pez += adatTarolo[i].mennyi;
            }
        }
        $aktEgyenleg.text(pez);
    }

    function bekiSzin(ertek) {
        if (ertek === "Kiadás" || ertek === "Kiadas") {
            return ertek.style.color = "red";
        } else {
            return ertek.style.color = "green";
        }
    }
});