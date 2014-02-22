$(document).ready(function() {
  $("#go").on("click", function(event) {
    //do the thing with the address
    event.preventDefault();
    var address = $("#address").val();
  
    searchQuery();
    $(".result").show();
    console.log("Shown");
  });
});
