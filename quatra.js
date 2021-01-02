shapes = [[
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ],
       [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
       [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ],
       [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
       [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
       [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ],
       [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ]]

colors = [50,220,10,'g','w','g','w']


class Quatra {

constructor() {
  this.i = -2;
  this.j = floor(c / 2 - 2);
  // this.s = floor(random(0,7));  
  this.r = floor(random(0,7));    
  this.shape = shapes[this.r];  
  if (colors[this.r] == 'g') {
    this.clr = color(10,10,10,1);
  } else if (colors[this.r] == 'w') {
    this.clr = color(0,0,100,1);
  } else {
    this.clr = color(colors[this.r],90,50,1);
  } 
  this.speed = s;
  this.speedcounter = 0;
}

show() {
  fill(this.clr);
  noStroke();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.shape[i][j] == 1) {
        rect((this.j + j) * scl, (this.i + i) * scl, scl, scl);
      }
    }
  }
}

update() {
  if(this.speedcounter == this.speed) {
  this.i += 1;
  this.stopMoving('vert',1);
  this.speedcounter = 0;
  }
  this.speedcounter ++;
}

stopMoving(dir,vel){
  if (this.hasHit()) {      
    // hit.play();
    if (dir == 'vert') {this.i -= vel};
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let indi = this.i + i;
        let indj = this.j + j;
        let index = indi * c + indj;
        if (this.shape[i][j] == 1) {
          grid[index] = [hue(this.clr),
                         saturation(this.clr),
                         lightness(this.clr),
                         alpha(this.clr)];
        }
      }
    }
    q = new Quatra(); 
    return true;
  } 
}

rotLeft() {
  let newShape = [
    [],
    [],
    [],
    []
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newShape[j][i] = this.shape[i][3 - j];
    }
  }
  this.shape = newShape;
  let mx = this.getMax();
  if (this.j + mx[0] >= c-1) {
      this.j -= 1;
  } else if (this.j + mx[2] <= 0) {
     this.j += 1; 
  }
}

rotRight() {
  let newShape = [
    [],
    [],
    [],
    []
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newShape[j][i] = this.shape[3 - i][j];
    }
  }
  this.shape = newShape;
  let mx = this.getMax();
  if (this.j + mx[0] >= c-1) {
      this.j -= 1;
  } else if (this.j + mx[2] <= 0) {
     this.j += 1; 
  }
}



move(m) {
  let mx = this.getMax();
  if (m == 1) {
    if (this.j + mx[0] >= c-1) {
      return 
    } else {
        this.j += m
        if (this.hasHit()) {
          this.j -= m
        }
      }
  } else if (m == -1) {
    if (this.j + mx[2] <= 0) {
      return 
    } else {
        this.j += m
        if (this.hasHit()) {
          this.j -= m
        }
    }
  }
}
    
moveDown(){
  let d = this.getDistBottom()
  this.i = this.i + d;
}
    
getMax() {
  let left = 4;
  let right = -1;
  let down = 4;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(this.shape[i][j] == 1){
        left = min(left,j);
        right = max(right,j);
        down = max(down,i);
      }
    }
  }
  return [right,down,left];
}
    
getDistBottom() {
  let y = this.getMax()
  let d = r-(this.i+y[1]);
  for (let j = y[2]+this.j ; j <= y[0]+this.j; j++) {
    for (let i = y[1]+this.i ; i < r ; i++) {  
      if(alpha(grid[i*c+j]) > 0) {
        d = min(d,(i-(y[1]+this.i)));
      }
    }
  }
return d;    
}

hasHit() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(this.shape[i][j] == 1){
        let index = (this.i + i)*c + this.j + j;
        if (index < 0) {
          //do nothing
        }else if (index > c*r-1){
             return true; 
        } else if (alpha(grid[index]) > 0) {
            return true;
        }
      }
    }
  }    
  return false; 
}  

}