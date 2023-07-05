import { common } from './common.js';

export class Radar {
  constructor(game) {
    this.game = game;
    this.ctx = document.querySelector('[data-canvas-radar]').getContext('2d');
  }

  render() {

    if (!this.game.enemies.length) return;

    const data = this.game.enemies.map(enemy => {
      const { x, y } = enemy;

      const cords = [...this.calculateCords(x, y), 5];

      return {
        method: 'arc',
        fill: true,
        color: 'red',
        cords,
      };
    });

    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    common.render(this, data);
  }

  calculateCords(oldX, oldY) {
    const x = Math.round((oldX * 246) / this.game.canvas.width);
    const y = Math.round((oldY * 100) / this.game.canvas.height) + 5;

    return [x, y];
  }
}
