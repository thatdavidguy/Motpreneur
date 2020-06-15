window.onresize = resizeScreen;
function resizeScreen() {
  Array.from(document.getElementsByClassName("square")).forEach((elem) => {
    let offset = elem.clientWidth;
    if(elem.style.left) { elem.style.left = `-${offset/2}px` }
    if(elem.style.right) { elem.style.right = `-${offset/2}px` }
    if(elem.style.top) { elem.style.top = `-${offset/2}px` }
    if(elem.style.bottom) { elem.style.bottom = `-${offset/2}px` }
  });
}
resizeScreen();

isrec = 0
aomin = 0
aomax = 0
var Recording = document.getElementById("rec_stat");
function STARTTHERECORDING(){
  if (isrec === 0){
    isrec = 1 
    r = document.getElementById("output");
    if("webkitSpeechRecognition" in window){
        speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = "en-US";
        speechRecognizer.start();
        Recording.innerHTML = "Recoding...."
        
        finalTranscripts = "";
        speechRecognizer.onresult = function(event){
            var interimTranscripts = "";
            for(var i=event.resultIndex; i<event.results.length; i++){
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if(event.results[i].isFinal){
                    finalTranscripts += transcript;
                }
                else{
                    interimTranscripts += transcript;
                }
                r.innerHTML = finalTranscripts + '<span style="color: #999;">' + interimTranscripts + '</span>';
            }
        };
        speechRecognizer.onerror = function(event){
          isrec = 0
        };
    }
    else{
        r.innerHTML = "Your browser does not support webkitSpeechRecognition";
    } 
  }
  else {
  console.log("Recording is already in session")
  }
}
function STOPTHERECORDING(){
  Recording.innerHTML = "";
  isrec = 0;
  speechRecognizer.stop();
  aomin++;
  console.log(aomin)
  var dive = document.createElement('div');
  document.getElementById("heightofpage").style.height = "200vh" 
  if (aomin >= 4){
      notes = document.getElementById("translist2");
  } else {
      notes = document.getElementById("translist");
  }
  var dive = document.createElement('div');
  dive.style.borderWidth = "2px";
  dive.style.fontWeight = "lighter";
  dive.style.marginTop = "10px";
  dive.style.borderStyle= "solid";
  dive.style.overflowY= "scroll";
  dive.innerText += r.textContent;
  notes.insertBefore(dive, notes.childNodes[0]);
  
}
