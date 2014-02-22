//JavaScript Hoggetowne Hack-a-thon
//get address from search bar, 
//pass into api to gather all data related to it

//turn address into location object
//return object

//gets address entered into the search bar and creates a location object
function searchQuery() {
	var addr = document.getElementById("address");
	
	callback = function(id) {
		return function(data) {
			document.getElementById(id).innerText = data;
		}
	}
	
	//api.getNatGasFromServer(addr, callback("naturalgas"));
	api.getNatGasFromServer(addr, callback("electricity"));
	api.getWaterFromServer(addr, callback("garbage"));
	//api.getBizFromServer(addr, callback("rank"));		
}