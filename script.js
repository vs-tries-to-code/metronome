function beatSound(){
    const bpm=document.getElementById("bpm");
    const bps= bpm/60;
    const click = new Audio("./assets\dragon-studio-simple-snare-447488.mp3")
    click.play();
}
setInterval(beatSound, bps);