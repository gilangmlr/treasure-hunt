/*
* class Grid which has property map and method neighbor
*/
function Grid(map, start, goal){
	this.start = start;
	this.goal = goal;
	this.map = map;
	this.applyHeuristic = function(heuristicFn) {
		for (var row = 0; row < this.map.length; row++) {
			for (var col = 0; col < this.map[row].length; col++) {
				heuristicFn(this.map[row][col], this.goal);
			}
		}
	}
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
	*a and b are node to be compared
	* this method compares which node has the higher priority based on h & g
	* g + h = f
	*/
	this.heuristicComparator = function(a, b) {
		return (a.g + a.h) < (b.g + b.h);
	}
	/*
	* this method implements a* search to find the path from start to goal
	*/
	this.astar = function(){
		var frontier = new FastPriorityQueue(this.heuristicComparator);
		frontier.add(this.start);
		while(!frontier.isEmpty()){
			var currentNode = frontier.poll();
			currentNode.visited = true;

			if(currentNode.x == this.goal.x && currentNode.y == this.goal.y){
				var parent = this.goal.parent;
				var solution = [this.goal];
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
