var th = new TreasureHunt();

th.startSimulationHandler = function(data) {
	$('#play-button').prop('disabled', true);
	$('#pause-button').prop('disabled', false);
	console.log('start simulation');
};

th.endSimulationHandler = function(data) {
	$('#play-button').prop('disabled', false);
	$('#pause-button').prop('disabled', true);
	console.log('end simulation');
};

$('#play-button').click(function() {
	ts.findTreasure();
});

function grid(map){
	this.map = map;
	this.valid_coordinate = function(x,y){
		if(x < 0 || y < 0  || x > map.length || y > map.length){
			return false;
		}
		return true;
	};
	this.neighbor = function(x,y){
		var neighbors = [];
		if(this.valid_coordinate(x-1,y)){
			if(!(map[x-1][y].obstacle)){
				neighbors.push(map[x-1][y])
			}
		}
		if(this.valid_coordinate(x+1,y)){
			if(!(map[x+1][y].obstacle)){
				neighbors.push(map[x+1][y])				
			}
		}
		if(this.valid_coordinate(x,y-1)){
			if(!(map[x][y-1].obstacle)){
				neighbors.push(map[x][y-1])			
			}
	
		}
		if(this.valid_coordinate(x,y+1)){
			if(!(map[x][y+1].obstacle)){
				neighbors.push(map[x][y+1])				
			}
		}
	};	
}
