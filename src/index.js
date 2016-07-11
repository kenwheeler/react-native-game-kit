import React, { Component } from 'react';

import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import p2 from 'p2';

import { init } from './physics';
import store from './store';
import Character from './components/character';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.forceQueue = null;
    this.createForce = this.createForce.bind(this);
  }
  componentDidMount() {
    init(
      Dimensions.get('window'),
      (character) => {
        if(this.forceQueue) {
          character.force = this.forceQueue;
          this.forceQueue = 0;
        }
      }
    );
  }
  createForce() {
    this.forceQueue = [0, 300];
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.stage}
        onPress={this.createForce}
      >
        <View style={styles.stage}>
          <StatusBar hidden={true} />
          <Character store={store} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    backgroundColor: 'black'
  }
});
