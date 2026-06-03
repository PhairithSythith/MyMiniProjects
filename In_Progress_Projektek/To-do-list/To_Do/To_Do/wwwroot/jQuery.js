$(function() {
   
    const $ujFeladat = $('#feladatPlusz');
    var $nincsKesz = $('#nkLista');
    var $kesz = $('#kLista');
    const adatTarolo = [];
    const adatArchiv = [];

    $ujFeladat.submit(function(e) {
        e.preventDefault();
        const $input = $('#feladat');
        const feladat = $input.val().trim();
        if (feladat != '' && feladat != null) {
            const now = new Date();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            const kulcsDate = year + "-" + month;

            adatTarolo.push({id: Date.now(), f: feladat, date: kulcsDate, done: false });
            Render();
        }
        else return;
    });
    function Render() {
        $nincsKesz.empty();
        $kesz.empty();
        for (let i = 0; i < adatTarolo.length; i++) {
            if (adatTarolo[i].done == false) {
                var item = adatTarolo[i];
                let feladat = adatTarolo[i].f;
                let kulcsDate = adatTarolo[i].date;
                let done = adatTarolo[i].done;
                var $btnTorol = $('<button type="button">Törlés</button>');
                $btnTorol.data("id", item.id);
                var $btnKezs = $('<button type="button">Kész</button>');
                $btnKezs.data("id", item.id);
                const $nli = $('<li></li>').text(feladat + " " + kulcsDate);
                const $ntarol = $('<div class="ntarol"></div>');
                $ntarol.append($nli).append($btnTorol).append($btnKezs);
                $nincsKesz.append($ntarol);

                $btnKezs.on('click', function () {
                    const id = $(this).data("id");
                    const item = adatTarolo.find(function (x) {
                        return x.id === id;
                    });
                    item.done = true;
                    Render();
                });
                $btnTorol.on('click', function () {
                    const id = $(this).data("id");
                    const item = adatTarolo.find(function (x) {
                        return x.id === id;
                    });
                    adatTarolo.splice(adatTarolo.indexOf(item), 1);
                    Render();
                });
            }
            else {
                var item = adatTarolo[i];
                let feladat = adatTarolo[i].f;
                let kulcsDate = adatTarolo[i].date;
                let done = adatTarolo[i].done;
                var $btnArchiv = $('<button type="button">Archívumba mentés</button>');
                $btnArchiv.data("id", item.id);
                const $kli = $('<li></li>').text(feladat + " " + kulcsDate);
                const $ktarol = $('<div class="ktarol"></div>');
                $ktarol.append($kli).append($btnArchiv);
                $kesz.append($ktarol);

                $btnArchiv.on('click', function () {
                    const id = $(this).data("id");
                    const index = adatTarolo.findIndex(function (x) {
                        return x.id === id;
                    });
                    adatArchiv.push(adatTarolo[index]);
                    adatTarolo.splice(index, 1);
                    Render();
                });
            }
        }
    };
    
});







/*
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

$ntarol.append($nli).append($btnTorol).append($btnKezs);
$nincsKesz.append($ntarol);

$input.val('');

$btnTorol.on('click', function () {
   $(this).parent().slideToggle(250, function () {
       $(this).parent().remove();
   });
});

$btnKezs.on('click', function () {
   $kli.text() == $nli.text();
   $ktarol.append($kli).append($btnArch);
   $kesz.append($ktarol);
   $(this).parent().slideToggle(250, function () {
       $nli.parent().remove();
   });
});
}
});
*/   