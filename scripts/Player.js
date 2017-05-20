function Player_(name, canvas) {
	// ---- Player info
	this.name = name;
	this.width = 40;
	this.height = 40;
	this.moveSpeed = 30.0;
	this.lives = 3;
	this.score = 0;
	this.maxAmmo = 20;
	this.ammo = this.maxAmmo;
	this.ammo_type = 0;
	this.keyboard = {"LEFT": 37, "RIGHT": 39, "SPACE": 32, "RELOAD": 82};
	this.ammo_damage = [1, 2];
	this.shoots = [];
	this.time = 0;

	// ---- Canvas info
	this.color = "rgb(175,175,175)";
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");

	// ---- Starting Position
	this.x = (canvas.clientWidth / 2) - (this.width / 2);
	this.y = (canvas.clientHeight) - (this.height + 5);

	// ---- Time
	this.reloadTime = 2000; // In ms - Here 1 sec
	this.actualReloadTime = this.reloadTime;
	this.seconds = 0;
	this.minutes = 0;

	// --- Boolean
	this.is_reloading = false;
}

Player_.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(this.x, this.y)
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(this.x, this.y, this.width, this.height);
	this.ctx.closePath();
}
Player_.prototype.moving = function(key) {
	switch (key) {
		case this.keyboard.LEFT:
			this.x -= this.moveSpeed;
			break;
		case this.keyboard.RIGHT:
			this.x += this.moveSpeed;
			break;		case this.keyboard.RELOAD:
			this.is_reloading = true;
			break;
	}
};
Player_.prototype.shooting = function(key) {
	switch (key) {
		case this.keyboard.SPACE:
			this.add_shoot();
			break;
	}
};
Player_.prototype.reload = function(time) {
	this.time += time;
	if (this.ammo === 0 && this.is_reloading === false) {
		this.is_reloading = true;
	}
	if (this.is_reloading === false) {
		return false;
	}
	this.actualReloadTime -= time;
	if (this.actualReloadTime <= 0) {
		this.ammo = this.maxAmmo;
		this.actualReloadTime = this.reloadTime;
		this.is_reloading = false;
	}
};
Player_.prototype.gui = function() {
	this.ctx.font = "12px Arial";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText("Lives: " + this.lives, 8, 20);
    this.ctx.fillText("Score: " + this.score, 8, 40);
    this.ctx.fillText("Ammo: " + this.ammo + "/" + this.maxAmmo, 8, 60);
    if (this.is_reloading) {
    	this.ctx.fillText("Reloading: " + (this.actualReloadTime / 1000)+ "s", 8, 80);
    }
    this.ctx.fillStyle = "rgb(75,150,168)";
    this.ctx.fillText(this.clock(), 8, this.canvas.clientHeight - 80);
    this.ctx.fillText("Use arrows", 8, this.canvas.clientHeight - 40);
    this.ctx.fillText("Space to shoot", 8, this.canvas.clientHeight - 20);
};
Player_.prototype.add_shoot = function() {
	if (this.ammo <= 0) {
		this.is_reloading = true;
		return false;
	}

	var length = this.shoots.length;
	for (var i = 0; i < length + 1; i++) {
		if (this.shoots[i] === undefined) {
			this.shoots[i] = new Bullet_(this, this.ammo_damage[this.ammo_type]);
		}
	}
	this.ammo -= 1;
};
Player_.prototype.clock = function() {
	this.seconds = Math.floor(this.time / 1000) % 60;
	if (this.seconds === 0 && this.time > 1000) {
		this.minutes = Math.floor(this.time / 60000);
	}
	clock = this.minutes + "m " + this.seconds + "s";
	return clock;
};