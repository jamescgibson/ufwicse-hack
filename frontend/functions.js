//JavaScript Hoggetowne Hack-a-thon
//get address from search bar, 
//pass into api to gather all data related to it

//turn address into location object
//return object

//gets address entered into the search bar and creates a location object
function searchQuery() {
	var addr = document.getElementById("address");
	
	var location = new Location(addr);
}

//associate data with HTML elements
function displayData(var array) {
	document.getElementById("electricity") = ;
	document.getElementById("water");
	document.getElementById("garbage");
	
	var overall = location.overallRating;
	var elecPercentile = location.electricityPercentile;
	var waterPercentile = location.waterPercentile;
	var trashPercentile = location.garbagePercentile;
	
	content.innerText = "\nOverall Rating "+overall + "\nElectricity Percentile "+elecPercentile + "\nWater Percentile "+waterPercentile + "\nGarbage Percentile "+trashPercentile;
}

