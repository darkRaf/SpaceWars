import { common } from './common.js';

export class Explosion {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.colors = [
      { h: 58, s: 100, l: 50, a: 0.8 },
      { h: 40, s: 100, l: 50, a: 0.8 },
      { h: 16, s: 100, l: 50, a: 0.8 },
      { h: 5, s: 100, l: 50, a: 0.8 },
    ];

    this.lastTime = 0;
    this.timeDelay = 30;

    this.data = [];
    this.hit = true;

    this.createRandomParameters();
  }

  createRandomParameters() {
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * 30 + (this.x - 15);
      const y = Math.random() * 30 + (this.y - 15);
      const r = Math.round(Math.random() * 20) + 10;
      const c = this.colors[Math.round(Math.random() * (this.colors.length - 1))];

      this.data.push({
        method: 'arc',
        fill: true,
        stroke: false,
        colorData: c,
        color: `hsla(${c.h}, ${c.s}%, ${c.l}%, ${c.a})`,
        cords: [x, y, r],
      });


    }
  }

  render() {
    if (!this.data.length) return;

    this.move();
    common.render(this, this.data);
  }

  move() {
    this.data.forEach(el => {
      if (Date.now() > this.lastTime + this.timeDelay) {
        el.colorData.l -= 0.2;
        el.colorData.a -= 0.05;
        el.r -= 0.2;
        el.color =`hsla(${el.colorData.h}, ${el.colorData.s}%, ${el.colorData.l}%, ${el.colorData.a})`;
      }

      el.cords.y += 1;

      if (el.colorData.l <= 10 || el.r < 1) this.data.splice(this.data.indexOf(el), 1);
    });

    if (Date.now() > this.lastTime + this.timeDelay) this.lastTime = Date.now();
  }
}
