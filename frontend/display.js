$(document).ready(function() {
  $("#searchBtn").on("click", function(event) {
    //do the thing with the address
    event.preventDefault();
    var address = $("#address").val();
  
    searchQuery();
    $(".result").show();
		$(".about").hide();
    console.log("Shown");
  });
	
	$("#searchBtn").on("keyup", function(event) {
	if(event.which == 13) {
    //do the thing with the address
    event.preventDefault();
    var address = $("#address").val();
  
    searchQuery();
    $(".result").show();
		$(".about").hide();
    console.log("Shown");}
  });
});
