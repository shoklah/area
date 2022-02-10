import React, { Component } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import HeaderComponent from './Header';
import Area from './Area';
import InteractionComponent from './Interaction';
import { firebaseAuth } from "./Authentication";

class AreasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          areas: [],
          // Appeler le back pour get les actions / reactions existantes
          listArea : [
            new Area(new InteractionComponent("action", "meteo", "Il fait {temp}°C à {location}"),                          new InteractionComponent("reaction", "youtube", "Je met un pouce bleu à la vidéo {url}"), true),
            new Area(new InteractionComponent("action", "youtube", "Une nouvelle vidéo de {youtuber} est publiée"),         new InteractionComponent("reaction", "github", "J\'accepte une PR sur le répo GitHub {rep}"), false),
            new Area(new InteractionComponent("action", "teams", "J\'ai reçu un message Teams sur la conversation {conv}"), new InteractionComponent("reaction", "slack", "J\'envoie un message Slack sur le channel {channel}"), true)
        ]
        };
        this.ipAddress = this.props.route.params.ipAddress

        const temp = this;
        firebaseAuth.currentUser.getIdToken(true).then(function(idToken) {
        fetch(
          'http://' + temp.ipAddress + ':8080/services/' + firebaseAuth.currentUser.uid,
          {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'authtoken': idToken}
          }
        ).then((response) =>
          response.json()
        )
        .then((data) => {
          let tab = []
          data.map(area => {
            tab.push(
                new Area(
                  new InteractionComponent(area.id, "action", area.type, area.value),
                  new InteractionComponent(area.id, "reaction", area.reaction, area.reaction_arg), true, area.id
                )
              )
          })
          temp.setState({
            areas: tab
          })
        })
	  		.catch((error) => {
		  		console.log(error)
			  });
    });

        this.changeStatusOfAnArea = this.changeStatusOfAnArea.bind(this);
      }

    componentDidMount() {
    }

    navigate(dest) {
      this.props.navigation.navigate(dest, {userInfo: this.props.route.params.userInfo, ipAddress: this.props.route.params.ipAddress})
    }

    changeStatusOfAnArea(area) {
      let temp = this
      firebaseAuth.currentUser.getIdToken(true).then(function(idToken) {
        fetch(
          'http://' + temp.ipAddress + ':8080/services/' + area.getId(),
          {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'authtoken': idToken}
          }
        )
      });
      this.navigate('/home')
    }

    render() {
      return (
        <View>
            <View>
              <Button title={"My areas"} onPress={() => this.navigate('/services')} class="button_areas"></Button>
              <Button title={"Create area"} onPress={() => this.navigate('/home')} class="button_home"></Button>
              <Button title={"Disconnect"} onPress={() => this.navigate('/signin')} class="button_disconnect"></Button>
            </View>
            <ScrollView style={{height: "80%"}}>
              {this.state.areas.map(area =>
                <View key={area.id} class={
                  (area.getStatus() ? "oneAreaEnabled" : "oneAreaDisabled") + " area"
                }>
                  <View class="action">
                    <Text>{area.getAction().getApiName()}</Text>
                    <Text>{area.getAction().getSentence()}</Text>
                  </View>
                  <View class="reaction">
                    <Text>{area.getReaction().getApiName()}</Text>
                    <Text>{area.getReaction().getSentence()}</Text>
                  </View>
                <Button title={"Delete"} class="enable" onPress={() => { this.changeStatusOfAnArea(area) }}></Button>
                </View>
              )}
            </ScrollView>
        </View>
      )
    }
}

export default AreasComponent;