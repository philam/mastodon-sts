$(document).ready(function() {
  console.log( "ready!" );
  $.ajax({
    type: "GET",
    url: "resources/urbanists.csv",
    dataType: "text",
    success: function(data) {
      printUrbanistsOnWP(data); //define your own function
    }
  });
});

// parses csv string into json and creates checkbox for each item on index.html
function printUrbanistsOnWP(data) {
  console.log(data);
  var allurbanists_complete = Papa.parse(data, {header: true}); // parses csv to json
  var faultylinescounter = 0;
  for (var i = 0; i < allurbanists_complete["data"].length; i++){

    var urbanist = allurbanists_complete["data"][i];
    if (urbanist["account"]){
      var account_for_post = document.createTextNode(urbanist["account"] + " (" + urbanist["name"] + ")");
      const linebreak = document.createElement('br');
      document.getElementById("list_for_mastodon").appendChild(account_for_post);
      document.getElementById("list_for_mastodon").appendChild(linebreak);

    } else {
      faultylinescounter += 1;
    }
  }
  //prints number of lines that could not correctly be rendered from the csv file it the log
  console.log(faultylinescounter + " line(s) from csv not rendered (expected value: 1)")
}
