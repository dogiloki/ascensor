class Persona{

	constructor(obj){
		this.obj=document.createElement("img");
		this.obj.setAttribute("src",Diccionario.img.persona.der);
		this.id;
		this.tiempo_espera=60;
		this.intervalo_mover;
		this.velocidad_mover=1;
	}

	mover(ascensor,persona=null){
		if(ascensor.planta.num==Juego.num_plantas){
			// Eliminar persona del ascensor
			ascensor.personas=ascensor.personas.filter((p)=>{
				return p.id!=persona.id;
			});
			// Agregar persona a la planta 1
			ascensor.planta.personas.push(persona);
			ascensor.planta.obj.appendChild(persona.obj);
			persona.obj.style.width=(((40*.80)/3)*2)+"vh";
			persona.obj.style.height=(40*.80)+"vh";
			persona.obj.style.left="";
			persona.obj.style.right="0px";
			persona.obj.setAttribute("src",Diccionario.img.persona.izq);
		}
		this.intervalo_mover=setInterval(()=>{
			if(ascensor.planta.num==Juego.num_plantas){
				// Mover las persona hasta el final de la sala
				let x=persona.obj.offsetLeft-5;
				persona.obj.style.left=x+"px";
				if(x<=0){
					clearInterval(this.intervalo_mover);
					// Eliminar persona de la planta
					//ascensor.planta.obj.removeChild(persona.obj);
					//ascensor.planta.personas=ascensor.planta.personas.filter((p)=>{
					//	return p.id!=persona.id;
					//});
				}
				ascensor.content_peso.innerHTML="Personas: "+ascensor.personas.length+" / "+ascensor.peso;
			}else{
				let x=this.obj.offsetLeft+5;
				this.obj.style.left=x+"px";
				if(x>=Juego.content_plantas.offsetWidth-this.obj.offsetWidth){
					clearInterval(this.intervalo_mover);
					if(ascensor.personas.length<ascensor.peso){
						ascensor.personas.push(this);
						this.obj.style.width=(((30*.80)/3)*2)+"vh";
						this.obj.style.height=(30*.80)+"vh";
						this.obj.style.position="absolute";
						this.obj.style.left="0px";
						ascensor.content_puerta.appendChild(this.obj);
						ascensor.planta.quitarPersona(this);
						ascensor.content_peso.innerHTML="Personas: "+ascensor.personas.length+" / "+ascensor.peso;
					}
				}
			}
		},this.velocidad_mover);
	}

	parar(){
		clearInterval(this.intervalo_mover);
	}
	
}