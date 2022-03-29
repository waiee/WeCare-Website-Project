$(document).ready(function () {
  ///// input /////
  var text = $("textarea#textArea").val();

  ///// ContinueBtn //////
  $("#ContinueBtn").on("click", function () {
    var text = $("textarea#textArea").val();
    if (text == "") {
      alert("Please insert something.");
      return;
    } else {
      alert(`Hi ${text}! it feels good to have you here!`);
      ///// change screen /////
      var str = document.getElementById("greetings").innerHTML;
      var res = str.replace(
        "Hi there! What's your name?",
        "How's your feelings now?"
      );
      document.getElementById("greetings").innerHTML = res;
      $("#textArea").val("");
      $(this).prop("disabled", true);
    }
  });

  ///// FinishBtn /////
  $("#FinishBtn").on("click", function () {
    var text = $("textarea#textArea").val();
    var emotion = ["sad", "down", "angry", "mad", "happy"];
    function checkWord(text) {
      for (const [i, v] of emotion.entries()) {
        if (text.includes(v)) {
          return i;
        }
      }
      return -1;
    }
    function quotes(text) {
      if (checkWord(text) == 0 || checkWord(text) == 1) {
        alert("It's okay to be not okay, and it's okay to be sad!");
      } else if (checkWord(text) == 2 || checkWord(text) == 3) {
        alert(
          "I know it was hard for you, I hope that I can help to endure you anger."
        );
      } else if (checkWord(text) == 4) {
        alert("Your smile could change the world! so stay happy and healthy! ");
      } else if (checkWord(text) == -1) {
        alert("Have a good day!");
      }
    }
    quotes(text);
    alert(data[0]);
    var res = "Hi there! What's your name?";
    document.getElementById("greetings").innerHTML = res;
    resetnewpage();
  });
  /////ResetBtn/////
  $("form").submit(function () {
    alert("Your screen has been reset succesfully.");
  });

  //////// FUNCTIONS //////////
  //form function//
  $("form").submit(function () {
    alert("Your screen has been reset succesfully.");
  });

  //data alert list//
  var data = ["You did well!", "Your screen has been reset succesfully. "];

  //reload windows//
  function resetarea() {
    location.reload();
  }

  //finish page//
  function resetnewpage() {
    location.replace("finishpage.html");
  }
});
