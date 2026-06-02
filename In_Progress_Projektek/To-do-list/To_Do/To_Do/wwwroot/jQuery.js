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

            const $kli = $("<li></li>");
            const $ktarol = $('<div class="ktarol"></div>');
            const $btnArch = $("<button type='button'>Archívumba mentés</button>");

            $ntarol.append($nli).append($btnTorol).append($btnKezs);
            $nincsKesz.append($ntarol);

            $input.val('');

            $btnTorol.on('click', function () {
                $(this).parent().slideToggle(250);
            });

            $btnKezs.on('click', function () {
                $kli.text() == $nli.text();
                $ktarol.append($kli).append($btnArch);
                $kesz.append($ktarol);
                $(this).parent().slideToggle(250);
            });
        }
    });

});