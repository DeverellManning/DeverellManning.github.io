function randBG(){

var nm1=["pexels-aj-povey-216076.jpg", "pexels-markus-spiske-113338.jpg", "pexels-markus-spiske-138903.jpg", "pexels-pixabay-158223.jpg"];

var rnd=Math.floor(Math.random()*nm1.length);

var url=nm1[rnd];
  

var element=document.createElement("div");


element.appendChild(document.createTextNode(names));
  

document.getElementById("output").appendChild(element);




document.body.style.background = "#D0E4F5 url('deverellmanning.github.io/Assets/Backgrounds/" + url + "') no-repeat fixed 50% 50%;";
}
