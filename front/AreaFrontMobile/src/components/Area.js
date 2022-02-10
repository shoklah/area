class Area {
    constructor(action, reaction, enabled, id) {
        this.id = id
        this.action = action;
        this.reaction = reaction;
        this.enabled = enabled;
    }

    getId() { return this.id }
    getAction() { return (this.action); }
    getReaction() { return (this.reaction); }
    getStatus() { return (this.enabled); }

    changeStatus() {
        // TODO make the back do it too
        this.enabled = !this.enabled;
    }

    componentDidMount() {
    }
}

export default Area;