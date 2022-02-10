class Area {
  constructor(action, reaction, enabled = true, id) {
    this.action = action;
    this.reaction = reaction;
    this.enabled = enabled;
    this.id = id;
  }

  getAction() {
    return this.action;
  }
  getReaction() {
    return this.reaction;
  }
  getStatus() {
    return this.enabled;
  }
  getId() {
    return this.id;
  }

  changeStatus() {
    this.enabled = !this.enabled;
  }

  componentDidMount() {}
}

export default Area;
