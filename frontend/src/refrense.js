
	var boxx=20;
	var boxy=30;
	var boxwidth=350;
	var boxheight=250;
	var ballrad=20;
	var boxboundx = boxwidth+boxx-ballrad;
	var boxboundy = boxheight+boxy-ballrad;
	var inboxboundx= boxx +ballrad;
	var inboxboundy= boxy +ballrad;
	var ballx = 50;
	var bally = 60;
	var ballvx =4;
	var ballvy =8;
	var img = new Image();
	img.src="../RESOURCES/images/Ball.jpeg";
	var ctx;
	var grad;
	var color;
	var hue = [[255,0,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255]];
	var tev;
	var controller= true;
	var musicelements;
	
	function init(){
		var h;
		ctx = document.getElementById("canvas").getContext("2d");
		grad =ctx.createLinearGradient(boxx,boxy,boxx+boxwidth,boxy+boxheight);
		for (h=0;h<hue.length;h++){
			color="rgb("+hue[h][0]+","+hue[h][1]+","+hue[h][2]+")";
			grad.addColorStop(h*1/6,color);
		}
		ctx.fillStyle= grad;
		ctx.linewidth = ballrad;
		// ctx.fillStyle = "rgb(200,0,50)";
		moveball();
		
		tev = setInterval("moveball(),increase();",100);
		
		//tiv= setInterval(increase,1000);
		
		musicelements = document.getElementsByTagName("audio");
		
	}
	function moveball(){
		ctx.clearRect(boxx,boxy,boxwidth,boxheight);
		moveandcheck();
	/*  ctx.beginPath();
		ctx.arc(ballx,bally,ballrad,0,Math.PI *2,true);
		ctx.fill();
		ctx.strokeRect(boxx,boxy,boxwidth,boxheight) */
		ctx.drawImage(img,ballx-ballrad,bally-ballrad,2*ballrad,2*ballrad);
		ctx.fillRect(boxx,boxy,ballrad,boxheight);
		ctx.fillRect(boxx+boxwidth-ballrad,boxy,ballrad,boxheight);
		ctx.fillRect(boxx,boxy,boxwidth,ballrad);
		ctx.fillRect(boxx,boxy+boxheight-ballrad,boxwidth,ballrad);
	}
	function moveandcheck(){
		var nballx = ballx + ballvx;
		var nbally = bally + ballvy;
		
		if(nballx > boxboundx){
			ballvx = -ballvx;
			nballx = boxboundx;
			musicelements[1].play();
		}
		if(nballx < inboxboundx){
			nballx = inboxboundx;
			ballvx = -ballvx;
			musicelements[1].play();
		}
		if(nbally > boxboundy){
			nbally = boxboundy;
			ballvy = -ballvy;
			musicelements[1].play();
		}
		if(nbally < inboxboundy){
			nbally = inboxboundy;
			ballvy = -ballvy;
			musicelements[1].play();
		}
		ballx = nballx;
		bally = nbally;
	}
	function change(){
		ballvx = Number(f.hv.value);
		ballvy = Number(f.vv.value);
		return false;
	}
	
	function increase(){
		document.f.secs.value = String(1+Number(document.f.secs.value));
	}
	
	function startstop (){
	if(controller){
		clearInterval(tev);
		controller = false;
		}else{	
		document.f.secs.value = "0";
		tev = setInterval("moveball(),increase();",100); 
		controller= true;
		}
	
		return false;
	}
		
