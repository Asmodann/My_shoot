function GameMaster_(Player) {
	this.bullets = Player.shoots;
	this.canvas = Player.canvas;
	this.spawnArea = [
		{"x": (this.canvas.clientWidth / 5) * 0},
		{"x": (this.canvas.clientWidth / 5) * 1},
		{"x": (this.canvas.clientWidth / 5) * 2},
		{"x": (this.canvas.clientWidth / 5) * 3},
		{"x": (this.canvas.clientWidth / 5) * 4},
		{"x": (this.canvas.clientWidth / 5) * 5}];
	this.ctx = this.canvas.getContext("2d");
	this.enemies = [];

	this.spawnTime = 1000; // In ms
	this.spawning = this.spawnTime;
}

GameMaster_.prototype.draw = function(Player) {
	for (var i = 0; i < this.bullets.length; i++) {
		var bullet = this.bullets[i];
		var x = bullet.x;
		var y = bullet.y;

		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.fillStyle = bullet.color;
		this.ctx.fillRect(x, y, bullet.width, bullet.height);
		bullet.move();
		bullet.collision(this.enemies);
		if (bullet.y < -10 || bullet.alive === false) {
			Player.shoots.splice(i, 1);
		}
	}
	for (var i = 0; i < this.enemies.length; i++) {
		var enemy = this.enemies[i];
		var x = enemy.x;
		var y = enemy.y;

		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.fillStyle = enemy.color;
		this.ctx.fillRect(x, y, enemy.width, enemy.height);
		enemy.move();
		if (enemy.hp <= 0) {
			Player.score += enemy.score;
		}
		if (enemy.y > this.canvas.clientHeight + 50 || enemy.hp <= 0) {
			this.enemies.splice(i, 1);
		}
	}
};

GameMaster_.prototype.setEnemy = function(time) {
	this.spawning -= time;

	if (this.spawning <= 0) {
		if (this.spawnTime > 400) {
			this.spawnTime -= 5;
		}
		this.spawning = this.spawnTime;
		var length = this.enemies.length;
		for (var i = 0; i < length + 1; i++) {
			if (this.enemies[i] === undefined) {
				var rand = Math.floor(Math.random() * 3) + 1;
				if (rand <= 2) {
					this.enemies[i] = new EnemyLight_(this.canvas, this);
				} else if (rand === 3) {
					this.enemies[i] = new EnemyMedium_(this.canvas, this);
				}
				
			}
		}
		
	}
};