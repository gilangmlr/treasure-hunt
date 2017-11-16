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
    console.log(map);
    grid.applyHeuristic(grid.SLDH);
    var path = grid.astar();
    console.log(path);

  };

  reader.readAsText(file);
};

function renderMap(map) {
  var mapElStr = '';
  for (var i = 0; i < map.length; i++) {
    mapElStr += '<div class="map-row">';
    for (var j = 0; j < map[i].length; j++) {
      var obstacle = map[i][j].obstacle? 'obstacle' : '';
      mapElStr += '<div class="map-row-col">\
          <div class="map-row-col-tile ' + obstacle + '"></div>\
        </div>';
      
    }
    mapElStr += '</div>';
  }

  $('#map').html(mapElStr);
}
