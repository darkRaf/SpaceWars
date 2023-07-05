import { AMMO } from './data/ammo.js';

export class Ammunition {
  constructor(type) {
    this.type = type;
    this.speed = 0;
    this.power = 0;
    this.count = 0;
    this.max = 0;

    this.addAmmo();
  }

  addAmmo() {
    const {speed, count, power, max} = AMMO[this.type - 1];
    this.speed = speed;
    this.count = count;
    this.power = power;
    this.max = max;
  }




}