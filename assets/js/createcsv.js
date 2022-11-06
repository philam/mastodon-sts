document.getElementById("all_button").addEventListener("click", selectAll);
document.getElementById("none_button").addEventListener("click", selectNone);
document.getElementById("selected_button").addEventListener("click", createSelectedCsv);



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
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "selected_urbanist";
      checkbox.value = urbanist["account"];
      checkbox.id = "urbanist" + i;
      var label = document.createElement('label');
      label.htmlFor = "id";
      label.appendChild(document.createTextNode(urbanist["account"] + " (" + urbanist["name"] + "), "));
      var profilelink = document.createElement('a');
      profilelink.href = urbanist["link"];
      profilelink.target = "_blank";
      const linkname = document.createTextNode(urbanist["link"]);
      profilelink.appendChild(linkname);
      const linebreak = document.createElement('br');

      document.getElementById("urbanists_list").appendChild(checkbox);
      document.getElementById("urbanists_list").appendChild(label);
      document.getElementById("urbanists_list").appendChild(profilelink);
      document.getElementById("urbanists_list").appendChild(linebreak);

    } else {
      faultylinescounter += 1;
    }
  }
  //prints number of lines that could not correctly be rendered from the csv file it the log
  console.log(faultylinescounter + " line(s) from csv not rendered (expected value: 1)")
}


function selectAll() {
    // selecting all checkboxes
    // of group language
    var checkboxes = document.getElementsByName('selected_urbanists');
    var values = [];
    // looping through all checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      values.push(checkboxes[i].value);
    }
}

function selectNone() {
    // selecting all checkboxes
    // of group language
    var checkboxes = document.getElementsByName('selected_urbanists');
    var values = [];
    // looping through all checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      values.push(checkboxes[i].value);
    }
}

function createSelectedCsv() {
    // get checked accounts from checkboxes
    var checkboxes = document.querySelectorAll('input[name="selected_urbanists"]');
    var values = [];
    // looping through all checkboxes
    // if checked property is true then push
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {
        values.push(checkboxes[i].value);
      }
    }


    //create array with collected values
    var csvFileData = [["Account address", "Show boosts"]];
    for (var i = 0; i < values.length; i++) {
      csvFileData.push([values[i], "true"]);
    }




    // define header for csv
    //var csvFile = "Account address,Show boosts\n";

    // merge data from array to csv
    let csvFile = "data:text/csv;charset=utf-8,"
    + csvFileData.map(e => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvFile);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_urbanists_list.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_urbanists_list.csv".

}

function createAllCsv() {
  selectAll();
  createSelectedCsv();
}
