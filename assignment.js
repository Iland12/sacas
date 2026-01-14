// if (annyang) {
//   var commands = {
//     alert: function () {
//       window.open("https://www.youtube.com", "_blank");
//     },
//   };

//   annyang.addCommands(commands);
//   annyang.start();
// }

if (annyang) {
  var commands = {
    alert: function () {
      //   window.open("https://www.youtube.com", "_blank");
      alert("BHJCd");
    },
  };

  annyang.addCommands(commands);
  annyang.start();
} else {
  alert("Speech recognition not supported");
}
