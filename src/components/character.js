import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react/native';

import store from '../store';
import Sprite from './sprite';

@observer
export default class Game extends Component {

  getPosition() {
    return {
      transform: [
        { translateX: this.props.store.character.position[0] },
        { translateY: this.props.store.character.position[1] }
      ]
    }
  }

  render() {
    return (
      <View style={[styles.character, this.getPosition()]}>
        <Sprite />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  character: {
    height: 80,
    width: 100
  }
});
