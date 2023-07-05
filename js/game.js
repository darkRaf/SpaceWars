import { common } from './common.js';
import { STARS } from './data/stars.js';
import { ENEMY } from './data/enemy.js';

import { canvas } from './canvas.js';
import { KeysInputs } from './keysInputs.js';
import { Star } from './star.js';
import { Spaceship } from './spaceship.js';
import { Enemy } from './enemy.js';
import { Explosion } from './explosion.js';
import { Bonus } from './bonus.js';
import { BackgroundAudio, ExplosionAudio, ShotAudio } from './audioEffect.js';
import { Settings } from './settings.js';
import { Cookie } from './cookie.js';

const { MUCH } = STARS;

class Game {
  constructor() {
    this.scoreBox = document.querySelector('.display-score-light');
    this.enemyCount = document.querySelector('.enemy-count');
    this.congratulationBox = document.querySelector('[data-congratulation]');

    this.canvas = canvas;
    this.keysInputs = new KeysInputs(this);

    this.pause = false;
    this.startGame = false;
    this.level = 0;
    this.lastLevel = ENEMY.length;
    this.score = 0;
    this.lifes = 3;
    this.mode = 1;

    //array to elements
    this.maxStars = Cookie.getCookieValue('stars') ?? MUCH;
    this.stars = [];
    this.shots = [];
    this.enemiesShots = [];
    this.enemies = [];
    this.explosions = [];
    this.bonuses = [];
    this.audios = [];
    this.spaceship;
    // enemies
    this.enemyQuantity = 0;
    this.maxEnemies;
    this.enemiesLeft;
    this.lastEnemyTime;
    this.delayNextEnemy;
    this.delayFirstEnemy;
    this.minRepeat;
    this.maxRepeat;
    // bonus
    this.delayNextBonus;
    this.delayFirstBonus;
    this.lastBonusTime;
    this.minTimeBonus;
    this.maxTimeBonus;
    this.stopBonus;

    this.lastAnimate = 0;
    this.fpsCount = 0;
    this.fps = 0;

    this.settings;
    this.idTimeOut;

    this.debug = false;
  }

  // debug
  debugGame(cords) {
    const { ex, ey, er } = cords;
    if (this.debug) {
      this.canvas.ctx.beginPath();
      this.canvas.ctx.lineWidth = 0.5;
      this.canvas.ctx.strokeStyle = 'red';
      this.canvas.ctx.arc(ex, ey, er, 0, 2 * Math.PI);
      this.canvas.ctx.stroke();
    }
  }

  //section create
  createStars() {
    this.stars = [];
    for (let i = 0; i < this.maxStars; i++) this.stars.push(new Star(this.canvas));
  }

  createSpeceship() {
    this.spaceship = new Spaceship(this);
    this.spaceship.setAmmo();
  }

  createEnemy() {
    if (
      this.startGame &&
      Date.now() > this.lastEnemyTime + this.delayNextEnemy + this.delayFirstEnemy &&
      this.enemyQuantity < this.maxEnemies
    ) {
      this.enemies.push(new Enemy(this, this.level));
      this.lastEnemyTime = Date.now();
      this.delayNextEnemy = common.randomResult(this.minRepeat, this.maxRepeat);
      this.delayFirstEnemy = 0;
      this.enemyQuantity++;
    }
  }

  createBonus() {
    if (
      this.startGame &&
      !this.stopBonus &&
      Date.now() > this.lastBonusTime + this.delayNextBonus + this.delayFirstBonus &&
      !this.bonuses.length
    ) {
      this.bonuses.push(new Bonus(this));
    }
  }

  //section animate
  animateStar() {
    this.stars.forEach(star => star.render());
    this.audios.forEach(audio => {
      audio.play();
      this.audios.splice(this.audios.indexOf(audio), 1);
    });
  }

  animateShots() {
    this.shots.forEach(shot => shot.render());
  }

  animateShotsEnemies() {
    this.enemiesShots.forEach(shot => shot.render());
  }

  animateEnemies() {
    this.enemies.forEach(enemy => enemy.render());
  }

  animateBonuses() {
    this.bonuses.forEach(bonus => bonus.render());
  }

