console.log('ext loaded');
var audio = document.createElement('audio');
var DEFAULT_VOLUME = 1.0;
// var fart1 = new Audio();
// fart1.src = chrome.extension.getURL("https://www.pacdv.com/sounds/fart-sounds/fart-1.wav");

const inputs = document.querySelectorAll("input");
const body = document.querySelector("body");
inputs.forEach(input => input.addEventListener("click", playSound()));
body.addEventListener("keydown", event => {
  if (event.keyCode === 70) {
    playSound("fart");
  } else if (event.keyCode === 66) {
    playSound("burp");
  } else if (event.keyCode === 76) {
    playSound("laugh");
  }
});

function playSound(type) {
  const soundMap = {
    fart: 0,
    burp: 1,
    laugh: 2,
  }

  sounds = [
    //farts
    ["https://www.pacdv.com/sounds/fart-sounds/fart-1.wav",
    "https://www.pacdv.com/sounds/fart-sounds/fart-2.wav",
    "https://www.pacdv.com/sounds/fart-sounds/fart-3.wav",
    "https://www.pacdv.com/sounds/fart-sounds/fart-4.wav",
    "https://www.pacdv.com/sounds/fart-sounds/fart-5.mp3",
    "https://www.pacdv.com/sounds/fart-sounds/fart-6.mp3",
    "https://www.pacdv.com/sounds/fart-sounds/fart-7.mp3",
    "https://www.pacdv.com/sounds/fart-sounds/fart-8.wav"],
    //burps
    ["https://www.pacdv.com/sounds/people_sound_effects/burp-1.wav",
    "http://www.ruelpsen.com/ruelpser/www.ruelpsen.com - rawuelps_010.mp3",
    "http://www.ruelpsen.com/ruelpser/www.ruelpsen.com%20-%20rawuelps_054.mp3",
    "http://www.mountaincharlie1850.org/sounds/burp01.wav",
    "http://netexpert.hu/~estevez/hangok/PEOPLE/MISC/BELCH03.WAV"
    ],
    //laughs
    []]
  console.log('pf called');
  
  var src = sounds[soundMap[type]][Math.floor(Math.random() * sounds[soundMap[type]].length)];
  audio.volume = 1.0;
  audio.src = src;
  isPlaying = true;

  
  audio.addEventListener('ended', function(evt) {
    isPlaying = false;
  });
  document.body.appendChild(audio);
  audio.autoplay = true;
}




