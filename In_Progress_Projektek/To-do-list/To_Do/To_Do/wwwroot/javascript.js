Function Render(){
    for (let i = 0; i < adatTarolo.length; i++) {
        let feladat = adatTarolo[i].f;
        let kulcsDate = adatTarolo[i].date;
        let done = adatTarolo[i].done;
        const $btnTorol = $('<button type="button">Törlés</button>');
        const $btnKezs = $('<button type="button">Kész</button>');
        const $nli = $('<li></li>').text(feladat);
        const $ntarol = $('<div class="ntarol"></div>');
        const $kli = $('<li></li>').text(feladat);
        const $ktarol = $('<div class="ktarol"></div>');
        const $btnArch = $('<button type="button">Archívumba mentés</button>');

    }
};