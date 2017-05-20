include("Player");
include("Bullet");
include("GameMaster");
include("EnemyLight");
include("EnemyMedium");

window.addEventListener("load", function() {
  var canvas = document.getElementsByTagName("canvas")[0];
  var remake = document.getElementById("remake");
  var ctx = canvas.getContext("2d");
  var refreshTime = 30; // In ms

  var Player = new Player_("Bernard", canvas);
  var GameMaster = new GameMaster_(Player);

  document.addEventListener("keydown", function(ev) {
    Player.moving(ev.keyCode);
  });
  document.addEventListener("keypress", function(ev) {
    Player.shooting(ev.keyCode);
  });

  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    GameMaster.draw(Player);

    Player.draw();
    Player.reload(refreshTime);
    GameMaster.setEnemy(refreshTime);
    Player.gui();
  }, refreshTime);
  
});


