function EnemyLight_(canvas, GameMaster) {
	this.width = 50;
	this.height = 50;
	this.score = 1;
	this.moveSpeed = 5.0;
	this.hp = 1;
	this.rand = Math.floor(Math.random() * GameMaster.spawnArea.length);
	this.x = GameMaster.spawnArea[this.rand].x + this.width;
	this.y = 0 - this.height;

	// ---- Canvas info
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.color = "rgb(0,0,255)";
}

EnemyLight_.prototype.move = function() {
	this.y += this.moveSpeed;
};

EnemyLight_.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(this.x, this.y);
	this.fillStyle = this.color;
	this.fillRect(this.x, this.y, this.width, this.height);
};