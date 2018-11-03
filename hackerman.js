document.addEventListener("keypress", hackerman);
function hackerman(){
  let node = document.createTextNode("Hippity hoppity, get off my property!");
  let p = document.createElement("p");
  p.appendChild(node);
  document.body.appendChild(p);
}
