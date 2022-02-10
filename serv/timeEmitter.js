class TimeEmitter {
  constructor() {
    this._start = false;
    this._interval = 60 * 1000;
  }

  get start() {
    return this._start;
  }

  startInterval(emitterCallBack) {
    this._interval = true;
    setInterval(emitterCallBack, 1 * 1000);
  }
}

module.exports = TimeEmitter;
