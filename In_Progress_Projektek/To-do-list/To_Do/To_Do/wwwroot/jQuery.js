$(function () {

    const $ujFeladat = $('#feladatPlusz');
    const $nincsKesz = $('#nkLista');
    const $kesz = $('#kLista');

    $ujFeladat.submit(function (e) {
        e.preventDefault();

        const $input = $('#feladat');
        const feladat = $input.val().trim();

        if (feladat !== '') {

            const $btnTorol = $("<button type='button'>Törlés</button>");
            const $btnKezs = $("<button type='button'>Kész</button>");
            const $nli = $("<li></li>").text(feladat);
            const $ntarol = $('<div class="ntarol"></div>');

            const $kli = $("<li></li>").text(feladat);
            const $ktarol = $('<div class="ktarol"></div>');
            const $btnArch = $("<button type='button'>Archívumba mentés</button>");

            $ntarol.append($nli).append($btnTorol);
            $nincsKesz.append($ntarol);

            $input.val('');

            $btnTorol.on('click', function () {
                $(this).parent().slideUp(300);
            });

            $btnKezs.on('click', function () {
                $(this).parent().slideDown(300);
            });
        }
    });

});