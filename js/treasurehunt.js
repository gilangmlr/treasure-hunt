(function($) {
	function TreasureHunt() {
	}
	
	this.TreasureHunt = TreasureHunt;
	
	TreasureHunt.prototype = {
		findTreasure: function() {
			this.startSimulationHandler();
			setTimeout(this.endSimulationHandler, 5000);
		}
	}
})($);