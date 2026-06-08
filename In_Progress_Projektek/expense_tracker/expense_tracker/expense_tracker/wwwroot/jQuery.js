$(function () {

    let $aktEgyenleg = $('#aktEgyenleg');
    let $koltsegForm = $('#koltsegForm');
    let adatTarolo = [];

    $koltsegForm.submit(function (e) {
        e.preventDefault();
        let $koltsegInput = $('#koltsegInput');
        let $dropDown = $('#dropDown');
        let $osszegInput = $('#osszgInput');
        if ($koltsegInput !== '' && $koltsegInput !== null && $dropDown !== '' && $dropDown !== null && $osszegInput !== '' && $osszegInput !== null) {
            const now = new Date();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            const kulcsDate = year + "-" + month;
            adatTarolo.push({ id: Date.now(), f: feladat, date: kulcsDate, done: false });
            Render();
            Mentes();
            $koltsegInput.val('');
        }
    });
   
});