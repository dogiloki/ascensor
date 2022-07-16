class Ascensor{

	constructor(){
		this.peso=5;
		this.planta;
		this.personas=[];
		this.abierto=false;
		this.movimiento=false;
		this.content_ascensor=document.getElementById("content-ascensor");
		this.content_numero=document.getElementById("ascensor-numero");
		this.content_peso=document.getElementById("ascensor-peso");
		this.content_puerta=document.getElementById("ascensor-puerta");
		this.content_puerta1=document.getElementById("ascensor-puerta1");
		this.content_puerta2=document.getElementById("ascensor-puerta2");
		this.content_centro=document.getElementById("ascensor-centro");
		this.ancho_puerta1=this.content_puerta1.offsetWidth;
		this.ancho_puerta2=this.content_puerta2.offsetWidth;
		this.intervalo={
			abrir:null,cerrar:null,mover:null
		}
		this.content_puerta.addEventListener("click",()=>{
			this.abierto?this.cerrar():this.abrir();
		});
		this.content_ascensor.style.top="5px";
	}

	dimencionarPuertas(){
		this.ancho_puerta1=this.content_puerta1.offsetWidth;
		this.ancho_puerta2=this.content_puerta2.offsetWidth;
	}

	abrir(){
		if(!Util.estaRango(this.content_ascensor.offsetTop,this.planta.obj.offsetTop,this.planta.obj.offsetTop+this.planta.obj.offsetHeight) ||
			!Util.estaRango(this.content_ascensor.offsetTop+this.content_ascensor.offsetHeight,this.planta.obj.offsetTop,this.planta.obj.offsetTop+this.planta.obj.offsetHeight)){
			console.log("Fuera del rango");
			return;
		}
		clearInterval(this.intervalo.cerrar);
		this.abierto=true;
		this.movimiento=true;
		Util.modal(this.content_centro,false);
		this.dimencionarPuertas();
		let ancho1=this.content_puerta1.offsetWidth;
		let ancho2=this.content_puerta2.offsetWidth;
		this.intervalo.abrir=setInterval(()=>{
			ancho1=(ancho1-1);
			ancho2=(ancho2-1);
			if(ancho1<=0 && ancho2<=0){
				clearInterval(this.intervalo.abrir);
				// Mostrar personas
				this.personas.forEach((p)=>{
					Util.modal(p.obj,true);
				});
				this.movimiento=false;
				this.content_puerta.setAttribute("title","Cerrar");
				// Obtener personas de la planta
				if(this.planta.num==Juego.num_plantas){
					this.personas.forEach((persona)=>{
						persona.mover(this,persona);
					});
				}else{
					this.planta.personas.forEach((persona)=>{
						persona.mover(this);
					});
				}
			}else{
				this.content_puerta1.style.width=ancho1+"px";
				this.content_puerta2.style.width=ancho2+"px";
			}
		},10);
	}

	cerrar(){
		this.abierto=false;
		clearInterval(this.intervalo.abrir);
		this.movimiento=true;
		Util.modal(this.content_centro,false);
		//this.content_puerta1.style.width="5.5vw";
		//this.content_puerta2.style.width="5.5vw";
		let ancho1=this.content_puerta1.offsetWidth;
		let ancho2=this.content_puerta1.offsetWidth;
		// Ocultar personas
		this.personas.forEach((p)=>{
			Util.modal(p.obj,false);
		});
		this.intervalo.cerrar=setInterval(()=>{
			ancho1=(ancho1+1);
			ancho2=(ancho2+1);
			if(ancho1>=this.ancho_puerta1 && ancho2>=this.ancho_puerta2){
				clearInterval(this.intervalo.cerrar);
				this.content_puerta1.style.width="5.5vw";
				this.content_puerta2.style.width="5.5vw";
				this.movimiento=false;
				this.content_puerta.setAttribute("title","Abrir");
				Util.modal(this.content_centro,true);
			}else{
				this.content_puerta1.style.width=ancho1+"px";
				this.content_puerta2.style.width=ancho2+"px";
			}
		},10);
		// Obtener personas de la planta
		this.planta.personas.forEach((persona)=>{
			persona.parar(this);
		});
	}

	mover(evt,juego){
		if(evt.keyCode==32){
			this.content_puerta.click();
		}
		if(this.abierto || this.movimiento){
			return;
		}
		//console.log(evt.keyCode);
		let y=this.content_ascensor.offsetTop;
		let alto=this.content_ascensor.offsetHeight;
		if(evt.keyCode==40){ // Abajo
			if(y<(Juego.content_plantas.offsetHeight)-alto){
				this.movimiento=true;
				this.content_ascensor.style.top=(y+5)+"px";
				this.movimiento=false;
			}else{
				this.moverPlantas(true);
			}
			this.obtenerPlanta();
		}else
		if(evt.keyCode==38){ // Arriba
			if(y>0){
				this.movimiento=true;
				this.content_ascensor.style.top=(y-5)+"px";
				this.movimiento=false;
			}else{
				this.moverPlantas(false);
			}
			this.obtenerPlanta();
		}
	}

	obtenerPlanta(){
		Juego.plantas.forEach((planta,indice)=>{
			if(planta.obj.offsetTop<this.content_ascensor.offsetTop){
				this.content_numero.innerHTML=Juego.num_plantas-(planta.num-1);
				this.planta=planta;
				return;
			}
		});
	}

	moverPlantas(subir){
		Juego.plantas.forEach((planta,indice)=>{
			subir?planta.subir(planta):planta.bajar(planta);
		});
	}

}