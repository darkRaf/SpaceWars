import { common } from './common.js';
import { AMMO } from './data/ammo.js';

export class Shot {
  constructor(spaceship) {
    this.spaceship = spaceship;
    this.ctx = this.spaceship.canvas.ctx;

    this.x = spaceship.x + 20;
    this.y = spaceship.y - 20;
    this.type;
    this.speed;
    this.power;

    this.setAttributesShot();
  }

  setAttributesShot() {
    this.type = this.spaceship.activeAmmo;

    const { speed, power } = AMMO[this.type -1];

    this.speed = speed;
    this.power = power;
  }

  render() {
    const { data } = AMMO[this.type - 1];

    this.moveShot();
    common.render(this, data);
  }

  moveShot() {
    const shotsArr = this.spaceship.game.shots;

    this.y -= this.speed;
    if (this.y < -10) shotsArr.splice(shotsArr.indexOf(this), 1);
  }
}
