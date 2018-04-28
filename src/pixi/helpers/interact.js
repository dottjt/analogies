

window.addEventListener("click", function() {
  console.log("fire");
  for(let i = 0; i < 200; i++) {
    normalBrain.container.children[i].tint = "0xffffff";
  }

}, false);
