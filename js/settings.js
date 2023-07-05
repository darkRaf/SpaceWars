import { MyAudio, BackgroundAudio, ExplosionAudio, ShotAudio } from './audioEffect.js';
import { Cookie } from './cookie.js';
import { CONSTANS } from './data/constans.js';

const { MARGIN_CANVAS_BOOTOM } = CONSTANS;

export class Settings {
  constructor(game) {
    this.game = game;

    this.newGameBox = document.querySelector('[data-new-game-box]');
    this.inputUserName = document.querySelector('[data-user-name]'); // TODO: sprawdzenie wprowadzanych danych  encodeURIComponent('test?')
    this.errorUserName = document.querySelector('[data-error-user]');
    this.btnsMode = document.querySelectorAll('.new-game-buttons button');
    this.btnStartGame = document.querySelector('[data-btn-start]');

    this.settingsBox = document.querySelector('[data-settings]');
    this.closeSettings = document.querySelector('[data-close-settings]');

    this.rangeStars = document.querySelector('[data-range-stars]');
    this.rangeMusic = document.querySelector('[data-music-volume]');
    this.rangeShot = document.querySelector('[data-shot-volume]');
    this.rangeExplosion = document.querySelector('[data-explosion-volume]');

    this.winnerBox = document.querySelector('[data-winner-box]');
    this.btnNewGame = document.querySelector('[data-btn-new-game]');

    this.icoSettings = document.querySelector('[data-ico-settings]');

    this.backgroundMusic;

    this.userName;
    this.mode = 'normal';
    this.musicVolume = 20;
    this.shotVolume = 30;
    this.explosionVolume = 100;

    this.addEvents();
    this.init();
  }

  init() {
    this.getCookiesSettings();

    this.inputUserName.value = this.userName;
    this.setDifficulty();

    this.rangeStars.value = this.game.maxStars;
    this.displayValue(this.rangeStars);

    this.rangeMusic.value = this.musicVolume;
    this.displayValue(this.rangeMusic);

    this.rangeShot.value = this.shotVolume;
    this.displayValue(this.rangeShot);

    this.rangeExplosion.value = this.explosionVolume;
    this.displayValue(this.rangeExplosion);

    this.showNeGameBox();

    this.backgroundMusic = new BackgroundAudio(this.game.spaceship.cockpit, this.musicVolume);
    // this.backgroundMusic.play();
  }

  getCookiesSettings() {
    const cookies = Cookie.getAllCookiesObj();

    this.userName = cookies.name ?? '';
    this.mode = cookies.mode ?? 'normal';
    this.game.maxStars = cookies.stars ?? 50;
    this.musicVolume = cookies.music ?? 20;
    this.shotVolume = cookies.shot ?? 30;
    this.explosionVolume = cookies.explosion ?? 100;
    this.selectedDifficulty = cookies.difficulty ?? 'normal';
  }

  addEvents() {
    this.icoSettings.addEventListener('click', this.toggleClass);
    this.icoSettings.addEventListener('click', this.addEsc);
    this.closeSettings.addEventListener('click', this.toggleClass);

    this.btnsMode.forEach(btn => btn.addEventListener('click', this.btnsDifficultyClick));
    this.btnStartGame.addEventListener('click', this.btnStartGameClick);

    this.rangeStars.addEventListener('input', e => this.displayValue(e.target));
    this.rangeStars.addEventListener('change', e => this.setMuchStars(e.target.value));

    this.rangeMusic.addEventListener('input', e => this.displayValue(e.target));
    this.rangeMusic.addEventListener('input', e => this.setMusicVolume(e.target.value));

    this.rangeShot.addEventListener('input', e => this.displayValue(e.target));
    this.rangeShot.addEventListener('input', e => this.setShotVolume(e.target.value));

    this.rangeExplosion.addEventListener('input', e => this.displayValue(e.target));
    this.rangeExplosion.addEventListener('change', e => this.setExplosionVolume(e.target.value));

    this.btnNewGame.addEventListener('click', this.btnNewGameClick);
  }

  btnNewGameClick = () => {
    this.hiddenWinnerBox();
    setTimeout(this.showNeGameBox, 1000);

    this.btnStartGame.addEventListener('click', this.btnStartGameClick);
    this.game.spaceship.setNewAmmoBox();
    this.game.spaceship.cockpit.resetLifes();

    this.game.pause = false;
    this.game.startGame = false;
    this.game.level = 0;
    this.game.score = 0;
    this.game.lifes = 3;
    this.game.enemies = [];
    this.game.bonus = [];

    this.game.spaceship.x = this.game.canvas.width / 2 - 20;
    this.game.spaceship.y = this.game.canvas.height - MARGIN_CANVAS_BOOTOM - 40;

    this.game.updateScoreAndEnemy();
    this.game.enemyCount.textContent = 0;
  };

  toggleClass = () => {
    this.game.setPause(false);
    this.settingsBox.classList.toggle('settings-active');

    this.settingsBox
      .querySelector('.settings-box-content')
      .scrollTo({ top: 0, behavior: 'smooth' });
  };

  addEsc = () => {
    const esc = e => {
      if (e.key === 'Escape') {
        this.toggleClass();
        window.removeEventListener('keyup', esc);
      }
    };

    window.addEventListener('keyup', esc);
  };

  displayValue(target) {
    const num = target.value;
    target.parentElement.lastElementChild.innerText = num;
  }

  btnStartGameClick = () => {
    this.userName = encodeURIComponent(this.inputUserName.value);

    if (this.userName.length < 3 || this.userName.length > 12) {
      this.errorUserName.textContent = 'Name must contain from 3 to 12 characters.';
      return;
    }

    this.errorUserName.textContent = '';
    this.backgroundMusic.play();
    this.newGameBox.classList.remove('settings-active');
    this.game.spaceship.destroyed = false;
    this.game.startGame = true;

    this.game.setLevel();
    this.btnStartGame.removeEventListener('click', this.btnStartGameClick);

    Cookie.setCookie('name', this.userName);
  };

  btnsDifficultyClick = e => {
    this.mode = e.target.dataset.mode;
    Cookie.setCookie('mode', this.mode);
    this.setDifficulty();
  };

  // set
  setDifficulty() {
    this.btnsMode.forEach(btn => {
      btn.dataset.mode === this.mode
        ? btn.classList.add('btn-active')
        : btn.classList.remove('btn-active');
    });

    switch (this.mode) {
      case 'easy':
        this.game.mode = 1.2;
        break;
      case 'normal':
        this.game.mode = 1;
        break;
      case 'hard':
        this.game.mode = 0.8;
        break;
      case 'extreme':
        this.game.mode = 0.6;
        break;
    }
  }

  setMuchStars = num => {
    this.game.maxStars = num;
    this.game.createStars();
    Cookie.setCookie('stars', num);
  };

  setMusicVolume = num => {
    this.musicVolume = num;
    this.backgroundMusic.setVolume(num);
    Cookie.setCookie('music', num);
  };

  setShotVolume = num => {
    this.shotVolume = num;
    Cookie.setCookie('shot', num);
  };

  setExplosionVolume = num => {
    this.explosionVolume = num;
    Cookie.setCookie('explosion', num);
  };

  showNeGameBox = () => {
    this.newGameBox.classList.add('settings-active');
  };

  hiddenNeGameBox = () => {
    this.newGameBox.classList.remove('settings-active');
  };

  showWinnerBox = () => {
    this.winnerBox.classList.add('winner-active');
  };

  hiddenWinnerBox = () => {
    this.winnerBox.classList.remove('winner-active');
  };
}
