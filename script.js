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
* class Node which has property x, y, obstacle, g, h, and parent.
* default value for g & h is 0
* g = step cost from start to this node
* h = heuristic from this to goal
* obstacle denotes whether the node can be passed or not
* parent determines from which node this node is visited
*/
function Node(x, y, obstacle, g, h, parent) {
	this.x = x;
	this.y = y;
	this.obstacle = obstacle;
	this.g = g || 0;
	this.h = h || 0;
	this.parent = parent || null;
}

/*
* class Grid which has property map and method neighbor
*/
function Grid(map){
	this.map = map;
	this.validCoordinate = function(x,y){
		if(x < 0 || y < 0  || x >= this.map.length || y >= this.map[x].length){
			return false;
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
		let exploredSet = new Set();
		while(!frontier.isEmpty()){

			var currentNode = frontier.poll();
			if(currentNode.x == goal.x && currentNode.y == goal.y){

			}

		}

	}
}

var map = [
  [new Node(0, 0, true), new Node(1, 0, false), new Node(2, 0, true)],
  [new Node(0, 1, true), new Node(1, 1, false), new Node(2, 1, true)],
  [new Node(0, 2, true), new Node(1, 2, false), new Node(2, 2, true)],
];
var grid = new Grid(map);


console.log(grid.neighbor(1, 1));
