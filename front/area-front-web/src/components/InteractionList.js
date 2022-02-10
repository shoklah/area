class InteractionListComponent {
  constructor() {
    this.listInteraction = [];
  }

  componentDidMount() {}

  addInteraction(interaction) {
    this.listInteraction.push(interaction);
  }

  getFullList() {
    return this.listInteraction;
  }

  getFromCode(code) {
    let toFind = undefined;
    this.listInteraction.forEach(element => {
      if (element.getCode() === code)
        toFind = element;
    });
    return (toFind);
}

  getActionList() {
        let actions = [];
        this.listInteraction.forEach(element => {
          if (element.getReactionType() === "action")
              actions.push(element);
        });
        return (actions);
    }

    getReactionList() {
        let reactions = [];
        this.listInteraction.forEach(element => {
            if (element.getReactionType() === "reaction")
                reactions.push(element);
        });
        return (reactions);
      }
}

export default InteractionListComponent;