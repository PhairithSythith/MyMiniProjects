$(function() {
   
    const $ujFeladat = $('#feladatPlusz');
    var $nincsKesz = $('#nkLista');
    var $kesz = $('#kLista');
    const adatTarolo = [];
    const adatArchiv = [];
    var $ahDoboz = $('#ahDoboz').hide();
    var $ehMutato = $('#ehMutato');

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
            $input.val('');
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
                var $btnKezs = $('<button type="button" class="btnKezs">Kész</button>');
                $btnKezs.data("id", item.id);
                var $btnTorol = $('<button type="button" class="btnTorol">Törlés</button>');
                $btnTorol.data("id", item.id);
                const $nli = $('<li></li>').text(feladat + ", hozzá adva: " + kulcsDate);
                const $ntarol = $('<div class="ntarol"></div>');
                $ntarol.append($nli).append($btnKezs).append($btnTorol);
                $ntarol.hide();
                $nincsKesz.append($ntarol);
                $ntarol.slideDown(100);
            }
            else {
                var item = adatTarolo[i];
                let feladat = adatTarolo[i].f;
                let kulcsDate = adatTarolo[i].date;
                var $btnArchiv = $('<button type="button" class="btnArchiv">Archívumba mentés</button>');
                $btnArchiv.data("id", item.id);
                const $kli = $('<li></li>').text(feladat + " " + kulcsDate);
                const $ktarol = $('<div class="ktarol"></div>');
                $ktarol.append($kli).append($btnArchiv);
                $ktarol.hide();
                $kesz.append($ktarol);
                $ktarol.slideDown(100);
            }
        }
        Haladas();
    };
    $(document).on('click', ".btnKezs", function () {
            const id = $(this).data("id");
            const item = adatTarolo.find(function (x) {
                return x.id === id;
            });
        $(this).parent().slideUp(100, function () {
            item.done = true;
            Render();
        });
    });
    $(document).on('click', ".btnTorol", function () {
        const id = $(this).data("id");
        const item = adatTarolo.find(function (x) {
            return x.id === id;
        });
        adatTarolo.splice(adatTarolo.indexOf(item), 1);
        $(this).parent().slideUp(100, function () {
            Render();
        });
    });

    $(document).on('click', ".btnArchiv", function () {
        const id = $(this).data("id");
        const index = adatTarolo.findIndex(function (x) {
            return x.id === id;
        });
        adatArchiv.push(adatTarolo[index]);
        adatTarolo.splice(index, 1);
        SelectFrissites();
        var selected = $("#mikor").val();
        if (selected !== null) {
            Archivalas(selected);
        }
        $(this).parent().slideUp(100, function () {
            Render();
        });
    });

    function SelectFrissites() {
        var $select = $('#mikor');
        $select.empty();
        var egyedi = [];
        for (let i = 0; i < adatArchiv.length; i++) {
            if (egyedi.indexOf(adatArchiv[i].date) === -1) {
                egyedi.push(adatArchiv[i].date);
            }
        }
        for (let i = 0; i < egyedi.length; i++) {
            var $option = $("<option></option>");
            $option.val(egyedi[i]);
            $option.text(egyedi[i]);
            $select.append($option);
        }
        $ahDoboz.slideDown(100);
    }

    function Archivalas(valasztottDatum) {
        var $archLista = $("#archLista");
        $archLista.empty();
        for (let i = 0; i < adatArchiv.length; i++) {
            if (adatArchiv[i].date === valasztottDatum) {
                var $li = $('<li></li>').text(adatArchiv[i].f + " (" + adatArchiv[i].date + ") 😴");
                $archLista.append($li);
            }
        }
    }

    $('#mikor').on('change', function () {
        Archivalas($(this).val());
    });

    function Haladas() {
        if (adatTarolo.length === 0) {
            $ehMutato.text('Minden kész 🥳');
            return;
        }
        var szoveg = '';
        for (let i = 0; i < adatTarolo.length; i++) {
            if (adatTarolo[i].done == true) {
                szoveg += '😀';
            }
            else {
                szoveg += '🥺';
            }
        }
        $ehMutato.hide().text(szoveg).fadeIn(100);
    }

});