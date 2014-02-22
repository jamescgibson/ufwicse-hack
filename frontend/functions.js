//JavaScript Hoggetowne Hack-a-thon
//get address from search bar, 
//pass into api to gather all data related to it

//gets address entered into the search bar
function searchQuery() {
	var addr = document.getElementById("address");
	
	var elec = api.getNatGasFromServer(addr, callback);
	document.getElementById("electricity").innerText = elec;
	
	var watr = api.getNatGasFromServer(addr, callback);
	document.getElementById("water").innerText = watr;
	
	var trash = api.getNatGasFromServer(addr, callback);
	document.getElementById("garbage").innerText = trash;
	
	var avgrall = averageRating();
	document.getElementById("rank").innerText = trash;
	
}


