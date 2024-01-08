document.addEventListener('DOMContentLoaded', function() {
    const datoSelect = document.getElementById('dato');
    let datoer = JSON.parse(localStorage.getItem('padelDatoer')) || [];
    
    datoer.forEach(function(dato) {
        let option = document.createElement('option');
        option.value = dato;
        option.textContent = dato;
        datoSelect.appendChild(option);
    });

    // Innloggingsfunksjonalitet
    var modal = document.getElementById('loginModal');
    var span = document.getElementsByClassName('close')[0];

    document.getElementById('openLoginModal').onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById('loginButton').onclick = function() {
        const brukernavn = document.getElementById('brukernavn').value;
        const passord = document.getElementById('passord').value;
        
        if (brukernavn === "MartinBS" && passord === "Neuberg") {
            window.location.href = 'admin.html';
        } else {
            alert("Feil brukernavn eller passord");
        }
    }

    // Håndterer skjema for å registrere deltakelse
    document.getElementById('spilleplanForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const dato = datoSelect.value;
        const navn = document.getElementById('navn').value;
        const kommer = document.querySelector('input[name="kommer"]:checked').value;

        let statistikk = JSON.parse(localStorage.getItem('padelStatistikk')) || {};
        if (!statistikk[dato]) {
            statistikk[dato] = { ja: [], nei: [] };
        }
        if (kommer === "Ja") {
            statistikk[dato].ja.push(navn);
        } else {
            statistikk[dato].nei.push(navn);
        }
        localStorage.setItem('padelStatistikk', JSON.stringify(statistikk));

        alert(`Du har sendt inn: Dato: ${dato}\nNavn: ${navn}\nKommer: ${kommer}`);
    });
});
