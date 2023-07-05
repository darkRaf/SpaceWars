class Canvas {
  constructor() {
    this.ctx = document.querySelector('.canvas-game').getContext('2d');
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }
}

export const canvas = new Canvas();