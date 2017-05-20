function include(file) {
  var script = document.createElement("script");
  script.src = "scripts/" + file + ".js";
  document.head.appendChild(script);
}