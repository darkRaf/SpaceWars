class MyAudio {
  constructor(selector) {
    this.audio = document.querySelector(selector).cloneNode(false);
    this.audio.loop = false;
    this.muted = false;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  setVolume(num) {
    this.audio.volume = num / 100;
    this.audio.muted = this.cockpit.muted;
  }

  setMute(muted) {
    this.audio.muted = muted;
  }

  setLoop(bol = false) {
    this.audio.loop = bol;
  }
}

class ShotAudio extends MyAudio {
  constructor(cockpit, volume) {
    super('[data-shot]');
    this.cockpit = cockpit;
    this.setVolume(volume);
  }
}

class ExplosionAudio extends MyAudio {
  constructor(cockpit, volume) {
    super('[data-explosion]');
    this.cockpit = cockpit;
    this.setVolume(volume);
  }
}

class BackgroundAudio extends MyAudio {
  constructor(cockpit, volume) {
    super('[data-music]');
    this.cockpit = cockpit;
    this.setVolume(volume);
    this.setLoop(true);
  }
}

export { MyAudio, ShotAudio, ExplosionAudio, BackgroundAudio };
