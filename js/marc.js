function SpriteSheet(path, frameWidth, frameHeight) {
  this.image = new Image();
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
 
  // calculate the number of frames in a row after the image loads
  var self = this;
  this.image.onload = function() {
    self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
  };
 
  this.image.src = path;
}

function Animation(spritesheet, frameSpeed, startFrame, endFrame) {
  var animationSequence = [];  // array holding the order of the animation
  var currentFrame = 0;        // the current frame to draw
  var counter = 0;             // keep track of frame rate
 
  // create the sequence of frame numbers for the animation
  for(var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
    animationSequence.push(frameNumber);
 
  // Update the animation
  this.update = function() {
 
    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % animationSequence.length;
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
  };
 
  // draw the current frame
  this.draw = function(x, y) {
    // get the row and col of the frame
    var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
    var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
 
    ctx.drawImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
}

function animate() {
   requestAnimFrame( animate );
   ctx.clearRect(0, 0, 150, 150);
 
   walk.update();
   walk.draw(200, 200);
}

function moveup(){
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

document.onkeydown = function(evt) 
{
    evt = evt || window.event;
    if (evt.keyCode == 87)
    {
        alert("w");
    }

    if (evt.keyCode == 83)
    {
        alert("s");
    }

    if (evt.keyCode == 65)
    {
        alert("a");
    }

    if (evt.keyCode == 68) 
    {
        alert("d");
    }

    if (evt.keyCode == 32) 
    {
        adventurer = new SpriteSheet('../resources/images/tiles.png', 100, 100);
        walk = new Animation(adventurer, 3, 0, 15);
        animate()
    }

    //click for actives have it follow mouse
};