import React, { Component } from 'react';
import '../styles/Areas.css';
import HeaderComponent from './Header';
import Area from './Area';
import InteractionComponent from './Interaction';
import { firebaseAuth } from "./Authentication";
import { withRouter } from 'react-router-dom';

class AreasComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArea: []
    };

    const temp = this;
    firebaseAuth.currentUser.getIdToken(true).then(function(idToken) {
      fetch(
        'http://localhost:8080/services/' + firebaseAuth.currentUser.uid,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'authtoken': idToken}
        }
      ).then(response => response.json())
      .then(data => {
        let listArea = [];
        data.forEach(element => {
          let act = new InteractionComponent("action", element.type, "");
          act.setParam(element.action_arg);
          let react = new InteractionComponent("reaction", element.reaction, "");
          react.setParam(element.reaction_arg);
          listArea.push(
            new Area(act, react, true, element.id)
          );
      });
      temp.setState({'listArea': listArea});
      })
			.catch((error) => {
				console.log(error)
			});
    });

    this.delete = this.delete.bind(this);
    this.getAreas = this.getAreas.bind(this);
    this.changeStatusOfAnArea = this.changeStatusOfAnArea.bind(this);
  }

  componentDidMount() {}

  changeStatusOfAnArea(area) {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.listArea[stateCopy.listArea.indexOf(area)].changeStatus();
    this.setState(stateCopy);
  }

  delete(area) {
    fetch(
      'http://localhost:8080/services/' + area.getId(),
      {
        method: 'DELETE',
      }
    );
    this.props.history.push("home");
  }

  getAreas() {
    if (!this.state.listArea)
      return(<div></div>);
    return(
    this.state.listArea.map(area => (
      <div
        class={
          (area.getStatus() ? 'oneAreaEnabled' : 'oneAreaDisabled') +
          ' area'
        }
      >
        <div class="action">
          <h3>{area.getAction().getApiName()}</h3>
          <p>{area.getAction().getSentence()}</p>
        </div>
        <div class="reaction">
          <h3>{area.getReaction().getApiName()}</h3>
          <p>{area.getReaction().getSentence()}</p>
        </div>
        <button onClick={() => {this.delete(area)}}>
          Delete
        </button>
      </div>
    )));
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div class="container">
          {this.getAreas()}
        </div>
      </div>
    );
  }
}

export default withRouter(AreasComponent);
