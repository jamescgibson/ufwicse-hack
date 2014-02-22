$(document).ready(function() {
  $("#searchBar").on('keyup', function(event) {
		if(event.which == 13) {
			//do the thing with the address
			event.preventDefault();
			var address = $("#address").val();
			functions.//stuffs
		}
    //DO THE STUFF HERE
  });
	$("#searchBtn").on('click', function(event) {
    //do the thing with the address
    event.preventDefault();
    var address = $("#address").val();

    //DO THE STUFF HERE
  });
});