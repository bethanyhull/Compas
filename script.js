var audioContext;
const track = null;
const playButton = document.querySelector('button');
const audioElement = document.querySelector('audio');

window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    audioContext = new AudioContext();


// pass it into the audio context
track = audioContext.createMediaElementSource(audioElement);
audio.crossOrigin = "anonymous";
track.connect(audioContext.destination);

  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}



playButton.addEventListener('click', function() {
    audioContext.resume();
console.log("I am active");

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}

, false);

