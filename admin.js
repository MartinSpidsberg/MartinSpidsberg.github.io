document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nyDato = document.getElementById('nyDato').value;
    if (nyDato) {
        let datoer = JSON.parse(localStorage.getItem('padelDatoer')) || [];
        datoer.push(nyDato);
        localStorage.setItem('padelDatoer', JSON.stringify(datoer));
        alert(`Dato lagt til: ${nyDato}`);
        document.getElementById('nyDato').value = '';
        oppdaterDatoListe();
    }
});

function oppdaterDatoListe() {
    let datoer = JSON.parse(localStorage.getItem('padelDatoer')) || [];
    let datoListe = document.getElementById('datoListe');
    datoListe.innerHTML = '';

    datoer.forEach(function(dato, index) {
        let div = document.createElement('div');
        div.textContent = dato;
        let slettKnapp = document.createElement('button');
        slettKnapp.textContent = 'Fjern';
        slettKnapp.onclick = function() {
            datoer.splice(index, 1);
            localStorage.setItem('padelDatoer', JSON.stringify(datoer));
            oppdaterDatoListe();
        };
        div.appendChild(slettKnapp);
        datoListe.appendChild(div);
    });
}

document.getElementById('visStatistikk').addEventListener('click', function() {
    let statistikk = JSON.parse(localStorage.getItem('padelStatistikk')) || {};
    let statistikkDiv = document.getElementById('statistikk');
    statistikkDiv.innerHTML = '';

    for (let dato in statistikk) {
        // Sjekk og konverter til array om nødvendig
        let jaListe = Array.isArray(statistikk[dato].ja) ? statistikk[dato].ja : (statistikk[dato].ja ? [statistikk[dato].ja] : []);
        let neiListe = Array.isArray(statistikk[dato].nei) ? statistikk[dato].nei : (statistikk[dato].nei ? [statistikk[dato].nei] : []);

        let div = document.createElement('div');
        div.innerHTML = `<strong>Dato: ${dato}</strong><br>
                         Ja: ${jaListe.join(', ') || 'Ingen'}<br>
                         Nei: ${neiListe.join(', ') || 'Ingen'}<br>`;

        let slettStatistikkKnapp = document.createElement('button');
        slettStatistikkKnapp.textContent = 'Slett Statistikk';
        slettStatistikkKnapp.onclick = function() {
            delete statistikk[dato];
            localStorage.setItem('padelStatistikk', JSON.stringify(statistikk));
            div.remove();
        };

        div.appendChild(slettStatistikkKnapp);
        statistikkDiv.appendChild(div);
    }
});

document.addEventListener('DOMContentLoaded', oppdaterDatoListe);
