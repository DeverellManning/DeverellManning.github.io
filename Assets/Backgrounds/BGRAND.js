function randBG() {

var nm1=["pexels-aj-povey-216076.jpg", "pexels-markus-spiske-113338.jpg", "pexels-markus-spiske-138903.jpg", "pexels-pixabay-158223.jpg"];

var rnd=Math.floor(Math.random()*nm1.length);

var url=nm1[rnd];
  
alert(url);
  
  var t1="url('https://deverellmanning.github.io/Assets/Backgrounds/";
  var t2="')";
  var t3=t1.concat(url);
  var t4=t3.concat(t2);
  alert(t4);

  document.body.style.backgroundImage = t4; 
  
    alert(document.body.style.backgroundImage);
  
  
var element=document.createElement("div");


element.appendChild(document.createTextNode(names));
  

document.getElementById("output").appendChild(document.createTextNode(url));
}
