var th = new TreasureHunt();

th.startSimulationHandler = function(data) {
	$('#play-button').prop('disabled', true);
	$('#pause-button').prop('disabled', false);
	console.log('start simulation');
  grid.astar();
};

th.endSimulationHandler = function(data) {
	$('#play-button').prop('disabled', false);
	$('#pause-button').prop('disabled', true);
	console.log('end simulation');
};

$('#play-button').click(function() {
	th.findTreasure();
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

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

  // console.log('sleeping');
  // sleep(2000);
  console.log('map done');
}

function renderTile(x, y, status) {
  console.log('x: ' + x + ', y: ' + y + ', status: ' + status);
  // var el = $('.map-row:nth-child(' + (x + 1) + ') .map-row-col:nth-child(' + (y + 1) + ') .map-row-col-tile');
  var el = $('#tile' + x + y);
  if (status === 'seen') {
    el.removeClass('visited');
  } else {
    el.removeClass('seen');
  }
  el.addClass(status);
  el.hide().show(0);
  // var foo = window.getComputedStyle(el[0], null);
  // getComputedStyle(el[0]).transitionDuration; // force update
  // console.log($('.map-row:nth-child(' + (x + 1) + ') .map-row-col:nth-child(' + (y + 1) + ')')[0]);
}

var grid;

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
    		var char = splittedLine[col];
    		var obstacle = true;
    		if (char > 0) {
    			obstacle = false;
    		}

    		row.push(new Node(line, col, obstacle));
    	}

    	map.push(row);
    }

    renderMap(map);

    grid = new Grid(map, map[0][3], map[2][3]);
    // console.log(map);
    grid.applyHeuristic(grid.SLDH);
    // var path = grid.astar();
    // console.log(path);

  };

  reader.readAsText(file);
};
