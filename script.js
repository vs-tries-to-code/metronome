const strongClick= new Audio("./assets/universfield-crash-cymbal-hit-140577.mp3")
const weakClick= new Audio("./assets/weak-click.mp3")
let currentBeat=1;
let beatsPerBar=1;
let metronomeInterval=null;
let isRunning=false;
let bpm=Number(document.getElementById("bpm").value);

const beatContainer = document.querySelector(".beats");
beatContainer.addEventListener("click", (event) =>{
    if (event.target.tagName == "BUTTON"){
        const selectedNum = Number(event.target.textContent);
        beatsPerBar= selectedNum;
    }

} );

function beatSound(){
    console.log("beat: ", currentBeat); 
    if (currentBeat==1){
        strongClick.currentTime=0;
        strongClick.play();
        console.log("Strong click played");
    }
    else{
        weakClick.currentTime=0;
        weakClick.play();
        console.log("weak click played");
    }
    
    currentBeat+=1;
    if (currentBeat>beatsPerBar){
        currentBeat=1;
    }
}


function startMetronome(){
    
    if (bpm<=0){
        alert("Enter a BPM greater than zero");
        return;
    }
    const bps= 60000/bpm;
    console.log("bpm", bpm);
    console.log("delay", bps);
    metronomeInterval=setInterval(beatSound, bps);
}

function stopMetronome(){
    clearInterval(metronomeInterval);
    currentBeat=1;
}

const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", () => {
    const h2 = toggleBtn.querySelector("h2");
    if (isRunning==false){
        h2.textContent = "⏹ STOP";
        isRunning=true;
        startMetronome();
    }
    else{
        h2.textContent = "▶ START";
        isRunning=false;
        stopMetronome();
    }
});

const increaseTempo = document.getElementById("increase");
const decreaseTempo = document.getElementById("decrease");
const bpmInput = document.getElementById("bpm");

increaseTempo.addEventListener("click", () => {
    bpm = Number(bpmInput.value);
    bpm += 1;
    bpmInput.value = bpm;
});

decreaseTempo.addEventListener("click", () => {
    bpm = Number(bpmInput.value);
    if (bpm > 0) {
        bpm -= 1;
        bpmInput.value = bpm;
    }
});




