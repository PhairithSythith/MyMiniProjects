$(function () {

    let $aktEgyenleg = $('#aktEgyenleg');
    let $koltsegForm = $('#koltsegForm');
    let $nTarolo = $('#nTarolo');
    let adatTarolo = [];

    $koltsegForm.submit(function (e) {
        e.preventDefault();
        let $koltsegInput = $('#koltsegInput').val().trim();
        let $dropDown = $('#dropDown').val().trim();
        let $osszegInput = $('#osszgInput').val().trim();
        if ($koltsegInput !== '' && $koltsegInput !== null && $dropDown !== '' && $dropDown !== null && $osszegInput !== '' && $osszegInput !== null) {
            const now = new Date();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            const kulcsDate = year + "." + month;
            adatTarolo.push({ id: Date.now(), dolog: $koltsegInput, mi:$dropDown, mennyi: $osszegInput, mikor: kulcsDate});
            Epites();
            Mentes();
            $koltsegInput.val('');
            $dropDown.val('');
            $osszegInput.val('');
        }
        else return;
    });

    function Epites() {
        $nTarolo.empty();
        for (let i = adatTarolo.length; i >= 0; i--) {
            var egyAdat = adatTarolo[i];
            var vett = adatTarolo[i].dolog;
            var beKi = adatTarolo[i].mi;
            var mennyi = adatTarolo[i].mennyi;
            var mikor = adatTarolo[i].mikor;
        }
    };
});