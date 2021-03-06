//JavaScript Hoggetowne Hack-a-thon //get address from search bar, 
//pass into api to gather all data related to it

//turn address into location object
//return object

//gets address entered into the search bar and creates a location object
function searchQuery() {
	
	var addr = $("#searchBar").val(); 
	console.log(addr);
  addr = api.encodeAddress(addr);
  console.log("search query");

	callback = function(id) {
		return function(data) {
      console.log(data);
			if(data != 0) {
			document.getElementById(id).innerText = data; }
			else {
			document.getElementById(id).innerText = "no data available"; 
			}
		}
	}
	
	api.getElectricFromServer(addr, callback("electricity"));
	api.getWaterFromServer(addr, callback("water"));
	//api.getGarbageFromServer(addr, callback("garbage"));
	api.getNatGasFromServer(addr, callback("natGas"));
	
	api.getElectricPercentile(addr, callback("elecPer"))
	api.getWaterPercentile(addr, callback("waterPer"));	
	api.getNatGasPercentile(addr, callback("natGasPer"));	
}
