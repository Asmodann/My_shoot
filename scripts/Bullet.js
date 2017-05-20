function Bullet_(Player, damage) {
	this.width = 4;
	this.height = 8;
	this.moveSpeed = 15.0;
	this.Shooter = Player;
	this.damage = damage,
	this.alive = true;
	this.x = this.Shooter.x + (this.Shooter.width / 2);
	this.y = this.Shooter.y - this.height;

	// ---- Canvas info
	this.canvas = this.Shooter.canvas;
	this.ctx = this.canvas.getContext("2d");
	if (damage === 1) {
		this.color = "rgb(255,0,0)";
	} else if (damage === 2) {
		this.color = "rgb(0,255,0)";
	}
	
}

Bullet_.prototype.move = function() {
	this.y -= this.moveSpeed;
};

Bullet_.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(this.x, this.y);
	this.fillStyle = this.color;
	this.fillRect(this.x, this.y, this.width, this.height);
};

Bullet_.prototype.collision = function(targets, Player) {
	for (var i = 0; i < targets.length; i++) {
		var target = targets[i];
		if (this.x >= target.x && this.x <= target.x + target.width) {
			if (this.y >= target.y && this.y <= target.y + target.height) {
				targets[i].hp -= this.damage;
				this.alive = false;
			}
		}
	}
};