import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import Game from './src/index';

class GameKit extends Component {
  render() {
    return <Game />
  }
}

AppRegistry.registerComponent('GameKit', () => GameKit);
