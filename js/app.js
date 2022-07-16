var juego=new Juego();
var audio=document.getElementById("audio");
audio.src=Diccionario.audio.musica;
audio.loop=true;
audio.volume=0.5;
document.body.style.backgroundImage="url("+Diccionario.img.fondo+")";

juego.iniciar();

window.onresize=()=>{
	juego.posicionarPlantas();
	juego.ascensor.dimencionarPuertas();
}

document.addEventListener("keydown",(evt)=>{
	this.audio.play();
	this.juego.ascensor.mover(evt);
	this.juego.ascensor.obtenerPlanta();
});

function jugar(){
	this.audio.play();
}