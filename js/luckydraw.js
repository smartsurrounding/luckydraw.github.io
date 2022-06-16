

var first10 = true;
var cnt = 10;
var round = 10;

var roundOfDraw = 16;
var allPrizeName = "";

function drawNext() {
  var luckyList = [];
  var data1 = data;

  var prefix = prizeArr[16 - roundOfDraw];

  if (roundOfDraw) {
    roundOfDraw--;
    if (!roundOfDraw) {
      //end of draw
      $('#btn1').prop('disabled', true);  //grey button
      $("#sessionname").html("End of draw, <BR>let's play again next year!");
    } else {
    }
    for (let i = 0; i < round; i++) {
      var randNumber = Math.floor(Math.random() * data1.length);
      var personname = data1[randNumber];
      luckyList.push("<br>" + personname);

      data1.splice(randNumber, 1);
    }

    cnt--;
    if (cnt == 0) {
      first10 = false;
      round = 1;
    }

    //store the luckyList for reporting
    allPrizeName += '\r\n' + prefix + luckyList;
    console.log("allPrizeName: " + allPrizeName);

    //display luckyList to the page
    $("#luckyperson").html(luckyList);

  }
}

$('#btn1').on('click', function () {

  if (roundOfDraw) {
    // let a common class(disable-btn) for each button which should be disabled for on second
    $('#btn1').prop('disabled', true);
    setTimeout(function () {
      // enable click after 1 second
      $('#btn1').prop('disabled', false);
    }, 300); // 1 second delay
  } else {

    //==========================================
    //final round, auto generate report here!
    allPrizeName = allPrizeName.replaceAll(",", "");
    allPrizeName = allPrizeName.replaceAll("<br>", ",");

    var link = document.createElement('a');
    link.setAttribute('download', 'report.csv');
    //link.href = makeTextFile(textbox.value);
    link.href = makeTextFile(allPrizeName);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  }

});




//========================================//
//generate report file snippet,

var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], { type: 'text/plain' });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
  };









/*
function writeReport() {

  var create = document.getElementById('create'),
    textbox = document.getElementById('textbox');

  create.addEventListener('click', function () {
    var link = document.createElement('a');
    link.setAttribute('download', 'report.csv');
    //link.href = makeTextFile(textbox.value);
    link.href = makeTextFile(allPrizeName);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });

  }, false);
}
*/