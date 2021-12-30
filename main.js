alarm = "";
status = "";
objects = "";
function preload() {  
    myvideo.hide();
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
   
}
function draw() {
    image(myvideo, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(myvideo, gotPosses);
        for (i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are : " + objects.length;
            fill(r, g, b);
            stroke(r, g, b);
            noFill();
            percent = floor(objects[i].confidence * 100);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

        }
    }

}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
   
}
function gotPosses(error, results) {
    if (error) {
        console.error(error);
    }

    console.log(results);
    objects = results;
}