  animateExplosion() {
    this.explosions.forEach(explosion => explosion.render());
  }

  // section collision
  collisionSpaceshipEnemy() {
    if (Date.now() > this.spaceship.lastShield + this.spaceship.shieldDelay)
      this.spaceship.shield = false;
      
    if (this.spaceship.shield) return;

    if (this.enemies.length && !this.spaceship.destroyed) {
      this.enemies.forEach(enemy => {
        const { x: ex, y: ey, radius: er } = enemy;

        if (
          this.calculateDistans(
            { sx: this.spaceship.x + 20, sy: this.spaceship.y + 24, sr: 18 },
            { ex, ey, er }
          )
        ) {
          this.explosionSpaceShip();
        }
      });
    }
  }

  collisionShotEnemy() {
    this.shots.forEach(shot => {
      if (this.enemies.length) {
        this.enemies.forEach(enemy => {
          const { x: sx, y: sy } = shot;
          const sr = 0;
          const { x: ex, y: ey, radius: er } = enemy;

          if (this.calculateDistans({ sx, sy, sr }, { ex, ey, er })) {
            enemy.power -= shot.power;
            enemy.hit = true;
            enemy.hitTime = Date.now();

            if (enemy.power <= 0) {
              this.explosions.push(new Explosion(this.canvas.ctx, enemy.x, enemy.y));
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
              this.score += enemy.points;
              this.enemiesLeft--;
              this.updateScoreAndEnemy();
              this.audios.push(
                new ExplosionAudio(this.spaceship.cockpit, this.settings.explosionVolume)
              );
            }

            this.shots.splice(this.shots.indexOf(shot), 1);
          }
        });
      }
    });
  }

  collisionSpaceshipAndShotEnemy() {
    if (this.spaceship.destroyed) return;

    this.enemiesShots.forEach(shot => {
      const { x: ex, y: ey } = shot;
      const er = 0;
      if (
        this.calculateDistans(
          { sx: this.spaceship.x + 20, sy: this.spaceship.y + 24, sr: 18 },
          { ex, ey, er }
        )
      ) {
        this.enemiesShots.splice(this.enemiesShots.indexOf(shot), 1);
        this.explosionSpaceShip();
      }
    });
  }

  collisionSpaceshipBonus() {
    if (this.bonuses.length && !this.spaceship.destroyed) {
      this.bonuses.forEach(bonus => {
        const { x: ex, y: ey, radius: er } = bonus;

        if (
          this.calculateDistans(
            { sx: this.spaceship.x + 20, sy: this.spaceship.y + 24, sr: 18 },
            { ex, ey, er }
          )
        ) {
          this.spaceship.addAmunition(bonus.ammunition);

          this.explosions.push(new Explosion(this.canvas.ctx, this.spaceship.x, this.spaceship.y));
          this.bonuses = [];
          this.lastBonusTime = Date.now();
          this.delayNextBonus = common.randomResult(this.minTimeBonus, this.maxTimeBonus);
        }
      });
    }
  }

  explosionSpaceShip() {
    this.lifes--;
    this.spaceship.destroyed = true;
    this.spaceship.shield = true;
    this.spaceship.lastShield = Date.now();
    this.explosions.push(new Explosion(this.canvas.ctx, this.spaceship.x, this.spaceship.y));
    this.audios.push(new ExplosionAudio(this.spaceship.cockpit, this.settings.explosionVolume));
    this.spaceship.cockpit.lifes[this.lifes].classList.add('destroyed');

    if (this.lifes === 0) {
      this.stopGame();
    } else {
      setTimeout(() => this.spaceship.setNextLife(), 2000);
    }
  }

  calculateDistans(shot, enemy) {
    const { sx, sy, sr } = shot;
    const { ex, ey, er } = enemy;

    if (this.debug) this.debugGame({ ex, ey, er });
    const result = Math.sqrt(Math.pow(sx - ex, 2) + Math.pow(sy - ey, 2));

    return result <= sr + er; // return true or false
  }

  checkGame() {
    if (this.startGame && this.enemiesLeft === 0 && !this.spaceship.autoPilot) {
      this.stopBonus = true;
      this.spaceship.autoPilot = true;
    }
  }

