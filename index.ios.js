import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import Game from './src/index';
import Dead from './src/components/dead';

class GameKit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dead: false
    }
    this.setDead = this.setDead.bind(this);
  }
  setDead(dead) {
    this.setState({
      dead: dead
    });
  }
  render() {
    return this.state.dead ?
      <Dead onReset={this.setDead.bind(null, false)}/> :
      <Game onDead={this.setDead.bind(null, true)}/>;
  }
}

AppRegistry.registerComponent('GameKit', () => GameKit);
