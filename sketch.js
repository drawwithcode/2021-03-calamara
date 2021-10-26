var sfondo;
var canzone = {
  titolo: "-",
  autore: "-",
  durata: "0:00",
  cover: "-",
  filemusic: "-",
};

var jsonData;
let trackIndex = 0; // trackindex è l'indice di quando premi i pulsanti, indice di navigazione, parte da zero
let currenttrackIndex;
let playingNow;
let showMeNow;
let isPlaying = false; //all'avvio nessuna canzone sta suonando

//BOTTONI
let bottoneAvanti;
let bottoneIndietro;
let playButton;
let pauseButton;

let firstPlay = true;

let canzoneCorrente;

function preload() {
  sfondo = loadImage("./assets/sfondo.jpg");
  jsonData = loadJSON("playlist.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  refreshBkg();

  //BOTTONE INDIETRO
  bottoneIndietro = createImg("./assets/indietro.png");
  bottoneIndietro.style("width", "50px");
  bottoneIndietro.position(windowWidth / 2 - 318, windowHeight / 2 + 225);
  bottoneIndietro.mousePressed(tornaIndietro);

  //BOTTONE AVANTI
  bottoneAvanti = createImg("./assets/avanti.png");
  bottoneAvanti.style("width", "50px");
  bottoneAvanti.position(windowWidth / 2 - 66, windowHeight / 2 + 225);
  bottoneAvanti.mousePressed(tornaIndietro);

  //BOTTONE PLAY / PAUSE
  playButton = createImg("./assets/play.png");
  playButton.style("width", "50px");
  playButton.position(windowWidth / 2 - 188, windowHeight / 2 + 225);
  playButton.mousePressed(playStop);

  pauseButton = createImg("./assets/stop.png");
  pauseButton.style("width", "50px");
  pauseButton.position(windowWidth / 2 - 188, windowHeight / 2 + 225);
  pauseButton.mousePressed(playStop);
  pauseButton.style("visibility", "hidden");
}

function playStop() {
  //bottone di play/stop
  //console.log(isPlaying);

  if (firstPlay) {
    vaiAvanti();
    firstPlay = false;
  }

  if (isPlaying) {
    playingNow.stop();
    pauseButton.style("visibility", "hidden");
    playButton.style("visibility", "visible");
  } else {
    playingNow.play();
    playButton.style("visibility", "hidden");
    pauseButton.style("visibility", "visible");
  }
  isPlaying = !isPlaying;
}

function vaiAvanti() {
  trackIndex = trackIndex + 1;
  if (trackIndex == jsonData.playlist.length) trackIndex = 0;
  riempiCanzone(jsonData.playlist[trackIndex]);
}

function tornaIndietro() {
  //lunghezza ddell'arrray-1
  trackIndex = trackIndex - 1;
  if (trackIndex < 0) trackIndex = jsonData.playlist.length - 1;
  riempiCanzone(jsonData.playlist[trackIndex]);
}

function riempiCanzone(canzoneCorrente) {
  if (playingNow !== undefined && playingNow.isPlaying) {
    isPlaying = false;
    playingNow.stop();
  }
  playingNow = loadSound(canzoneCorrente.filemusic);
  showMeNow = loadImage(canzoneCorrente.cover);

  //"svuoto la canzone"
  canzone.titolo = "";
  canzone.autore = "";
  canzone.durata = "";
  canzone.cover = "";

  refreshBkg();

  //timeout sennò non fa in tempo a caricare i file da json
  setTimeout(function () {
    canzone.titolo = canzoneCorrente.titolo;
    canzone.autore = canzoneCorrente.autore;
    canzone.durata = canzoneCorrente.durata;
    canzone.cover = canzoneCorrente.cover;
    playingNow.play();
    isPlaying = true;
    console.log(trackIndex);
    playButton.style("visibility", "hidden");
    pauseButton.style("visibility", "visible");

    textFont("Quicksand");
    textSize(20);
    fill(67, 65, 102);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(canzoneCorrente.titolo, windowWidth / 2 - 163, windowHeight / 2 + 150);
    textSize(20);
    text(canzoneCorrente.autore, windowWidth / 2 - 163, windowHeight / 2 + 180);
    textSize(15);
    text(canzoneCorrente.durata, windowWidth / 2 - 163, windowHeight / 2 + 205);
    image(showMeNow, windowWidth / 2 - 165, windowHeight / 2 - 38, 302, 302);
  }, 1000);
}

function refreshBkg() {
  background(220);
  imageMode(CENTER);
  image(sfondo, windowWidth / 2, windowHeight / 2, sfondo.width, sfondo.height);
}

//function mostraCanzone(canzoneCorrente) {}
// per accedere a un array faccio tipo data.playlist[numero da 1 a 4 ].nomeDellaStringa(es:titolo)
// ogni volta che chiudi la graffa delle funzioni metti punto e virgola e li mortacci di javascript
// var playlist = data.playlist
// for (var i=0; i < playlist.length; i++) { }
