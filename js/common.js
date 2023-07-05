// https://opengameart.org/content/frozen-jam-seamless-loop
// tgfcoder-FrozenJam-SeamlessLoop.mp3

// https://opengameart.org/content/brave-space-explorers
// Brave Space Explorers.mp3

// easy, medium, hard, extreme


export {common}

const common = {
  randomResult(min, max, data = null) {
    const num = Math.round(Math.random() * (max - min) + min);

    if (data) {
      return data[num];
    }

    return num;
  },

  render(obj, data, powerLine = false) {
    for (const d of data) {
      const {method, fill, stroke, lineWidth, color, colorLine, cords} = d;

      if (powerLine) this.renderPoweLine(obj);

      obj.ctx.beginPath();
      obj.ctx.lineCap = 'round';
      obj.ctx.lineJoin = 'round';
      obj.ctx.lineWidth = lineWidth ?? 1;

      if (fill) obj.ctx.fillStyle = color;
      if (stroke) obj.ctx.strokeStyle = colorLine ?? color;

      if (obj.hit || obj.blur) this.blur(obj, color)

      if (obj.isRotate) this.renderRotate(obj);

      if (method === 'lineTo') this.lineTo(obj, cords);
      if (method === 'arc') this.arc(obj, cords);
      if (method === 'font') this.font(obj, d);

      if (fill) obj.ctx.fill();
      if (stroke) obj.ctx.stroke();

      if (obj.isRotate) obj.ctx.setTransform(1, 0, 0, 1, 0, 0);
      obj.ctx.shadowBlur = 0;
    }
  },

  renderPoweLine(obj) {
    const px = (obj.power * 40) / obj.fullPower;
    const percent = (px / 40) * 100;

    obj.ctx.beginPath();
    obj.ctx.lineWidth = 0.5;
    obj.ctx.fillStyle = 'rgba(78, 108, 241, 0.4)';
    obj.ctx.shadowBlur = 6;
    obj.ctx.shadowColor = 'rgb(78, 108, 241)';

    if (percent < 50) obj.ctx.fillStyle = 'rgba(255, 238, 49, 0.4)';
    if (percent < 30) obj.ctx.fillStyle = 'rgba(221, 45, 45, 0.4)';

    obj.ctx.rect(obj.x - 20, obj.y - 30, px, 4);
    obj.ctx.fill();
    obj.ctx.shadowBlur = 0;
  },

  renderRotate(obj) {
    if (Date.now() > obj.lastTime + obj.timeDelay) {
      obj.rotate += 0.01;
      obj.lastTime = Date.now();
    }

    obj.ctx.translate(obj.x, obj.y);
    obj.ctx.rotate(obj.rotate * Math.PI);
    obj.ctx.translate(-obj.x, -obj.y);
  },

  blur(obj, color) {
    obj.ctx.shadowBlur = obj.blur ?? 20;
    obj.ctx.shadowColor = color;
  },

  lineTo(obj, cords) {
    for (const cord of cords) {
      const [cx, cy] = cord;
      obj.ctx.lineTo(cx + obj.x, cy + obj.y);
    }
  },

  arc(obj, cords) {
    const [x, y, r] = cords;
    obj.ctx.arc(x, y, r, 0, 2 * Math.PI);
  },

  font(obj, data) {
    const {text, font, color, textAlign, cords} = data;
    const [x, y] = cords;
    obj.ctx.font = font;
    obj.ctx.textAlign = textAlign;
    obj.ctx.fillStyle = color;
    obj.ctx.fillText(text, x, y + 5);
  },
};