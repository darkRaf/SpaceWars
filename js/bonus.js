import { common } from './common.js';
import { CONSTANS } from './data/constans.js';
import { AMMO } from './data/ammo.js';

const { MARGIN_CANVAS } = CONSTANS;

export class Bonus {
  constructor(game) {
    this.game = game;
    this.ctx = this.game.canvas.ctx;
    this.x = common.randomResult(MARGIN_CANVAS, game.canvas.width - MARGIN_CANVAS);
    this.y = -30;
    this.radius = 30;
    this.speed = 0.5;

    this.ammunition = common.randomResult(1, AMMO.length);

    this.blur = 5;
    this.minBlur = 2;
    this.maxBlur = 20;
    this.blurStep = 1;

    this.lastTime = 0;
    this.delay = 40;

    this.color = { h: 50, s: 50, l: 50, a: 1 };
    this.data = [];

    this.createBonus();
  }

  createBonus() {
    this.data.push({
      method: 'arc',
      lineWidth: 4,
      fill: false,
      stroke: true,
      color: `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, ${this.color.a})`,
      cords: [this.x, this.y, this.radius],
    });

    this.data.push({
      method: 'font',
      text: 'Ammo',
      font: '16px Arial',
      color: '#ddd',
      textAlign: 'center',
      cords: [this.x, this.y],
    });
  };

  render() {
    this.move();

    common.render(this, this.data);

    if (Date.now() > this.lastTime + this.delay) {
      if (this.blur === this.maxBlur) this.blurStep = -1;
      if (this.blur < this.minBlur) this.blurStep = 1;
      this.blur += this.blurStep;
      this.lastTime = Date.now();
    }
  }

  move() {
    const bonusArr = this.game.bonuses;

    this.color.h++;
    this.data[0].cords = [this.x, (this.y += this.speed), this.radius];
    this.data[0].color = `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, ${this.color.a})`;
    this.data[1].cords = [this.x, (this.y += this.speed)];

    if (this.y > this.game.canvas.height + 30) {
      bonusArr.splice(bonusArr.indexOf(this), 1);
      this.game.lastBonusTime = Date.now();
    }
  }
}
