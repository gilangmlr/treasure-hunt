$('#play-button').click(function() {
  $('#play-button').prop('disabled', true);
  var path = grid.astar();
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

    var start = map[0][2];
    var goal = map[5][2];

    grid = new Grid(map, start, goal);

    grid.applyHeuristic(grid.SLDH);

    renderMap(map);
    $('#tile' + start.x + start.y).addClass('start').hide().show(0);
    $('#tile' + goal.x + goal.y).addClass('goal').hide().show(0);
  };

  reader.readAsText(file);
};
