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
import { generateSpikePositions } from './util';

import GameStore from './store';
import Character from './components/character';
import Spikes from './components/spikes';
import Background from './components/background';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.forceQueue = null;
    this.createForce = this.createForce.bind(this);
    this.stepCallback = this.stepCallback.bind(this);
    this.collisionCallback = this.collisionCallback.bind(this);
    this.spikePositions = generateSpikePositions();
  }

  componentWillMount() {
    this.store = new GameStore();
  }

  componentDidMount() {
    init({
      store: this.store,
      dimensions: Dimensions.get('window'),
      spikes: this.spikePositions,
      stepCallback: this.stepCallback,
      collisionCallback: this.collisionCallback
    });
  }

  createForce() {
    this.forceQueue = [0, 700];
  }

  stepCallback(character, spikeBodies, background) {
    if(this.forceQueue) {
      character.force = this.forceQueue;
      this.forceQueue = 0;
    }
    for (let i = 0; i < spikeBodies.length; i++) {
      spikeBodies[i].position[0] -= 5 / 100;
    }
    background.position[0] -= 5 / 100;
  }

  collisionCallback() {
    this.props.onDead();
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.stage}
        onPress={this.createForce}
      >
        <View style={styles.stage}>
          <Character store={this.store} />
          <Background store={this.store}>
            <Spikes spikes={this.spikePositions}/>
          </Background>
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
