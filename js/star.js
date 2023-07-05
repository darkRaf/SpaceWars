import { CONSTANS } from './data/constans.js';
import { STARS } from './data/stars.js';
import { common } from './common.js';

const { MARGIN_CANVAS } = CONSTANS;

export class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.ctx;

    this.x = common.randomResult(MARGIN_CANVAS, canvas.width);
    this.y = common.randomResult(10, canvas.height);
    this.radius = common.randomResult(0, STARS.RADIUS.length - 1, STARS.RADIUS);
    this.speed = common.randomResult(0, STARS.SPEED.length - 1, STARS.SPEED);
    this.light = common.randomResult(0, STARS.LIGHT.length - 1, STARS.LIGHT);
  }

  render() {
    this.move();

    this.ctx.beginPath();
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = this.light;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

  move() {
    this.y += this.speed;

    if (this.y > this.canvas.height) {
      this.x = common.randomResult(10, this.canvas.width);
      this.y = -3;
    }
  }
}
