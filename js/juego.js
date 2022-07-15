class Juego{

	constructor(){
		Juego.content_plantas=document.getElementById('content-plantas');
		for(let a=0; a<5; a++){
			let planta=new Planta();
			Juego.plantas.push(planta);
			Juego.content_plantas.appendChild(planta.obj);	
		}
		this.posicionarPlantas();
	}

	posicionarPlantas(){
		Juego.plantas.forEach((planta,indice)=>{
			planta.obj.style.left="0px";
			planta.obj.style.top=(indice*planta.obj.offsetHeight)+"px";
		});
	}

	static content_plantas=null;

	static plantas=[];

}