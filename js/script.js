$('#play-button').click(function() {
  grid.astar();
  grid.play();
});

$('#pause-button').click(function() {
  grid.pause();
});

$('#next-button').click(function() {
  grid.pause();
  grid.next();
});

$('#prev-button').click(function() {
  grid.pause();
  grid.prev();
});

$('#reset-button').click(function() {
  grid.reset();
});

function renderMap(map) {
  $('#map').html('');
  for (var i = 0; i < map.length; i++) {
    var rowEl = $('<div class="map-row">');
    for (var j = 0; j < map[i].length; j++) {
      var obstacle = map[i][j].obstacle? 'obstacle' : '';
      var status = map[i][j].seen? 'seen' : '';
      status = (!map[i][j].seen && map[i][j].visited)? 'visited' : '';
      tileElStr = '<div class="map-row-col">\
          <div id="tile'+i+j+'" class="map-row-col-tile ' + obstacle + ' ' + status + '"></div>\
        </div>';
      rowEl.append(tileElStr);
    }
    $('#map').append(rowEl);
  }

  $('#tile' + start.x + start.y).addClass('start').hide().show(0);
  $('#tile' + goal.x + goal.y).addClass('goal').hide().show(0);
}

var grid = {};
var start = {};
var goal = {};

document.getElementById('file').onchange = function(){
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    var lines = this.result.split('\n');
    var map = [];
    for(var line = 0; line < lines.length; line++){
    	var splittedLine = lines[line].trim().split('');
    	var row = [];
    	for(var col = 0; col < splittedLine.length; col++){
    		var char = parseInt(splittedLine[col]);
    		var obstacle = true;
    		if (char > 0) {
    			obstacle = false;
    		}

        var node = new Node(line, col, obstacle);
    		row.push(node);

        if (char === 2) {
          start = node;
        } else if (char === 3) {
          goal = node;
        }
    	}

    	map.push(row);
    }

    grid = new Grid(map, start, goal);

    renderMap(map);
  };

  reader.readAsText(file);
};

function clickHeuristic(mode) {
	if (mode === 'mh') {
		grid.applyHeuristic(grid.manhattan);
	} else if (mode === 'sld'){
		grid.applyHeuristic(grid.SLDH);
	} else if (mode === 'u'){
    grid.gbfs();
    grid.applyHeuristic(grid.uninformed);
  } else if(mode === 'gbfs') {
    grid.gbfs();
    clickHeuristic($('#heuristic').val());
  } else if (mode === 'a*') {
    if ($('#heuristic').val() != 'u') {
      grid.astarBFS();
    }
  }
}

function randomMap() {
  var rows = 8;
  var started = 0;
  var goaled = 0;
  var map = [];
  for(var line = 0; line < rows; line++){
    var cols = 8;
    var row = [];
    var strRow = "";
    for(var col = 0; col < cols; col++){
      var rand = Math.random();
      var char = Math.floor(rand * 4);
      var startGoal = rand <= 0.9;
      if (char === 2 && started !== 0 && startGoal) {
        char = Math.floor(Math.random() * 2);
      } else if (char === 3 && goaled !== 0 && startGoal) {
        char = Math.floor(Math.random() * 2);
      }
      var obstacle = true;
      if (char > 0) {
        obstacle = false;
      }

      var node = new Node(line, col, obstacle);
      strRow += char;
      row.push(node);

      if (char === 2) {
        started = 2;
        start = node;
      } else if (char === 3) {
        goaled = 3;
        goal = node;
      }
    }

    map.push(row);
    console.log(strRow);
    console.log();
  }

  grid = new Grid(map, start, goal);

  if (grid.astar() === undefined) {
    randomMap();
  } else {
    renderMap(map);
  }
}