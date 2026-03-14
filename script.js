const strongClick= new Audio("./assets/universfield-crash-cymbal-hit-140577.mp3")
const weakClick= new Audio("./assets/weak-click.mp3")
let currentBeat=1;
let beatsPerBar=4;
let metronomeInterval=null;
let isRunning=false;

const beatContainer = document.querySelector(".beats");
const beatVisual = document.querySelector('.beat-visual');

beatContainer.addEventListener("click", (event) =>{
    if (event.target.tagName == "BUTTON"){
        const selectedNum = Number(event.target.textContent);
        beatsPerBar= selectedNum;
        currentBeat = 1; 
        updateVisualizer();
    }

} );

function updateVisualizer() {
    beatVisual.innerHTML = '';
    for(let i = 0; i < beatsPerBar; i++){
        const circle = document.createElement('div');
        circle.className = 'box';
        beatVisual.appendChild(circle);
    }
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
    
    // Animate the current beat circle
    const circles = document.querySelectorAll('.box');
    if(circles[currentBeat-1]){
        circles[currentBeat-1].classList.add('pulse');
        setTimeout(() => circles[currentBeat-1].classList.remove('pulse'), 200);
    }
    
    currentBeat+=1;
    if (currentBeat>beatsPerBar){
        currentBeat=1;
    }
}


function startMetronome(){
    const bpmValue = Number(bpmInput.value);
    if (bpmValue<=0){
        alert("Enter a BPM greater than zero");
        return;
    }
    const bps= 60000/bpmValue;
    console.log("bpm", bpmValue);
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

function getTempoMarking(bpm) {
    if (bpm < 20) return "Larghissimo";
    if (bpm < 40) return "Grave";
    if (bpm < 45) return "Lento";
    if (bpm < 50) return "Largo";
    if (bpm < 55) return "Larghetto";
    if (bpm < 65) return "Adagio";
    if (bpm < 70) return "Adagietto";
    if (bpm < 73) return "Andante moderato";
    if (bpm < 86) return "Andante";
    if (bpm < 98) return "Andantino";
    if (bpm < 109) return "Moderato";
    if (bpm < 132) return "Allegretto";
    if (bpm < 156) return "Allegro";
    if (bpm < 176) return "Vivace";
    if (bpm < 200) return "Presto";
    return "Prestissimo";
}

function updateBpmDisplay() {
    const bpmPlaceHolder = document.getElementById("bpm-placeholder-text");
    const bpmActiveDisplay = document.getElementById("bpm-active-display");
    const largeBpmDisplay = document.getElementById("large-bpm-display");
    const tempoMarking = document.getElementById("tempo-marking");
    
    const bpmValue = bpmInput.value;
    
    if (!bpmValue || bpmValue.trim() === "") {
        bpmPlaceHolder.style.display = "block";
        bpmActiveDisplay.style.display = "none";
    } else {
        bpmPlaceHolder.style.display = "none";
        bpmActiveDisplay.style.display = "flex";
        largeBpmDisplay.textContent = bpmValue;
        tempoMarking.textContent = getTempoMarking(Number(bpmValue));
    }
}

increaseTempo.addEventListener("click", () => {
    const currentBpm = Number(bpmInput.value);
    bpmInput.value = currentBpm + 1;
    updateBpmDisplay();
});

decreaseTempo.addEventListener("click", () => {
    const currentBpm = Number(bpmInput.value);
    if (currentBpm > 1) {
        bpmInput.value = currentBpm - 1;
        updateBpmDisplay();
    }
});

bpmInput.addEventListener("input", updateBpmDisplay);

// Initialize the visualizer with default beats
updateVisualizer();
updateBpmDisplay();




