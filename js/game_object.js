exports.GameObject = function(x, y, z)
{
	this.pos_x = x;
	this.pos_y = y;
	this.pos_z = z;

	this.vel_x = 0;
	this.vel_y = 0;
	this.vel_z = 0;
}

exports.GameObject.prototype.getPosition = function()
{
	return {x: this.pos_x, y: this.pos_y, z: this.pos_z};
}

exports.GameObject.prototype.getVelocity = function() 
{
	return {x: vel_x, y: vel_y, z: vel_z};
}
