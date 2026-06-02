$(function() {

    const $ujFeladat = $('#feladatPlusz');
    const $elFeladat = $('#feladatMinusz');
    const $nincsKesz = $('#nkLista');
    const $kesz = $('#kLista');
    

    $ujFeladat.submit(function (e) {
        e.preventDefault();
        const $input = $('#feladat');
        const feladat = $input.val().trim();
        if (feladat !== '' && feladat !== null) {
            $nincsKesz.append($('<li>').text(feladat));
            $input.val('');
        }

    });

});