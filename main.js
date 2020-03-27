console.log('ext loaded');

const inputs = document.querySelectorAll("input");
const links = document.querySelectorAll("a");
const body = document.querySelector("body");

const audio = document.createElement('audio');
let isPlaying = false;
audio.addEventListener('ended', function() {
  isPlaying = false;
});
console.log('body', body);
body.appendChild(audio);

//THIS WAS BREAKING THINGS
//inputs.forEach(input => input.addEventListener("click", playSound("fart")));

links.forEach(link => link.addEventListener("mouseenter", (e) => moveLink(e)));
links.forEach(link => link.addEventListener("transitionend", (e) => resetPos(e)));

body.addEventListener("keydown", event => {
  if (event.keyCode === 70) {
    playSound("fart");
  } else if (event.keyCode === 66) {
    playSound("burp");
  } else if (event.keyCode === 76) {
    playSound("laugh");
  }
});

function moveLink(event) {
  console.log('attempted to move link');
  const link = event.srcElement;
  console.log('style', link.style);
  let xChange;
  let yChange;
  if (Math.random() > .5)
    xChange = Math.round(Math.random() * 101 + 50);
  else
    xChange = Math.round(Math.random() * -101 - 50);

  if (Math.random() > .5) 
    yChange = Math.round(Math.random() * 101 + 50);
  else
    yChange = Math.round(Math.random() * -101 - 50);

  console.log('randomly generated', xChange, yChange);
  console.log(link.style.transform);
  link.classList.add('moveAway');
  link.style.transform = `translate(${xChange}px, ${yChange}px)`;
  console.log(`translate(${xChange}px, ${yChange}px)`);
}

function resetPos(event) {
  const link = event.srcElement;
  link.classList.remove('moveAway');
  link.style.transform = ``;
}

function playSound(type) {
  const soundMap = {
    fart: 0,
    burp: 1,
    laugh: 2,
  }

  const sounds = [
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
    "http://netexpert.hu/~estevez/hangok/PEOPLE/MISC/BELCH03.WAV"],
    //laughs
    ["https://www.pacdv.com/sounds/people_sound_effects/laugh_1.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_2.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_3.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_4.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_5.wav"]];

  console.log('pf called with type of', type, 'isplaying', isPlaying);

  if (!isPlaying) {
    const random = Math.floor(Math.random() * sounds[soundMap[type]].length);
    const src = sounds[soundMap[type]][random];
    audio.volume = 1.0;
    audio.src = src;
    console.log('play!')
    isPlaying = true;
    audio.autoplay = true;
  }
}




