function renderTile(x, y, status) {
  var el = $('#tile' + x + y);
  if (status === 'seen') {
    el.removeClass('visited');
  } else if (status === 'visited') {
    el.removeClass('seen');
  }
  el.addClass(status);
  el.hide().show(0);
}

var animateGrid = function(idx, steps) {
  if (idx >= steps.length || !grid.isPlaying) {
    return;
  }
  grid.step = idx;
  var node = steps[idx];
  renderTile(node.x, node.y, node.status);
  grid.step++;
  setTimeout(function() {
    animateGrid(grid.step, steps);
  }, 100);
}

/*
* class Grid which has property map and method neighbor
*/
function Grid(map, start, goal){
	this.start = start;
	this.goal = goal;
	this.map = map;
  this.path = [];
	this.steps = [];
  this.step = 0;
  this.isPlaying = true;

	this.SLDH = function(node, goal){
		return Math.sqrt(Math.pow(node.x-goal.x, 2)+Math.pow(node.y-goal.y, 2));
	}
	this.manhattan = function(node,goal){
		return Math.abs(node.x-goal.x) + Math.abs(node.y-goal.y);
	}
	this.applyHeuristic = function(heuristicFn) {
		for (var row = 0; row < this.map.length; row++) {
			for (var col = 0; col < this.map[row].length; col++) {
				this.map[row][col].h = heuristicFn(this.map[row][col], this.goal);
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
    this.isPlaying = true;
    if (this.steps.length > 0) {
      animateGrid(this.step, this.steps);
      return
    }

		var frontier = new FastPriorityQueue(this.heuristicComparator);
		frontier.add(this.start);
		this.start.seen = true;
		this.start.status = 'seen';
		this.steps.push({x: this.start.x, y: this.start.y, status: 'seen'});
		while(!frontier.isEmpty()){
			var currentNode = frontier.poll();
			currentNode.visited = true;
			this.steps.push({x: currentNode.x, y: currentNode.y, status: 'visited'});

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
	    		path.push({x: solution[i].x, y: solution[i].y, status: 'path'});
	    	}

        this.path = path;
        this.steps = this.steps.concat(path);
	    	animateGrid(this.step, this.steps);
        return this.path;
			}

			var neighbors = this.neighbor(currentNode.x, currentNode.y);
			for(var i = 0; i < neighbors.length; i++){
				var neighborToCheck = neighbors[i];
				if(neighborToCheck.visited == false && neighborToCheck.seen == false){
					neighborToCheck.parent = currentNode;
					frontier.add(neighborToCheck);
					neighborToCheck.seen = true;
					this.steps.push({x: neighborToCheck.x, y: neighborToCheck.y, status: 'seen'});
				}
			}
		}
	}
  this.reset = function() {
    this.isPlaying = false;
    for (var row = 0; row < this.map.length; row++) {
      for (var col = 0; col < this.map[row].length; col++) {
        this.map[row][col].seen = false;
        this.map[row][col].visited = false;
      }
    }
    this.step = 0;
    this.steps = [];
    renderMap(this.map);
  }
  	if(!this.isPlaying){
  		$("#pause-button").property('disabled');
  	}
	this.pause = function() {
		this.isPlaying = false;
	}
   
  this.next = function() {
    if (this.step - 2 >= this.steps.length) {
      return;
    }

    this.isPlaying = true;
    var node = this.steps[this.step++];
    renderTile(node.x, node.y, node.status);
  }
  this.prev = function() {
    if (this.step - 2 <= 0) {
      return;
    }

    this.isPlaying = true;
    this.step--;
    var node = this.steps[this.step];
    var el = $('#tile' + node.x + node.y);
    var status;
    if (node.status === "path") {
      el.removeClass("path");
      status = "visited";
    } else if (node.status === "visited") {
      status = "seen";
    } else if (node.status === "seen") {
      el.removeClass("seen");
      return;
    }
    renderTile(node.x, node.y, status);
  }
}