  // set
  setLevel() {
    this.level++;

    if (this.level > this.lastLevel) this.winner();

    if (this.startGame) {
      this.maxEnemies = ENEMY[this.level - 1].enemy.quantity;
      this.enemiesLeft = this.maxEnemies;
      this.enemyQuantity = 0;
      this.lastEnemyTime = Date.now();
      this.minRepeat = 500 * this.mode;
      this.maxRepeat = 5000 * this.mode;
      this.delayNextEnemy = 1000 * this.mode;
      this.delayFirstEnemy = 5000;
      this.enemyCount.textContent = this.enemiesLeft;

      this.lastBonusTime = Date.now();
      this.minTimeBonus = 30 * 1000;
      this.maxTimeBonus = 50 * 1000;
      this.delayNextBonus = 15 * 1000;
      this.delayFirstBonus = 10 * 1000;
      this.stopBonus = false;

      this.level === 1
        ? this.displayCongratulationBox(`Hello ${this.settings.userName}. Level: ${this.level}`)
        : this.displayCongratulationBox(`Level: ${this.level}`);
    }
  }

  setPause = (displayIfo = true) => {
    if (this.pause) {
      this.pause = false;
      if (displayIfo) this.displayCongratulationBox('Go !');
      this.animate();
    } else {
      this.pause = true;
      if (displayIfo) this.displayCongratulationBox('Pause');
    }
  };

  async winner() {
    await this.displayCongratulationBox('Congratulations you are the winner.');
    this.stopGame();
  }

  async displayCongratulationBox(text) {
    text = text ?? '';
    clearTimeout(this.idTimeOut);

    this.congratulationBox.classList.add('congratulation-active');

    await this.writeText(text, this.congratulationBox.firstElementChild);

    this.idTimeOut = setTimeout(() => this.clouseConfigurationaBox(), 3000);
  }

  writeText = (text, obj) => {
    return new Promise(async resolve => {
      let str = '';

      for (const char of text) {
        await this.sleep();
        str += char;
        obj.innerText = str + '_';
      }
      resolve();
    });
  };

  sleep() {
    return new Promise(resolve => setTimeout(resolve, 100));
  }

  clouseConfigurationaBox() {
    this.congratulationBox.classList.remove('congratulation-active');
  }

  displayFps() {
    const delta = (Date.now() - this.lastAnimate) / 1000;
    this.fpsCount++;

    if (this.fpsCount === 60) {
      this.fps = Math.round(1 / delta);
      this.fpsCount = 0;
    }

    this.canvas.ctx.font = '16px Arial';
    this.canvas.ctx.textAlign = 'left';
    this.canvas.ctx.fillStyle = '#aaa';
    this.canvas.ctx.fillText(`Fps: ${this.fps}/s`, 10, 20);
    this.lastAnimate = Date.now();
  }

  updateScoreAndEnemy() {
    let html = '';
    for (let i = 0; i < 7 - String(this.score).length; i++)
      html += '<span class="display-num"></span>\n';

    html += [...String(this.score)]
      .map(num => `<span class="display-num">${num}</span>\n`)
      .join('');

    this.scoreBox.innerHTML = html;
    this.enemyCount.textContent = this.enemiesLeft;
  }

  animate = () => {
    if (this.pause) return;

    // reset canvas
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.createEnemy();
    this.createBonus();

    // animated elements
    this.animateStar();
    this.animateShots();
    this.animateShotsEnemies();
    this.animateEnemies();
    this.animateBonuses();
    this.spaceship.render();

    this.collisionShotEnemy();
    this.collisionSpaceshipAndShotEnemy();
    this.collisionSpaceshipEnemy();
    this.collisionSpaceshipBonus();

    this.animateExplosion();

    this.displayFps();

    this.checkGame();
    requestAnimationFrame(this.animate);
  };

  init() {
    this.createStars();
    this.createSpeceship();

    this.startGame = true;
    this.settings = new Settings(this);
    this.animate();
  }

  start() {
    this.setLevel();
  }

  stopGame() {
    this.displayCongratulationBox(`Game Over.`);
    this.startGame = false;

    setTimeout(() => this.settings.showWinnerBox(), 4500);
  }
}

export const game = new Game();
