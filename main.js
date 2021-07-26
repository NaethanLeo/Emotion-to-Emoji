prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 200
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='image' src='"+data_uri+"'>"
    });
}
console.log("ml5 version =", mlg5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/O9Dw_ejBg/model.json", modelLoaded);

function modelLoaded(){
    console.log("model Loaded")
}

function speak(){
    synth = window.speechSynthesis;
    p1speak = "the first prediction is " + prediction1;
    p2speak = "and the second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(p1speak + p2speak);
    synth.speak(utterThis); 
}

function check(){
    image = document.getElementById("image");
    classifier.classify(image, result);
}

function result(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion").innerHTML = results[0].label;
        document.getElementById("result_emotion2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }

        
        
        if(results[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548";
        }
        
    }
    
}