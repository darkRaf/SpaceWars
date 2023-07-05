export class KeysInputs {
  constructor(game) {
    this.game = game;
    this.inputsArr = [];

    this.allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];

    window.addEventListener('keydown', e => {
      if (this.allowedKeys.includes(e.key) && this.inputsArr.indexOf(e.key) === -1) {
        this.inputsArr.push(e.key);
      }
      if (e.key === 'd') this.game.debug = !this.game.debug;
      if (e.key === 'p') this.game.setPause();
      if (e.key === 'm') this.game.spaceship.cockpit.setMute();
      if (e.key === '1') this.game.spaceship.setAmmo(1);
      if (e.key === '2') this.game.spaceship.setAmmo(2);
      if (e.key === '3') this.game.spaceship.setAmmo(3);
      // if (e.key === '4') this.game.spaceship.setAmmo(4);
    });

    window.addEventListener('keyup', e => {
      if (this.allowedKeys.includes(e.key)) {
        this.inputsArr.splice(this.inputsArr.indexOf(e.key), 1);
      }
    });
  }
}
