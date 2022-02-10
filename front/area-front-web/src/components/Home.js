import React, { Component } from 'react';
import '../styles/Landing.css';
import HeaderComponent from './Header';
import InteractionComponent from './Interaction';
import InteractionListComponent from './InteractionList';
import { withRouter } from 'react-router-dom';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueAction: '',
      valueReaction: '',
      informations: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.interactions = new InteractionListComponent();
    this.interactions.addInteraction(new InteractionComponent("action", "weather", "Le temps est {weather} à Toulouse", "{weather}", "Valeures acceptées: 'clear', 'rain'"));
    this.interactions.addInteraction(new InteractionComponent("action", "hour", "Il est {hour}h", "{hour}", "Valeures acceptées: nombres entiers entre 0 et 23"));
    this.interactions.addInteraction(new InteractionComponent("action", "underToTemp", "La température passe en-dessous de {temp}°C à Toulouse", "{temp}", "Valeures acceptées: nombres entiers"));
    this.interactions.addInteraction(new InteractionComponent("action", "aboveToTemp", "La température passe au-dessus de {temp}°C à Toulouse", "{temp}", "Valeures acceptées: nombres entiers"));
    this.interactions.addInteraction(new InteractionComponent("action", "limitBitcoin", "La valeure du bitcoin passe en-dessous de {val}", "{val}", "Valeures acceptées: nombres entiers"));
    this.interactions.addInteraction(new InteractionComponent("action", "maxBitcoin", "La valeure du bitcoin passe au-dessus de {val}", "{val}", "Valeures acceptées: nombres entiers"));
    this.interactions.addInteraction(new InteractionComponent("action", "clock", "Tout les jours à {val}h", "{val}", "Valeures acceptées: nombres entiers, format : hh:mm"));

    this.interactions.addInteraction(new InteractionComponent("reaction", "sendSlackMsg", "J'envoie le message {msg} sur Slack", "{msg}"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "sendDiscordMsg", "J'envoie le message {msg} sur Discord", "{msg}"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "cocktail", "Un cocktail aléatoire est envoyé sur slack", "{X}", "X est inutile ici"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "recipe", "Une recette aléatoire est envoyée sur Slack", "{X}", "X est inutile"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "sport", "Les prochains event du league 1 conforama sont envoyés sur Slack", "{X}", "X est inutile"));
  }

  componentDidMount() {}

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.valueAction === ''
      || this.state.valueReaction === ''
      || this.state.valueAction === undefined
      || this.state.valueReaction === undefined
    ) {
      this.setState({ information: 'Sélection invalide' });
    } else {
      let action = this.interactions.getFromCode(this.state.valueAction);
      let reaction = this.interactions.getFromCode(this.state.valueReaction);
      this.props.history.push("settings", {action, reaction});
      event.preventDefault();
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <form onSubmit={this.handleSubmit}>
          <div class="wrapper">
            <div class="one mybox">
              <h2>Actions</h2>
              <label>
                {this.interactions.getActionList().map(interaction => (
                  <div class="element">
                    <input
                      name="valueAction"
                      value={interaction.getCode()}
                      type="radio"
                      onChange={this.handleInputChange}
                    />
                    {interaction.getSentence()}
                  </div>
                ))}
              </label>
            </div>
            <div class="two mybox">
              <h2>Reactions</h2>
              <label>
                {this.interactions.getReactionList().map(interaction => (
                  <div class="element">
                    <input
                      name="valueReaction"
                      value={interaction.getCode()}
                      type="radio"
                      onChange={this.handleInputChange}
                    />
                    {interaction.getSentence()}
                  </div>
                ))}
              </label>
            </div>
          </div>
          <div class="res">
            <input type="submit" value="Create" class="button" />
            <div class="informations">{this.state.informations}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(HomeComponent);