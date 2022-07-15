class Planta{
	
	constructor(){
		Planta.num++;
		this.obj=document.createElement("div");
		this.obj.setAttribute("class"," planta"+Planta.num+" planta");
		this.obj.setAttribute("id","planta"+Planta.num);
		this.obj.innerHTML=Planta.num;
		this.num=Planta.num;
		this.persona=[];
	}

	static num=0;

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