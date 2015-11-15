function play(key){
	switch(key){
		case "A": document.getElementById("ASound").play(); 
		TweenLite.to(document.getElementById("A"), 0.2, {opacity: 1}).reverse(0); break;
		case "B": document.getElementById("BSound").play(); 
		TweenLite.to(document.getElementById("B"), 0.2, {opacity: 1}).reverse(0); break;
		case "C": document.getElementById("CSound").play(); 
		TweenLite.to(document.getElementById("C"), 0.2, {opacity: 1}).reverse(0); break;
		case "D": document.getElementById("DSound").play(); 
		TweenLite.to(document.getElementById("D"), 0.2, {opacity: 1}).reverse(0); break;
		case "E": document.getElementById("ESound").play(); 
		TweenLite.to(document.getElementById("E"), 0.2, {opacity: 1}).reverse(0); break;
		case "F": document.getElementById("FSound").play();
		TweenLite.to(document.getElementById("F"), 0.2, {opacity: 1}).reverse(0); break;
		case "G": document.getElementById("GSound").play(); 
		TweenLite.to(document.getElementById("G"), 0.2, {opacity: 1}).reverse(0); break;
		case "HC": document.getElementById("HCSound").play(); 
		TweenLite.to(document.getElementById("HC"), 0.2, {opacity: 1}).reverse(0); break;
	}
}


Myo.connect('com.enghack.poseDetect');


function yawSync(){
	setTimeout(function(){
		Myo.myos[0].zeroOrientation();
		Myo.myos[1].zeroOrientation();
		console.log('Synced');
	}, 1000);
}

Myo.on('connected', function(){
Myo.setLockingPolicy('none');

var directionL = 'middle', directionR = 'middle';
var poseL = 'open', poseR = 'open';
var pitch, yaw;

function getDir(p, y){
	if(-0.5 < p && p < 0.5){
		if(y > 0.5){
			return 'left';
		}else if(y < -0.5){
			return 'right';
		}else{
			return 'middle';
		}
	}else{
		if(p > 0.5){
			return 'up';
		}else{
			return 'down';
		}
	}
}

function getDir(p, y){
	if(-0.5 < p && p < 0.5){
		return 'middle';
	}else{
		if(p > 0.5){
			return 'up';
		}else{
			return 'down';
		}

	}
}

Myo.on('pose', function(pose){
	if(pose == 'fist'){
		if(this.name == 'Right Myo'){
			poseR = 'fist';
		}else if(this.name == 'Left Myo'){
			poseL = 'fist';
		}
	}
});

Myo.on('pose_off', function(pose){
	if(this.name == 'Right Myo'){
		poseR = 'open';
	}else{
		poseL = 'open';
	}

});

Myo.on('orientation', function(data){
	pitch = Math.asin(Math.max(-1.0, Math.min(1.0, 2.0 * (data.w * data.y - data.z * data.x))));
    yaw = Math.atan2(2.0 * (data.w * data.z + data.x * data.y), 1.0 - 2.0 * (data.y * data.y + data.z * data.z));
    if(this.name == 'Right Myo'){
    	directionR = getDir(pitch, yaw);
    }else{
    	directionL = getDir(pitch, yaw);
    }
});

setInterval(function(){
	if(previousActionR != directionR)
	{
	  previousActionR = directionR;
	  switch(directionR){
	  	case "up": play("G"); break;  	
    	case "down": play("A"); break;
	  	case "left": play("B"); break;  	
    	case "right": play("HC"); break;
	  }
	}
	if(previousActionL != directionL)
	{
	  previousActionL = directionL;
	  switch(directionL){
	  	case "up": play("C"); break;  	
    	case "down": play("D"); break;
	  	case "left": play("E"); break;  	
    	case "right": play("F"); break;
	  }
	}
}, 0);
});

