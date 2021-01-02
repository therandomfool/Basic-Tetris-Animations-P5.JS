grid = [];
scl = 25;
w = 250;
h = 500;
s = 20;
let c,r;
let q;
let p,score;
let morelines, fourlines, threelines, twolines, oneline;
let gameOver;

// function preload() {
//   hit = loadSound('hit.mp3'); 
// }

function setup() {
  createCanvas(w,h);
  colorMode(HSL,360,100,100,1);
  rectMode(CORNER);
  c = floor(width/scl);
  r = floor(height/scl);
  q = new Quatra();  
  score = 0;
  gameOver = false;
  
  let k =0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      grid[k] = [0,0,0,0];
      k++
    }
  }
  
  // hit.setVolume(0.1);
  
  p = createP();
  p.style('font-size', '20px');
  p.style('color', 'white');
  // morelines = loadSound('moreLines.mp3'); 
  // fourlines = loadSound('4lines.mp3'); 
  // threelines = loadSound('3lines.mp3'); 
  // twolines = loadSound('2lines.mp3'); 
  // oneline = loadSound('1line.mp3'); 
}

function draw() {
  background(30,10,60,1);
  p.html('Score ' + score);
  noStroke();
    
  let k = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      fill(grid[k][0],grid[k][1],grid[k][2],grid[k][3]);
      k++;
      rect(j*scl,i*scl,scl,scl); 
    }
  }
  
  
  removeLine();
  isGameOver();
  
  if(!gameOver){
    q.show();
    q.update();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    q.rotLeft();
  } else if (keyCode === DOWN_ARROW) {
    q.rotRight();
  } else if (keyCode === LEFT_ARROW) {
    q.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    q.move(1);
  } else if (keyCode === 32) { //spacebar
    q.moveDown();
  }
}

function removeLine() {
  let lines = 0;
  for (let i = r-1; i >= 0; i--) {
    let blockCounter = 0;
    for (let j = 0; j < c; j++) { 
      if (alpha(grid[i*c+j]) == 0) {
        j += c+1
      } else if (alpha(grid[i*c+j]) > 0) {
        blockCounter += 1;
        if (blockCounter == c){
          score += c;
          lines += 1;
          for (let y = i; y > 0; y--) {
            for (let x = 0; x < c; x++) {
              grid[y*c+x] = grid[(y-1)*c+x]
            }
          }
          checkSpeed();
        }
      }
    }
  }
  // playSound(lines);
}

function checkSpeed() {
  if(score > 0 && score%(c*5) == 0) {
    s -= 1;
    constrain(s,0,100);
  }
}

// function playSound(lines) {
//   if (lines >= 5) {
//       morelines.play();
//   } else if (lines == 4) {
//       fourlines.play();
//   } else if (lines == 3) {
//       threelines.play();
//   } else if (lines == 2) {
//       twolines.play();
//   } else if (lines == 1) {
//       oneline.play();
//   }
// }

function isGameOver() {
  for (let i = 0; i <= c; i++) {
     if (alpha(grid[i]) > 0) {
       console.log('game over');
       gameOver = true;
     }
  }
  
}