// Created by Tivotal

let textArea = document.querySelector("textarea");
let voiceList = document.querySelector("select");
let btn = document.querySelector("button");
let synth = speechSynthesis;
let isSpeaking = true;

//adding voice list

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";

    //creating option tag
    let option = `<option value="${voice.name}" ${selected}>
    ${voice.name} (${voice.lang})</option>`;

    //adding option tag to list
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function createSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textArea.value !== "") {
    if (!synth.speaking) {
      createSpeech(textArea.value);
    }
    if (textArea.value.length > 60) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        btn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        btn.innerText = "Resume Speech";
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          btn.innerText = "Convert to Speech";
        }
      }, 500);
    } else {
      btn.innerText = "Convert to Speech";
    }
  }
});
