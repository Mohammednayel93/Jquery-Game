$(document).ready(function() {
    var bird = $('#bird');
    var container = $('#container');
    var line = $('.line');
    var line1 = $('#line1');
    var line2 = $('#line2');
    var score = $('#score');
    var speedDiv = $('#speed');
    var btnRestart = $('#btnRestart');

    var check = $('#checkboxThreeInput');
    if (check.checked != true) {

        $('#song').html("");
    }
    if (check.checked == true) {
        $('#song').html('<iframe id="player" name="sound" type="audio/mp3" src="mouner2.MP3" autostart="true" hidden="true"></iframe>');
    }


    // width and height and css
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    // console.log(container_width)
    var bird_left = parseInt(bird.css('left'))
    var bird_height = parseInt(bird.height());
    //   console.log(bird_left)
    var line_declared_Position = parseInt(line.css('right'))
    var line_declared_Height = parseInt(line.css('height'))

    var speed = 7;
    // we declared var count to change line1 height by - and line2 height by + first time 
    //  scend tine to change line1  height by + and  line2 height by -
    var count = 0;
    // varables to change back ground Color
    var x, y, z;
    // play song in back ground

    //to check the bird is go up 
    var goUp = false;
    // to check the game is over
    var gameover = false;
    // to force to enter the function of incease scor only once when the bird enter between the two lines
    var scoreUpdated = false;
    // to check the game is pause
    var Pause = false;
    //Code Starts From Here ----------------------------------------------

    // we set this interval to var becouse we have to stop this interval when game is over
    var game = setInterval(function() {
        if (collision(bird, line1) || collision(bird, line2) || parseInt(bird.css("top")) <= 0 || parseInt(bird.css("top")) > container_height - bird_height) {
            clearInterval(game);
            gameover = true;
            $("#player").attr("src", "")
            $('#song').html("");
            $('#song').html('<iframe id="player" name="sound" type="audio/mp3" src="../game_over.MP3" autostart="true" hidden="true"></iframe>');

            btnRestart.slideDown("slow");
            btnRestart.css("visibility", "visible");



        } else {
            if (Pause === false) {
                var line_current_Position = parseInt(line.css('right'));
                // now we have to chcek line is out of the container
                if (line_current_Position > container_width) {

                    scoreUpdated = false;
                    var numRandom1 = Math.floor(Math.random() * 100);

                    var numRandom2 = Math.floor(Math.random() * 100);
                    if (count === 0) {
                        // this step to change height of line
                        line1.css("height", line_declared_Height - numRandom1);
                        line2.css("height", line_declared_Height + numRandom1);
                        count = 1;
                    } else {


                        line1.css("height", line_declared_Height + numRandom2);
                        line2.css("height", line_declared_Height - numRandom2);
                        count = 0;
                    }
                    line_current_Position = line_declared_Position;

                    // this step to bring line to his declared position
                    // change back ground Color
                    // x = Math.floor(Math.random() * 100);
                    // y = Math.floor(Math.random() * 100);
                    // z = Math.floor(Math.random() * 100);
                    // container.css("background-color", "rgb(" + x + "," + y + "," + z + ")")
                    // increasse Speed 
                    speed = speed + 1;
                    speedDiv.text(speed);

                }
                if (line_current_Position > container_width - bird_left) {
                    //$ Calculate Score
                    if (scoreUpdated === false) {
                        console.log(score.text());
                        score.text(parseInt(score.text()) + 1);
                        scoreUpdated = true;
                    }
                }

                // move the line 
                line.css("right", line_current_Position + speed);
                if (goUp === false) {
                    //move the bird down
                    goDown();
                }
            }

        }
    }, 40)
    var count = 1;
    $(document).on("keydown", function(e) {
        var key = e.keyCode;
        console.log(key);
        if (key === 38 && goUp === false && gameover === false && Pause === false) {
            goUp = setInterval(function() {
                // the value of goUp has been changed
                bird.css("top", parseInt(bird.css("top")) - 5)
            }, 40)
        }
        if (key == 32) {
            if (count % 2 != 0) {
                Pause = true;
            } else {
                Pause = false;

            }
            count++;
        }

    });
    $(document).on("keyup", function(e) {
        clearInterval(goUp);
        goUp = false;
    });

    function goDown() {
        if (Pause === false) {
            bird.css("top", parseInt(bird.css("top")) + 5)
        }
    }

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        }
        return true;
    }
    btnRestart.click(function() {
        location.reload();
    })


    // Code Ends Here ----------------------------------------------------
});

function checkFluency() {
    var check = $('#checkboxThreeInput');
    check.change(function() {
        if (this.checked != true) {
            // $("#player").attr("src", "")
            $('#song').html("");
        }
        if (this.checked == true) {
            $('#song').html(
                '<iframe id="player" name="sound" type="audio/mp3" src="../mouner2.MP3" autostart="true" hidden="true"></iframe>'
            )
        }
    });
}