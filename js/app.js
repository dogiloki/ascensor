var ascensor=new Ascensor();
var juego=new Juego();
ascensor.obtenerPlanta();
window.onresize=()=>{
	juego.posicionarPlantas();
}

document.addEventListener("keydown",(evt)=>{
	this.ascensor.mover(evt);
});