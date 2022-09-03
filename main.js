img="";
status="";
object=[];
input="";

function preload(){

}
function setup(){

     canvas=createCanvas(380,380);
     canvas.center();

     video=createCapture(VIDEO);
     video.size(380,380);
     video.hide();
    
}

function start(){
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
    input=document.getElementById("input").value;
}

function draw(){
    
    image(video,0,0,380,380);
if(status !=""){
    objectdetector.detect(video,gotresults);
  
   
   
    for(i=0;i<object.length;i++){
        if(object[i].label==input){ 
           document.getElementById("status").innerHTML="Status:Object Detected";
           document.getElementById("object-found").innerHTML=input+" is found";
           video.stop();
           synth=window.speechSynthesis;
    
           utterThis= new SpeechSynthesisUtterance("object is found");
           synth.speak(utterThis);
        }
    
        else{
           document.getElementById("status").innerHTML="Status:Object not Detected";
           document.getElementById("object-found").innerHTML=input+" is not found ";
        
            }
    }
    
  }
   
}


function modelLoaded(){
    console.log("model loaded");
    status=true;
}

function gotresults(error,results){
    if(error){
        console.log(error)
    }
    console.log(results);
    object=results;
}