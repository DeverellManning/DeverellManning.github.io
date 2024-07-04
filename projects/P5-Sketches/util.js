/*
1 | 0
0 |-1
-1| 0
0 | 1
*/

function flipx(x, y) {
  x = y;
  return x;
}
function flipy(x, y) {
  y = -x;
  return y;
}


function flopx(x, y) {
  x = -y;
  return x;
}
function flopy(x, y) {
  y = x;
  return y;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function DR() {
  return floor(random(vasX/4))
}

function CR() {
  return floor(random(256/6))
}

function D6() {
  return floor(random(0,6))
}

function rbool() {
  return random([true, false])
}

function tr() {
	return random(10, 490)
}

function xr() {
	return random(-2, 2)
}

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getAngle(x,y) {
  return atan2(y,x);
}
function getDist(x,y) {
  return sqrt(sq(x)+sq(y));
}
function getX(A,d) {
  return cos(A)*d;
}
function getY(A,d) {
  return sin(A)*d;
}

