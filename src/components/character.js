import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import { observer } from 'mobx-react/native';

import store from '../store';

@observer
export default class Game extends Component {
  getPosition() {
    return {
      transform: [
        { rotate: this.props.store.character.angle + "deg" },
        { translateX: this.props.store.character.position[0] },
        { translateY: this.props.store.character.position[1] }
      ]
    }
  }
  render() {
    return (
      <View
        style={[styles.character, this.getPosition()]}
      />
    );
  }
}

const styles = StyleSheet.create({
  character: {
    backgroundColor: 'white',
    height: 100,
    width: 100
  }
});
