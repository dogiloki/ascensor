var content_inicio=document.getElementById('content-inicio');
var content_juego=document.getElementById('content-juego');
var content_plantas=document.getElementById('content-plantas');
var juego=new Juego();
var audio=document.getElementById("audio");
audio.src=Diccionario.audio.musica;
audio.loop=true;
audio.volume=0.5;

document.body.style.backgroundImage="url("+Diccionario.img.fondo+")";

Util.modal(content_plantas,false);
Util.modal(content_juego,false);

window.onresize=()=>{
	juego.posicionarPlantas();
	juego.ascensor.dimencionarPuertas();
}

document.addEventListener("keydown",(evt)=>{
	this.juego.ascensor.mover(evt);
	this.juego.ascensor.obtenerPlanta();
});

document.getElementById('btn-inicio').addEventListener("click",()=>{
	this.jugar();
});

function jugar(){
	Util.modal(content_inicio,false);
	Util.modal(content_juego,true);
	Util.modal(content_plantas,true);
	this.audio.play();
	juego.iniciar();
}