function zoom(imgs) {
  console.log("zoom")
  // Get the expanded image
  var expandImg = document.getElementById("expandedImg");
  // Get the image text
  var imgText = document.getElementById("imgtext");
  // Use the same src in the expanded image as the image being clicked on from the grid
  expandImg.src = imgs.src;
  // Use the value of the alt attribute of the clickable image as text inside the expanded image
  imgText.innerHTML = imgs.alt;
  // Show the container element (hidden with CSS)
  expandImg.parentElement.style.display = "block";
  }


function Zoom2(itz) {

  eDisc = document.getElementById("imgtext");
  eImage = document.getElementById("expandedImg");

  console.log("Veiwing Image " + itz + ".");

  var imgd = document.getElementById(itz);
  
  console.log(itz);

  let name = "404.jpg";
  name = imgd.childNodes.item(1).src.replace("/Small/", "/");

  let disc = imgd.getElementsByTagName("div").item(0)
  if (disc != null) { disc = imgd.getElementsByTagName("div").item(0).innerHTML };

  
  eImage.src = name;
  eDisc.innerHTML = disc;

  eImage.parentElement.style.display = "block";
  eImage.parentElement.style.opacity="100%";
}

function Close(obj) {
  obj.parentElement.style.display='none';
  obj.parentElement.style.opacity="0%";
}
