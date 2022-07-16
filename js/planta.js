class Planta{
	
	constructor(){
		Planta.num++;
		this.obj=document.createElement("div");
		this.obj.setAttribute("class"," planta"+Planta.num+" planta");
		this.obj.setAttribute("id","planta"+Planta.num);
		this.num=Planta.num;
		this.personas=[];
	}

	static id_persona=0;

	static num=0;

	agregarPersona(){
		if(Juego.total_personas<Juego.max_personas){
			Planta.id_persona++;
			Juego.total_personas++;
			let persona=new Persona();
			persona.obj.setAttribute("class","persona");
			persona.obj.setAttribute("id","persona"+this.personas.length+1);
			persona.id=Planta.id_persona;
			this.personas.push(persona);
			this.obj.appendChild(persona.obj);
			// Posicionar persona
			persona.obj.style.width=(((40*.80)/3)*2)+"vh";
			persona.obj.style.height=(40*.80)+"vh";
			persona.obj.style.left=(Util.numeroAleatorio(0,this.obj.offsetWidth-persona.obj.offsetWidth))+"px";
			//this.obj.innerHTML=this.personas.length;
		}
	}

	quitarPersona(persona){
		//this.obj.removeChild(persona.obj);
		this.personas=this.personas.filter((p)=>{
			return p.id!=persona.id;
		});
		Juego.total_personas--;
	}

	subir(planta){
		let y=planta.obj.offsetTop;
		let alto=planta.obj.offsetHeight;
		planta.obj.style.top=(y-10)+"px";
	}

	bajar(planta){
		let y=planta.obj.offsetTop;
		let alto=planta.obj.offsetHeight;
		planta.obj.style.top=(y+10)+"px";
	}

}