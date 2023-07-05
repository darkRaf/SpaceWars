import { AMMO } from './data/ammo.js';

export class Cockpit {
  constructor(spaceship) {
    this.spaceship = spaceship;
    this.cockpitAmmo = document.querySelectorAll('[data-cockpit-ammo]');
    this.displayMissiles = document.querySelector('[data-ammo-missiles]');
    this.displayRockets = document.querySelector('[data-ammo-rockets]');
    this.displayRockets2 = document.querySelector('[data-ammo-rockets2]');

    this.displayImg = document.querySelector('[data-display-img]');

    this.percentAmmo = document.querySelector('[data-percent-ammo]');

    this.powerAmmo = document.querySelector('[data-power-ammo]');
    this.maxAmmo = document.querySelector('[data-max-ammo]');

    this.lifes = document.querySelectorAll('[data-spaceship-life]');

    this.speaker = document.querySelector('[data-speaker]');
    this.speakerMuted = document.querySelector('[data-muted]');

    this.muted = false;

    this.addEvents();
  }

  addEvents() {
    this.speaker.addEventListener('click', this.setMute);
    this.speakerMuted.addEventListener('click', this.setMute);
  }

  resetLifes() {
    this.lifes.forEach(life => life.classList.remove('destroyed'))
  }

  // set
  setMute = () => {
    this.speakerMuted.classList.toggle('speaker-hidden');
    this.speaker.classList.toggle('speaker-hidden');
    this.muted = !this.muted;
    this.spaceship.game.settings.backgroundMusic.setMute(this.muted);
  };

  setBackgroundActiveAmmo(activeAmmo) {
    this.cockpitAmmo.forEach(ca => {
      ca.parentElement.parentElement.classList.remove('select-ammo');
    });

    this.cockpitAmmo[activeAmmo - 1].parentElement.parentElement.classList.add('select-ammo');
  }

  setDisplayAmmoCount(ammunitionBox) {
    ammunitionBox.forEach(ammo => {
      switch (ammo.type) {
        case 1:
          this.displayMissiles.parentNode.classList.add('ammo-active');
          this.displayMissiles.innerHTML = this.ammoToHtml(ammo.count);
          if (ammo.count === 0) this.displayMissiles.parentNode.classList.remove('ammo-active');
          break;

        case 2:
          this.displayRockets.parentNode.classList.add('ammo-active');
          this.displayRockets.innerHTML = this.ammoToHtml(ammo.count);
          if (ammo.count === 0) this.displayRockets.parentNode.classList.remove('ammo-active');
          break;

        case 3:
          this.displayRockets2.parentNode.classList.add('ammo-active');
          this.displayRockets2.innerHTML = this.ammoToHtml(ammo.count);
          if (ammo.count === 0) this.displayRockets2.parentNode.classList.remove('ammo-active');
          break;

        default:
          break;
      }
    });
  }

  setPercetnAmmo(ammmunitionBox, activeAmmo) {
    let color = '68, 250, 1';
    const { count, max } = ammmunitionBox[activeAmmo - 1];
    const percentAmmo = (count * 100) / max;

    if (percentAmmo < 50) color = '242, 250, 1';
    if (percentAmmo < 30) color = '250, 138, 1';
    if (percentAmmo < 10) color = '250, 1, 1';

    this.percentAmmo.style.height = `${percentAmmo}%`;
    this.percentAmmo.style.setProperty('--primary-color', color);
  }

  displaySvgAmmo(activeAmmo) {
    this.displayImg.innerHTML = AMMO[activeAmmo - 1].svg;
  }

  displayPowerAmmo(activeAmmo) {
    this.powerAmmo.innerText = AMMO[activeAmmo - 1].power;
  }

  displayMaxAmmo(activeAmmo) {
    this.maxAmmo.innerText = AMMO[activeAmmo - 1].max;
  }

  ammoToHtml(num) {
    return [...String(num)].map(el => `<span>${el}</span>`).join('');
  }

  writeText(text, i) {
    return new Promise(resolve => {
      setTimeout(() => {
        const context = this.displayMission.innerText;
        const text2 = context.slice(0, context.length - 1) + text[i] + '_';
        this.displayMission.innerText = text2;

        if (i++ < text.length - 1) {
          this.writeText(text, i);
        } else {
          resolve();
        }
      }, 50);
    });
  }

}
