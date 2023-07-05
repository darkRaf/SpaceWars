import { CONSTANS } from './data/constans.js';
import { ENEMY } from './data/enemy.js';
import { common } from './common.js';
import { ShotEnemy } from './shotEnemy.js';

const { MARGIN_CANVAS } = CONSTANS;

export class Enemy {
  constructor(game, type) {
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = game.canvas.ctx;

    this.x = common.randomResult(MARGIN_CANVAS, game.canvas.width - MARGIN_CANVAS);
    this.y = -40;
    this.type = type;
    this.power;
    this.fullPower;
    this.points;
    this.radius;
    this.speed;
    this.isRotate;
    this.isShot;

    this.rotate = Math.random();
    this.timeStart = Date.now();
    this.timeDelay = 40;
    this.lastTime;
    this.hit = false;
    this.hitTime = Date.now();

    this.setAttributes();
  }

  setAttributes() {
    const { radius, speed, power, points, rotate, shot } = ENEMY[this.type - 1].enemy;
    this.power = power;
    this.fullPower = power;
    this.points = points;
    this.radius = radius;
    this.speed = speed[Math.round(Math.random() * (speed.length - 1))];
    this.isRotate = rotate;
    this.isShot = shot;

    this.hit = false;
    this.lastTime = 0;
  }

  render() {
    this.addShot()

    const data = ENEMY[this.type - 1].enemy.data;
    this.moveEnemy();

    if (Date.now() > this.hitTime + 2 * this.timeDelay) this.hit = false;

    common.render(this, data, true);
  }

  moveEnemy() {
    const enemiesArr = this.game.enemies;

    this.y += this.speed;
    if (this.y > this.canvas.height + 10) {
      enemiesArr.splice(enemiesArr.indexOf(this), 1);
      this.game.enemiesLeft--;
      this.game.updateScoreAndEnemy();
    }
  }

  addShot() {
    const maxTime = 1000 * this.game.mode;
    if (this.isShot && common.randomResult(0, maxTime) === 1 && this.y > 50) {
      this.game.enemiesShots.push(new ShotEnemy(this));
    }
  }

  shotEnemy() {
    this.game.enemiesShots.forEach(shot => {
      shot.render();
    });
  }
}
