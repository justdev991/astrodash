// SISTEMA DI MESSAGGI

let messaggio = document.getElementById('messaggio');
let listaMessaggi = document.getElementById('listaMessaggi');
let messaggiAutomatici = document.getElementById('messaggiAutomatici');
let arrayMessaggi = [];
const invia = document.getElementById('invia');

function aggiungiMessaggio() {
    let stringaMessaggio = messaggio.value;

    if (stringaMessaggio === "") {
        window.alert("Non puoi mandare un messaggio vuoto alla tua squadra!");
        return;
    }
    let contenitoreMessaggio = document.createElement('p');
    arrayMessaggi.push(stringaMessaggio.trim());
    contenitoreMessaggio.textContent = stringaMessaggio.trim();
    contenitoreMessaggio.classList.add('classeMessaggio');
    listaMessaggi.appendChild(contenitoreMessaggio);
    console.log(arrayMessaggi);
    console.log(stringaMessaggio.trim());
    messaggio.value = "";
}

function rimuoviMessaggio(testo) {
        listaMessaggi.removeChild(testo);
        arrayMessaggi.splice(arrayMessaggi.findIndex(m => m.toLowerCase().trim() === testo.textContent.toLowerCase().trim()), 1);
        console.log(arrayMessaggi);
}


invia.addEventListener('click', () => {
    aggiungiMessaggio();
});

messaggio.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        aggiungiMessaggio();
    } 
});

listaMessaggi.addEventListener('click', (event) => {
    let messaggioCliccato = event.target;
    rimuoviMessaggio(messaggioCliccato);
});


// MOTORI E SCRITTE DINAMICHE

const accendiMotore = document.getElementById('accendiMotori');
const spegniMotore = document.getElementById('spegniMotori');
let ossigeno = document.getElementById('ossigeno');
let valoreOssigeno = 100;
let carburante = document.getElementById('carburante');
let valoreCarburante = 100;
let velocita = document.getElementById('velocita');
let valoreVelocita = 0;
let statoMotori = document.getElementById('statoMotori');
let motori = false;

function accensione() {
    if (motori === false) {
        motori = true;
        statoMotori.style.color = '#39FF14';
        statoMotori.style.textShadow = '0px 0px 10px #39FF14';
        statoMotori.style.transition = 'all 0.5s ease-in-out';
        statoMotori.innerHTML = "STATO MOTORI: <strong>ON</strong>";
        ossigeno.innerHTML = `OSSIGENO: <strong>${valoreOssigeno}%</strong>`;
        carburante.innerHTML = `CARBURANTE: <strong>${valoreCarburante}%</strong>`;
        velocita.innerHTML = `VELOCITÀ: <strong>${valoreVelocita} km/h</strong>`;
    }
}

function lockdown() {
    spegnimento();
    const bottoni = document.querySelectorAll('button');
    
    bottoni.forEach(bottone => {
        bottone.disabled = true;
        bottone.style.backgroundColor = '#2c2c2c';
        bottone.style.color = '#555';
        bottone.style.boxShadow = 'none';
        bottone.style.cursor = 'not-allowed';
    });

    messaggio.disabled = true;
    messaggio.value = "SISTEMA CRITICO: OSSIGENO ASSENTE";

    let messaggioAutomatico = document.createElement('p');
    messaggioAutomatico.innerHTML = "OSSIGENO INSUFFICIENTE: <strong>MISSIONE FALLITA</strong>";
    messaggioAutomatico.classList.add('missioneFallita');
    messaggiAutomatici.appendChild(messaggioAutomatico);
}

let intervalloOssigeno;
let intervalloCarburante;
let intervalloVelocita;

function controlli() {
    let messaggioAutomatico = document.createElement('p');

    if (motori === true && valoreOssigeno <= 10 && valoreOssigeno > 0) {
        clearInterval(intervalloOssigeno);
        clearInterval(intervalloCarburante);
        clearInterval(intervalloVelocita);
        spegnimento();
        let mA = messaggioAutomatico;
        mA.classList.add('messaggioAutomatico');
        mA.innerHTML = "Il livello di ossigeno è troppo basso per continuare: <strong>SPEGNIMENTO DI EMERGENZA IN CORSO</strong>";
        messaggiAutomatici.appendChild(mA);
    } else if (valoreOssigeno === 0) {
        clearInterval(intervalloOssigeno);
        clearInterval(intervalloCarburante);
        clearInterval(intervalloVelocita);
        lockdown();
    }
    
    if (motori === true && valoreCarburante <= 5) {
        clearInterval(intervalloOssigeno);
        clearInterval(intervalloCarburante);
        clearInterval(intervalloVelocita);
        spegnimento();
        let mA = messaggioAutomatico;
        mA.classList.add('messaggioAutomatico');
        mA.innerHTML = "Il livello di carburante è troppo basso per continuare: <strong>SPEGNIMENTO DI EMERGENZA IN CORSO</strong>";
        messaggiAutomatici.appendChild(mA);
    }       
}

