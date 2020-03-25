const ctx = new AudioContext();
var analyser = ctx.createAnalyser();
let audio1;
let audio2;

fetch("https://compassoundfiles.s3.us-east-2.amazonaws.com/clap1.wav")
  .then(data => data.arrayBuffer())
  .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
  .then(decodedAudio => {
    audio1 = decodedAudio;
  });

  fetch("https://compassoundfiles.s3.us-east-2.amazonaws.com/clap3.wav")
  .then(data => data.arrayBuffer())
  .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
  .then(decodedAudio => {
    audio2 = decodedAudio;
  });


  function playback() {
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio1;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);

  }

  
window.addEventListener("mousedown", RhythmSample);




function RhythmSample() {
  function playSound(buffer, time, beat) {
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    if (!source.start)
      source.start = source.noteOn;
    source.start(time);
    

    anime({
      targets: '.dot' + beat,
      
      backgroundColor: '#000',
      borderRadius: ['0%', '50%'],
      // easing: 'easeInElastic(1, .5)',
      delay: (time * 1000)
    });



  }

  // var kick = BUFFERS.kick;
  // var snare = BUFFERS.snare;
  // var hihat = BUFFERS.hihat;

  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = ctx.currentTime;
  var tempo = 80; // BPM (beats per minute)
  var quarterNoteTime = 60 / tempo;
  var eighthNoteTime = quarterNoteTime / 2;
  var cycleBeats = 12;

  console.log(startTime);
  
  

  // Play 2 bars of the following:
  for (var bar = 0; bar < 1; bar++) {
    var time = startTime + bar * cycleBeats * quarterNoteTime;
    // Play the bass (kick) drum on beats 12, 3, 6, 8, 10
    playSound(audio1, time, 0);
    playSound(audio1, time + 3 * quarterNoteTime, 3);
    playSound(audio1, time + 6 * quarterNoteTime, 6);
    playSound(audio1, time + 8 * quarterNoteTime, 8);
    playSound(audio1, time + 10 * quarterNoteTime, 10);

    // Play the snare drum on beats 1,2,4,5,7,9
    playSound(audio2, time + 1 * quarterNoteTime);
    playSound(audio2, time + 2 * quarterNoteTime);
    playSound(audio2, time + 4 * quarterNoteTime);
    playSound(audio2, time + 5 * quarterNoteTime);
    playSound(audio2, time + 7 * quarterNoteTime);
    playSound(audio2, time + 9 * quarterNoteTime);
    playSound(audio2, time + 11 * quarterNoteTime);
    

    // // Play the hi-hat every eighthh note.
    // for (var i = 0; i < 8; ++i) {
    //   playSound(hihat, time + i * eighthNoteTime);
    // }
  }
};





