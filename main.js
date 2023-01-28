song_1 = "";
song_2 = "";

song_1_status = "";
song_2_status = "";

function preload()
{
    song_1 = loadSound("turip ip ip.mp3");
    song_2 = loadSound("Wenomechainsama.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWrist = 0;

leftWristX = 0;
leftWristY = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw()
{
    image(video, 0, 0, 600, 500);
    song_1_status = song_1.isPlaying()
    song_2_status = song_2.isPlaying()
    fill("087CF0");
    stroke("00FFC9");

    if(scoreRightWrist > 0.2)
    {
        console.log("Wenomechainsama");
        circle(rightWristX, rightWristY, 20);
        song_2.stop();

        if(song_1_status == false)
        {
            song_1.play();
            document.getElementById("song").innerHTML = "Reproduciendo : Turip ip ip"
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        console.log("TURIP IP IP IP");
        circle(leftWristX, leftWristY, 20);
        song_1.stop();

        if(song_2_status == false)
        {
            song_2.play();
            document.getElementById("song").innerHTML = "Reproduciendo : Wenomechainsama"
        }
    }
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}