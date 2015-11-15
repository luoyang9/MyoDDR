Myo.connect('com.enghack.poseDetect');

Myo.on('connected', function(){
	Myo.setLockingPolicy('none');

	var directionL = 'middle', directionR = 'middle';
	var poseL = 'open', poseR = 'open';
	var pitch, yaw;

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

	console.log(Myo);

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
		console.log('PoseR: ' + poseR);
		console.log('PoseL: ' + poseL);
		console.log('DirectionR: ' + directionR);
		console.log('DirectionL: ' + directionL);
	}, 100);
});

