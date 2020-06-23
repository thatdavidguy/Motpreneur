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

isrec = 0;
amount = 0;
var pastext = [];
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
    Recording.innerHTML = "Recording is already in session";
  }
}
function openup(fromid){
  var number = fromid[fromid.length -1];
  idee = "text" + number;
  ree = document.getElementById(idee);
  if (document.getElementById(fromid).value == "open") {
    document.getElementById("button"+number).value = "close";
    ree.innerHTML = pastext[number-1];
    ree.style.visibility = "visible";
  }
  else {
    document.getElementById("button"+number).value = "open";
    document.getElementById("text"+number).innerHTML = "";
    ree.style.visibility = "hidden";
  }
}

function STOPTHERECORDING(){
  pastext.push(r.textContent);
  console.log(pastext);
  Recording.innerHTML = "";
  isrec = 0;
  speechRecognizer.stop();
  var dive = document.createElement('div');
  document.getElementById("heightofpage").style.height = "200vh" 
  notes = document.getElementById("translist2");
  amount++;
  if (amount >= 8){
    document.getElementById("rec_stat").innerHTML ="You cannot have more than 8 notes."
  }
  else{
  ideen =  'text'+amount;
  buttiden = "button"+amount;
  dividen = "div"+amount;

  var totaldiv = document.createElement('div');
  totaldiv.style.borderWidth = "2px"
  totaldiv.style.borderStyle= "solid";
  totaldiv.style.marginTop = "20px"
  totaldiv.setAttribute("id", dividen);

  var diveit = document.createElement('div');
  diveit.style = "display:flex; flex-direction: row;";
  diveit.classList.add("outpt");

  var diveitbutton = document.createElement('div');
  diveitbutton.style ="width: 30%;";
  
  var diveitinput = document.createElement('input');
  diveitinput.type = "button";
  diveitinput.value = "open";
  diveitinput.setAttribute("id", buttiden);
  diveitinput.onclick = function() {openup(this.id);};
  
  

  diveitbutton.appendChild(diveitinput);

  var diveittitle = document.createElement('div');
  diveittitle.style = "width: 70%; ";
  diveittitle.innerHTML = r.innerHTML.substring(0, 10);

  diveit.appendChild(diveitbutton);
  diveit.appendChild(diveittitle);


  var divetex = document.createElement('div');
  divetex.style.visibility = "hidden";
  //divetex.innerHTML += r.textContent;
  divetex.style.fontWeight = "lighter";
  divetex.style.marginTop = "10px"
  divetex.style.marginLeft = "10px"
  divetex.style.marginRight = "10px"
  divetex.style.marginBottom = "10px"
  divetex.style.overflowY= "scroll";
  divetex.setAttribute("id", ideen);

  totaldiv.appendChild(diveit);
  totaldiv.appendChild(divetex);
  notes.insertBefore(totaldiv, notes.childNodes[0]);
  }
}
