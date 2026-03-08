const strongClick= new Audio("./assets/universfield-crash-cymbal-hit-140577.mp3")
const weakClick= new Audio("./assets/weak-click.mp3")
let currentBeat=1;
let beatsPerBar=4; // Default to 4 beats
let metronomeInterval=null;
let isRunning=false;

const beatContainer = document.querySelector(".beats");
const beatVisual = document.querySelector('.beat-visual');

beatContainer.addEventListener("click", (event) =>{
    if (event.target.tagName == "BUTTON"){
        const selectedNum = Number(event.target.textContent);
        beatsPerBar= selectedNum;
        currentBeat = 1; // Reset beat when changing beats per bar
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
        setTimeout(() => circles[currentBeat-1].classList.remove('pulse'), 300);
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

increaseTempo.addEventListener("click", () => {
    const currentBpm = Number(bpmInput.value);
    bpmInput.value = currentBpm + 1;
});

decreaseTempo.addEventListener("click", () => {
    const currentBpm = Number(bpmInput.value);
    if (currentBpm > 1) {
        bpmInput.value = currentBpm - 1;
    }
});

// Initialize the visualizer with default beats
updateVisualizer();