messaggiAutomatici.addEventListener('click', (event) => {
        let mACliccato = event.target;
        messaggiAutomatici.removeChild(mACliccato);
    });

function cambioScritte() {

    function cambioOssigeno() {
        if (valoreOssigeno > 0) {
            valoreOssigeno -= 1;
        } else {
            valoreOssigeno = 0;
        }
        ossigeno.innerHTML = `OSSIGENO: <strong>${valoreOssigeno}%</strong>`;
        controlli();
        
    }

    function cambioCarburante() {
        if (valoreCarburante > 0) {
            valoreCarburante -= 1;
        } else {
            valoreCarburante = 0;
        }

        carburante.innerHTML = `CARBURANTE: <strong>${valoreCarburante}%</strong>`;
        controlli();
    }

    function cambioVelocita() {
        if (valoreVelocita <= 1800) {
            valoreVelocita += 10;
        } else {
            valoreVelocita = 1800;
        }

        velocita.innerHTML = `VELOCITÀ: <strong>${valoreVelocita} km/h</strong>`;
        
    }

    if (motori === true) {
        intervalloOssigeno = setInterval(cambioOssigeno, 1500);
        intervalloCarburante = setInterval(cambioCarburante, 950);
        intervalloVelocita = setInterval(cambioVelocita, 1000);
    } else {
        console.log("Motori spenti!");
        clearInterval(intervalloOssigeno);
        clearInterval(intervalloCarburante);
        clearInterval(intervalloVelocita);
    }
}

function spegnimento() {
    if (motori === true) {
        motori = false;
        statoMotori.style.color = '#fb1a1aff';
        statoMotori.style.textShadow = '0px 0px 10px #fb1a1aff';
        statoMotori.style.transition = 'all 0.5s ease-in-out';
        statoMotori.innerHTML = "STATO MOTORI: <strong>OFF</strong>";
    }
}

accendiMotore.addEventListener('click', () => {
    if (motori === false) {
        accensione();
        cambioScritte();
    } else {
        return;
    }
});

spegniMotore.addEventListener('click', () => {
    spegnimento();
    cambioScritte();
});

//RIFORNIMENTI E DECELERAZIONE

const rifornisciOssigeno = document.getElementById('rifornisciOssigeno');
const rifornisciCarburante = document.getElementById('rifornisciCarburante');
const decelera = document.getElementById('decelerazione');

function rifornimentoOssigeno() {
    if (valoreOssigeno <= 90) {
        valoreOssigeno += 10;
    }
    else if (valoreOssigeno > 90) {
        valoreOssigeno += 100 - valoreOssigeno;
    }
    ossigeno.innerHTML = `OSSIGENO: <strong>${valoreOssigeno}%</strong>`;
}

function rifornimentoCarburante() {
    if (valoreCarburante <= 90) {
        valoreCarburante += 10;
    }
    else if (valoreCarburante > 90) {
        valoreCarburante += 100 - valoreCarburante;
    }
    carburante.innerHTML = `CARBURANTE: <strong>${valoreCarburante}%</strong>`;
}

function decelerazione() {
    if (valoreVelocita >= 25) {
        valoreVelocita -= 25;
    }
    else {
        valoreVelocita = 0;
    }
    velocita.innerHTML = `VELOCITÀ: <strong>${valoreVelocita} km/h</strong>`;
}


rifornisciOssigeno.addEventListener('click', () => {
        spegnimento();
        cambioScritte();
        rifornimentoOssigeno();
});

rifornisciCarburante.addEventListener('click', () => {
        spegnimento();
        cambioScritte();
        rifornimentoCarburante();
});

decelera.addEventListener('click', () => {
        spegnimento();
        cambioScritte();
        decelerazione();
});