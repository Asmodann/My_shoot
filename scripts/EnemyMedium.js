function EnemyMedium_(canvas, GameMaster) {
	this.width = 75;
	this.height = 75;
	this.score = 3;
	this.moveSpeed = 3.0;
	this.hp = 5;
	this.rand = Math.floor(Math.random() * GameMaster.spawnArea.length);
	this.x = GameMaster.spawnArea[this.rand].x + this.width;
	this.y = 0 - this.height;

	// ---- Canvas info
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.color = "rgb(0,150,150)";
}

EnemyMedium_.prototype.move = function() {
	this.y += this.moveSpeed;
};

EnemyMedium_.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(this.x, this.y);
	this.fillStyle = this.color;
	this.fillRect(this.x, this.y, this.width, this.height);
};