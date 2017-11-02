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
	th.findTreasure();
});

/*
* class Grid which has property map and method neighbor
*/
function Grid(map){
	this.map = map;
	this.validCoordinate = function(x,y){
		if(x < 0 || y < 0  || x >= this.map.length){
			return false;
		} else {
			if (y >= this.map[x].length){
				return false;
			}
		}
		return true;
	};
	this.neighbor = function(x,y){
		var neighbors = [];
		if(this.validCoordinate(x-1,y)){
			if(!(this.map[x-1][y].obstacle)){
				neighbors.push(this.map[x-1][y])
			}
		}
		if(this.validCoordinate(x+1,y)){
			if(!(this.map[x+1][y].obstacle)){
				neighbors.push(this.map[x+1][y])				
			}
		}
		if(this.validCoordinate(x,y-1)){
			if(!(this.map[x][y-1].obstacle)){
				neighbors.push(this.map[x][y-1])			
			}
	
		}
		if(this.validCoordinate(x,y+1)){
			if(!(this.map[x][y+1].obstacle)){
				neighbors.push(this.map[x][y+1])				
			}
		}

		return neighbors;
	};
/*
* a and b are node to be compared
* this method compares which node has the higher priority based on h & g
* g + h = f
*/
	this.heuristicComparator = function(a, b) {
		return (a.g + a.h) < (b.g + b.h);
	}
/*
*
*/
	this.astar = function(start, goal){
		var frontier = new FastPriorityQueue(this.heuristicComparator);
		frontier.add(start);
		while(!frontier.isEmpty()){
			var currentNode = frontier.poll();
			currentNode.visited = true;

			if(currentNode.x == goal.x && currentNode.y == goal.y){
				var parent = goal.parent;
				var solution = [goal];
				var path = [];
    			while(parent != null){
			    	var current = parent;
			    	solution.push(current);

			    	parent = current.parent;
			   	}
			   	for (var i = solution.length - 1; i >= 0; i--) {
			    		path.push(solution[i]);
			    	}
				return path;
			}

			var neighbors = this.neighbor(currentNode.x, currentNode.y);
			for(var i = 0; i < neighbors.length; i++){
				var neighborToCheck = neighbors[i];
				if(neighborToCheck.visited == false && neighborToCheck.seen == false){
					neighborToCheck.parent = currentNode;
					frontier.add(neighborToCheck);
					neighborToCheck.seen = true;
				}
			}
		}
	}
}

var map = [];
var grid = new Grid(map);

document.getElementById('file').onchange = function(){
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    var lines = this.result.split('\n');
    map = [];
    for(var line = 0; line < lines.length; line++){
    	var splittedLine = lines[line].trim().split('');
    	var row = [];
    	for(var col = 0; col < splittedLine.length; col++){
    		var char = splittedLine[col];
    		var obstacle = true;
    		if (char > 0) {
    			obstacle = false;
    		}

    		row.push(new Node(line, col, obstacle));
    	}

    	map.push(row);
    }

    grid = new Grid(map);
    var path = grid.astar(map[0][3],map[5][4]);
    console.log(path);

  };

  reader.readAsText(file);
};