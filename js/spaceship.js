import { CONSTANS } from './data/constans.js';
import { SPACESHIP } from './data/spaceship.js';
import { AMMO } from './data/ammo.js';

import { common } from './common.js';
import { Cockpit } from './cockpit.js';
import { Radar } from './radar.js';
import { Ammunition } from './ammunition.js';
import { Shot } from './shot.js';
import { ShotAudio } from './audioEffect.js';

const { MARGIN_CANVAS_BOOTOM, MARGIN_CANVAS } = CONSTANS;
const { SPEED, DATA } = SPACESHIP;

export class Spaceship {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = game.canvas.ctx;

    this.x = this.canvas.width / 2 - 20;
    this.y = this.canvas.height - MARGIN_CANVAS_BOOTOM - 40;
    this.speed = SPEED;
    this.autoPilot = false;
    this.destroyed = true;

    this.cockpit = new Cockpit(this);
    this.radar = new Radar(this.game);

    this.ammmunitionBox = [];
    this.activeAmmo = 1;
    this.lastShot = 0;
    this.shotDelay = 200;

    this.shield = false;
    this.lastShield;
    this.shieldDelay = 5000;

    this.alpha = 1;
    this.alphaStep = -0.05;
    this.alphaDelay = 20;
    this.lastAlpha = 0;

    this.lastMove;
    this.moveDelay = 10;

    this.setNewAmmoBox();
  }

  render() {
    this.radar.ctx.clearRect(0, 0, this.radar.ctx.canvas.width, this.radar.ctx.canvas.height);

    if (this.destroyed) return;
    this.radar.render();
    this.moveShip();
    
    if (this.shield) this.setGlobalAlpha();

    common.render(this, DATA);
    this.ctx.globalAlpha = 1;
  }

  setGlobalAlpha() {
    if(Date.now() > this.lastAlpha + this.alphaDelay) {
      this.alpha += this.alphaStep;
      this.lastAlpha = Date.now();
    }

    if (this.alpha < 0.2) this.alphaStep = 0.05;
    if (this.alpha > .9) this.alphaStep = -0.05;

    this.ctx.globalAlpha = this.alpha;
  }

  moveShip() {
    if (Date.now() < this.lastMove + this.moveDelay) return;

    const inputArr = this.game.keysInputs.inputsArr;

    if (this.x <= MARGIN_CANVAS - 18) this.x = MARGIN_CANVAS - 18;
    if (this.x >= this.canvas.width - MARGIN_CANVAS - 20)
      this.x = this.canvas.width - MARGIN_CANVAS - 20;

    if (this.autoPilot) {
      this.y -= this.speed;
      if (
        Math.round(this.x - this.canvas.width / 2) < 2 &&
        Math.round(this.x - this.canvas.width / 2) > -2
      ) {
        this.x = this.canvas.width / 2;
      } else {
        this.x = this.x > this.canvas.width / 2 ? (this.x -= this.speed) : (this.x += this.speed);
      }

      if (this.y < -40) {
        this.x = this.canvas.width / 2 - 20;
        this.y = this.canvas.height - MARGIN_CANVAS_BOOTOM - 40;
        this.autoPilot = false;
        this.game.setLevel();
      }
    } else {
      if (this.y <= MARGIN_CANVAS) this.y = MARGIN_CANVAS;
      if (this.y >= this.canvas.height - MARGIN_CANVAS_BOOTOM - 20)
        this.y = this.canvas.height - MARGIN_CANVAS_BOOTOM - 20;

      if (inputArr.includes('ArrowLeft')) this.x -= this.speed;
      if (inputArr.includes('ArrowRight')) this.x += this.speed;
      if (inputArr.includes('ArrowUp')) this.y -= this.speed;
      if (inputArr.includes('ArrowDown')) this.y += this.speed;

      if (inputArr.includes(' ')) this.addShot();
    }

    this.lastMove = Date.now();
  }

  //set
  setNextLife() {
    this.destroyed = false;
    this.x = this.canvas.width / 2 - 20;
    this.y = this.canvas.height - MARGIN_CANVAS_BOOTOM - 40;
  }

  setNewAmmoBox() {
    this.activeAmmo = 1;
    this.ammmunitionBox = [];
    this.setAmmunitonBox();
    this.addAmunition(1);
    this.addAmunition(2);
    this.addAmunition(3);
    this.setAmmo(1);
  }

  setAmmunitonBox() {
    AMMO.forEach(ammo => {
      const index = AMMO.indexOf(ammo) + 1;
      const newAmmo = new Ammunition(index);

      newAmmo.count = 0;
      this.ammmunitionBox.push(newAmmo);
    });
  }

  setAmmo(key = 1) {
    this.activeAmmo = key;
    this.cockpit.setBackgroundActiveAmmo(this.activeAmmo);
    this.cockpit.setPercetnAmmo(this.ammmunitionBox, this.activeAmmo);
    this.cockpit.displaySvgAmmo(this.activeAmmo);
    this.cockpit.displayPowerAmmo(this.activeAmmo);
    this.cockpit.displayMaxAmmo(this.activeAmmo);
  }

  //add
  addAmunition(type) {
    const newAmmo = new Ammunition(type);
    let added = false;

    if (this.ammmunitionBox.length) {
      this.ammmunitionBox.forEach(ammo => {
        if (ammo.type === newAmmo.type) {
          ammo.count += newAmmo.count;
          if (ammo.count > ammo.max) ammo.count = ammo.max;
          added = true;
        }
      });
      if (!added) this.ammmunitionBox.push(newAmmo);
    } else {
      this.ammmunitionBox.push(newAmmo);
    }

    this.cockpit.setDisplayAmmoCount(this.ammmunitionBox);
    this.cockpit.setPercetnAmmo(this.ammmunitionBox, this.activeAmmo);
    this.cockpit.displaySvgAmmo(this.activeAmmo);
  }

  addShot() {
    if (Date.now() > this.lastShot + this.shotDelay) {
      const { count } = this.ammmunitionBox[this.activeAmmo - 1];

      if (count > 0) {
        this.ammmunitionBox[this.activeAmmo - 1].count--;
        this.game.audios.push(new ShotAudio(this.cockpit, this.game.settings.shotVolume));

        // add shot to array of class Game
        this.game.shots.push(new Shot(this));
        this.cockpit.setDisplayAmmoCount(this.ammmunitionBox);
        this.cockpit.setPercetnAmmo(this.ammmunitionBox, this.activeAmmo);
      }

      this.lastShot = Date.now();
    }
  }
}
