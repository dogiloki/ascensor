class Ascensor{

	constructor(){
		this.peso=3;
		this.personas=[];
		this.planta;
		this.abierto=false;
		this.movimiento=false;
		this.content_ascensor=document.getElementById("content-ascensor");
		this.content_numero=document.getElementById("ascensor-numero");
		this.content_puerta=document.getElementById("ascensor-puerta");
		this.content_puerta1=document.getElementById("ascensor-puerta1");
		this.content_puerta2=document.getElementById("ascensor-puerta2");
		this.content_centro=document.getElementById("ascensor-centro");
		this.intervalo={
			abrir:null,cerrar:null,mover:null
		}
		this.content_puerta.addEventListener("click",()=>{
			if(!this.movimiento){
				this.abierto?this.cerrar():this.abrir();
			}
		});
		this.content_ascensor.style.top="5px";
	}

	abrir(){
		if(this.abierto){
			return;
		}
		console.log(this.content_ascensor.offsetTop);
		if(!Util.estaRango(this.content_ascensor.offsetTop,this.planta.obj.offsetTop,this.planta.obj.offsetTop+this.planta.obj.offsetHeight) ||
			!Util.estaRango(this.content_ascensor.offsetTop+this.content_ascensor.offsetHeight,this.planta.obj.offsetTop,this.planta.obj.offsetTop+this.planta.obj.offsetHeight)){
			return;
		}
		this.movimiento=true;
		Util.modal(this.content_centro,false);
		this.intervalo.abrir=setInterval(()=>{
			let ancho1=this.content_puerta1.offsetWidth;
			let ancho2=this.content_puerta2.offsetWidth;
			let ancho_nuevo1=(ancho1-1);
			let ancho_nuevo2=(ancho2-1);
			if(ancho_nuevo1<=1 && ancho_nuevo2<=1){
				clearInterval(this.intervalo.abrir);
				this.abierto=true;
				this.movimiento=false;
				this.content_puerta.setAttribute("title","Cerrar");
			}else{
				this.content_puerta1.style.width=ancho_nuevo1+"px";
				this.content_puerta2.style.width=ancho_nuevo2+"px";
			}
		},10);
	}

	cerrar(){
		if(!this.abierto){
			return;
		}
		this.movimiento=true;
		Util.modal(this.content_centro,false);
		this.content_puerta1.style.width="5.5vw";
		this.content_puerta2.style.width="5.5vw";
		let ancho_total1=this.content_puerta1.offsetWidth;
		let ancho_total2=this.content_puerta2.offsetWidth;
		this.content_puerta1.style.width="0px";
		this.content_puerta2.style.width="0px";
		this.intervalo.cerrar=setInterval(()=>{
			let ancho1=this.content_puerta1.offsetWidth;
			let ancho2=this.content_puerta2.offsetWidth;
			let ancho_nuevo1=(ancho1+1);
			let ancho_nuevo2=(ancho2+1);
			if(ancho_nuevo1>=ancho_total1 && ancho_nuevo2>=ancho_total2){
				clearInterval(this.intervalo.cerrar);
				this.content_puerta1.style.width="5.5vw";
				this.content_puerta2.style.width="5.5vw";
				this.abierto=false;
				this.movimiento=false;
				this.content_puerta.setAttribute("title","Abrir");
				Util.modal(this.content_centro,true);
			}else{
				this.content_puerta1.style.width=ancho_nuevo1+"px";
				this.content_puerta2.style.width=ancho_nuevo2+"px";
			}
		},10);
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

				this.content_numero.innerHTML=planta.num;
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