import { common } from './common.js';

export class ShotEnemy {
  constructor(enemy) {
    this.enemy = enemy;
    this.game = enemy.game;
    this.ctx = this.enemy.canvas.ctx;

    this.x = enemy.x;
    this.y = enemy.y;
    this.speed = 2.2;
    // this.power;
  }

  render() {
    const data = [{
      method: 'lineTo',
      fill: false,
      stroke: true,
      color: '#36a1ff',
      cords: [
        [0, 25],
        [0, 5],
      ],
    }]

    this.moveShot();
    common.render(this, data);
  }

  moveShot() {
    const enemiesShots = this.game.enemiesShots;

    this.y += this.speed;
    if (this.y > this.enemy.canvas.height) enemiesShots.splice(enemiesShots.indexOf(this), 1);
  }
}