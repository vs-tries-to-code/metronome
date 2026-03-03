const strongClick= new Audio("./assets/universfield-crash-cymbal-hit-140577.mp3")
const weakClick= new Audio("./assets/weak-click.mp3")
let currentBeat=1;
const beatsPerBar=4;
let metronomeInterval=null;
let isRunning=false;

function setBeat(){
    
}
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
    const bpm=Number(document.getElementById("bpm").value);
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
    if (isRunning==false){
        toggleBtn.textContent = "STOP";
        isRunning=true;
        startMetronome();
    }
    else{
        toggleBtn.textContent = "START";
        isRunning=false;
        stopMetronome();
    }
});

