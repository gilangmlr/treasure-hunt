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

function Grid(map){
	this.map = map;
	this.valid_coordinate = function(x,y){
		if(x < 0 || y < 0  || x >= this.map.length || y >= this.map[x].length){
			return false;
		}
		return true;
	};
	this.neighbor = function(x,y){
		var neighbors = [];
		if(this.valid_coordinate(x-1,y)){
			if(!(this.map[x-1][y].obstacle)){
				neighbors.push(this.map[x-1][y])
			}
		}
		if(this.valid_coordinate(x+1,y)){
			if(!(this.map[x+1][y].obstacle)){
				neighbors.push(this.map[x+1][y])				
			}
		}
		if(this.valid_coordinate(x,y-1)){
			if(!(this.map[x][y-1].obstacle)){
				neighbors.push(this.map[x][y-1])			
			}
	
		}
		if(this.valid_coordinate(x,y+1)){
			if(!(this.map[x][y+1].obstacle)){
				neighbors.push(this.map[x][y+1])				
			}
		}

		return neighbors;
	};	
}

function Node(x, y, obstacle, g, h, parent) {
	this.x = x;
	this.y = y;
	this.obstacle = obstacle;
	this.g = g || 0;
	this.h = h || 0;
	this.parent = parent || null;
}

function heuristicComparator(a, b) {
	return (a.g + a.h) < (b.g + b.h);
}

var map = [
  [new Node(0, 0, true), new Node(1, 0, false), new Node(2, 0, true)],
  [new Node(0, 1, true), new Node(1, 1, false), new Node(2, 1, true)],
  [new Node(0, 2, true), new Node(1, 2, false), new Node(2, 2, true)],
];
var grid = new Grid(map);

var frontier = new FastPriorityQueue(heuristicComparator);

console.log(grid.neighbor(1, 1));
