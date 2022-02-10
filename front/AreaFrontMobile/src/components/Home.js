import React, { Component } from 'react';
import { Text, FlatList, Button, View, Switch } from 'react-native';
import HeaderComponent from './Header';
import InteractionComponent from './Interaction';
import InteractionListComponent from './InteractionList';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueAction: '',
      valueReaction: '',
      informations: '',
      ipAddress: this.props.route.params.ipAddress,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigate = this.navigate.bind(this);

    this.interactions = new InteractionListComponent();
    this.interactions.addInteraction(new InteractionComponent("action", "weather", "Le temps est {weather} à Toulouse", "{weather}", "Valeures acceptées: 'clear', 'rain'"));
    this.interactions.addInteraction(new InteractionComponent("action", "clock", "Il est {hour}h", "{hour}", "format: entre 00:00 et 23:59"));
    this.interactions.addInteraction(new InteractionComponent("action", "underToTemp", "La température passe en-dessous de {temp}°C à Toulouse", "{temp}", "Valeures acceptées: nombres entiers"));
    this.interactions.addInteraction(new InteractionComponent("action", "aboveToTemp", "La température passe au-dessus de {temp}°C à Toulouse", "{temp}", "Valeures acceptées: nombres entiers"));
    this.interactions.addInteraction(new InteractionComponent("action", "limitBitcoin", "Lorsque le bitcoin dépasse {bitcoin}", "{bitcoin}"));
    this.interactions.addInteraction(new InteractionComponent("action", "maxBitcoin", "Lorsque le bitcoin est au maximum à {bitcoin}", "{bitcoin}"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "cocktail", "Je recois une recette de cocktail", "{cocktail}"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "recipe", "Je recois une recette de cuisine", "{recipe}"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "sport", "je recois des evenements ligue 1 conforama", "{sport}"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "sendSlackMsg", "J\'envoie le message slack {message}", "{message}"));
    this.interactions.addInteraction(new InteractionComponent("reaction", "sendDiscordMsg", "J\'envoie le message discord {message}", "{message}"));
  }

  componentDidMount() {
  }

  navigate(dest, ipAddress) {
    this.props.navigation.navigate(dest, {userInfo: this.props.route.params.userInfo, ipAddress: ipAddress})
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.valueAction === ''
      || this.state.valueReaction === ''
      || this.state.valueAction === undefined
      || this.state.valueReaction === undefined
    ) {
      this.setState({
        ["informations"]: "Sélection invalide"
      });
    } else {
      let action = this.interactions.getFromCode(this.state.valueAction);
      let reaction = this.interactions.getFromCode(this.state.valueReaction);
      this.props.navigation.navigate("/settings", {action, reaction, userInfo: this.props.route.params.userInfo, ipAddress: this.state.ipAddress});
      // alert("'" + this.state.valueAction + "'\n   V\n'" + this.state.valueReaction + "'")
    }
  }

  handleInputChange(interaction) {
    interaction.setSelected()
    if (interaction.getReactionType() === "action") {
      this.setState({valueAction: interaction.getCode()})
      this.interactions.getActionList().map(inter => {
        if (inter !== interaction) {
          if (inter.getSelected()) {
            inter.setSelected()
          }
        }
      })
    } else {
      this.setState({valueReaction: interaction.getCode()})
      this.interactions.getReactionList().map(inter => {
        if(inter !== interaction) {
          if (inter.getSelected()) {
            inter.setSelected()
          }
        }
      })
    }
  }

  render() {
    return (
      <View>
          <View>
            <Button title={"My areas"} onPress={() => this.navigate('/services', this.state.ipAddress)} class="button_areas"></Button>
            <Button title={"Create area"} onPress={() => this.navigate('/home', this.state.ipAddress)} class="button_home"></Button>
            <Button title={"Disconnect"} onPress={() => this.navigate('/signin', this.state.ipAddress)} class="button_disconnect"></Button>
          </View>
          <View class="wrapper">
            <View class="one mybox">
              <Text>Actions</Text>
              {this.interactions.getActionList().map(interaction =><View style={{flexDirection: "row"}}><Switch name="valueAction" value={interaction.getSelected()} onChange={() => this.handleInputChange(interaction)}/><Text style={{width: "80%"}}>{interaction.getSentence()}</Text></View>)}
            </View>
            <View class="two mybox">
            <Text>Reactions</Text>
              {this.interactions.getReactionList().map(interaction =><View style={{flexDirection: "row"}}><Switch name="valueReaction" value={interaction.getSelected()} onChange={() => this.handleInputChange(interaction)}/><Text style={{width: "80%"}}>{interaction.getSentence()}</Text></View>)}
            </View>
          </View>
          <View class='res'>
            <Button title={"finish area"} onPress={this.handleSubmit}/>
            <Text class="informations">{ this.state.informations }</Text>
          </View>
      </View>
    )
  }
}

export default HomeComponent;
