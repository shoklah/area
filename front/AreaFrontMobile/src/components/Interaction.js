class InteractionComponent {
  constructor(reactionType, apiName, sentenceExplain, variable, tips="") {
    this.reactionType=reactionType;
    this.apiName=apiName;
    this.sentenceExplain=sentenceExplain;
    this.variable=variable;
    this.tips = tips;
    this.code = this.reactionType + "_" + this.apiName + "_" + this.sentenceExplain;
    this.selected = false;
  }

  componentDidMount() {
  }

  setSelected() { this.selected = !this.selected }
  getSelected() { return (this.selected); }
  getReactionType() { return (this.reactionType); }
  getApiName() { return (this.apiName); }
  getSentence() { return (this.sentenceExplain); }
  getVariable() { return (this.variable); }
  getTips() { return (this.tips); }
  getCode() { return (this.code); }
}

export default InteractionComponent;