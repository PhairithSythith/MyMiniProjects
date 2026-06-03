$(function() {
   
    const $ujFeladat = $('#feladatPlusz');
    var $nincsKesz = $('#nkLista');
    const adatTarolo = [];

    $ujFeladat.submit(function(e) {
        e.preventDefault();

        const $input = $('#feladat');
        const feladat = $input.val().trim();
        if (feladat != '' && feladat != null) {
            const now = new Date();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            const kulcsDate = year + "-" + month;

            adatTarolo.push({ f: feladat, date: kulcsDate, done: false })
            Render();
        }
        else return;
    });

    Function Render(){
        for (let i = 0; i < adatTarolo.length; i++) {
            let feladat = adatTarolo[i].f;
            let kulcsDate = adatTarolo[i].date;
            let done = adatTarolo[i].done;
            const $btnTorol = $('<button type="button">Törlés</button>');
            const $btnKezs = $('<button type="button">Kész</button>');
            const $nli = $('<li></li>').text(feladat + " " + done + " " + kulcsDate);
            const $ntarol = $('<div class="ntarol"></div>');
            $ntarol.append($nli).append($btnTorol).append($btnKezs);
            $nincsKesz.append($ntarol);
        }
    };

    Function 

    
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