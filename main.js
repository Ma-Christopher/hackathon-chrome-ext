console.log('ext loaded');

const inputs = document.querySelectorAll("input");
// const links = document.querySelectorAll("a");
const body = document.querySelector("body");
const images = document.querySelectorAll("img");
//images.forEach(img => img.classList.add("spinMe"))

let linksToggle = false;

const danceTroll = document.createElement("img");
danceTroll.classList.add("dance");
const troll = chrome.extension.getURL("assets/Dancing_Troll_gif.webp")
danceTroll.src = troll;
body.prepend(danceTroll);

const audio = document.createElement("audio");
let isPlaying = false;
audio.addEventListener('ended', function() {
  isPlaying = false;
});
body.appendChild(audio);

//THIS WAS BREAKING THINGS
//inputs.forEach(input => input.addEventListener("click", playSound("fart")));

inputs.forEach(input => input.addEventListener("input", changeInput));

body.addEventListener("keydown", event => {
  if (event.keyCode === 70) {
    playSound("fart");
  } else if (event.keyCode === 66) {
    playSound("burp");
  } else if (event.keyCode === 76) {
    playSound("laugh");
  } else if (event.keyCode === 65) {
    const links = document.querySelectorAll("a");
    if (!linksToggle) {
      console.log("runaway links is now ON!");
      linksToggle = true;
      links.forEach(link => link.addEventListener("mouseover", moveLink));
    } else {
      console.log("runaway links is now OFF!");
      links.forEach(link => link.removeEventListener("mouseover", moveLink));
      linksToggle = false;
    }
  } else if (event.keyCode === 84) {
    trollDance();
  } else if (event.keyCode === 73) {
    imageSpin();
  }
});

body.addEventListener("keyup", event => {
  if (event.keyCode === 84) {
    trollHide();
  }
});

function imageSpin() {
  for (let i = (Math.round(Math.random() * 4)); i < images.length; i += Math.round(Math.random() * 4)) {
    images[i].addEventListener("transitionend", removeSpin);
    images[i].classList.add("spin");
  }
}

function removeSpin(event) {
  const image = event.srcElement;
  image.classList.remove("spin");
}

function changeInput(event) {
  const dict = {
    "hello": "howdy",
    "you": "y'all",
    "fun": "serious",
    "heaven": "hell",
    "healthy": "infected",
    "fresh": "frozen",
    "true": "fake news",
    "false": "alternative fact",
    "america": "greatest country"
  };

  let value = event.target.value;
  if (typeof value === 'string') {
    for (key in dict) {
      value = value.replace(new RegExp(key, 'i'), dict[key]);
    }
    event.target.value = value;
  }
}

function moveLink(event) {
  const link = event.srcElement;
  link.addEventListener("transitionend", resetPos);

  const xChange = Math.round(Math.random() * -601 + 300);
  const yChange = Math.round(Math.random() * -601 + 300);
  const degChange = Math.round(Math.random() * -721 + 360);

  link.classList.add('moveAway');
  console.log('random coordinates', xChange, yChange, degChange);
  link.style.transform = `translate(${xChange}px, ${yChange}px) rotate(${degChange}deg)`;
}

function resetPos(event) {
  const link = event.srcElement;
  link.classList.remove('moveAway');
  link.classList.add('moveBack');
  link.style.transform = '';
  link.removeEventListener("transitionend", resetPos);
  link.addEventListener("transitionend", finishReset);
}

function finishReset(event) {
  const link = event.srcElement;
  link.classList.remove('moveBack');
}

function trollDance() {
  danceTroll.classList.add("show");
}

function trollHide() {
  danceTroll.classList.remove("show");
}

function playSound(type) {
  // console.log("I am inside playSound!!")
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
    ["https://www.pacdv.com/sounds/people_sound_effects/burp-1.wav"],
    //laughs
    ["https://www.pacdv.com/sounds/people_sound_effects/laugh_1.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_2.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_3.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_4.wav",
    "https://www.pacdv.com/sounds/people_sound_effects/laugh_5.wav"]];

  if (!isPlaying) {
    // console.log("I am in isPlaying")
    const random = Math.floor(Math.random() * sounds[soundMap[type]].length);
    const src = sounds[soundMap[type]][random];
    audio.volume = 1.0;
    audio.src = src;
    isPlaying = true;
    audio.autoplay = true;
  }
}




