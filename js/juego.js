class Juego{

	constructor(){
		Juego.content_plantas=document.getElementById('content-plantas');
		for(let a=0; a<Juego.num_plantas; a++){
			let planta=new Planta();
			Juego.plantas.push(planta);
			Juego.content_plantas.appendChild(planta.obj);	
		}
		this.posicionarPlantas();
		this.ascensor=new Ascensor();
		this.ascensor.obtenerPlanta();
		this.intervalo;
		this.velocidad=5000;
	}

	static content_plantas=null;

	static plantas=[];

	static num_plantas=5;

	static max_personas=10;

	static total_personas=0;

	posicionarPlantas(){
		Juego.plantas.forEach((planta,indice)=>{
			planta.obj.style.left="0px";
			planta.obj.style.top=(indice*planta.obj.offsetHeight)+"px";
		});
	}

	generarPersona(){
		Juego.plantas[Util.numeroAleatorio(0,Juego.num_plantas-2)].agregarPersona();
	}

	iniciar(){
		this.generarPersona();
		this.intervalo=setInterval(()=>{
			this.generarPersona();
		},this.velocidad);
	}

}