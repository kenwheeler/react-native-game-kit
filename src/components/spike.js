import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet
} from 'react-native';

export default class Spike extends Component {

  getPosition() {
    const { index, position, store } = this.props;
    return {
      left: position.left,
      bottom: 0
    }
  }

  render() {
    return (
      <View style={[styles.spike, this.getPosition()]}>
        <Image
          style={styles.image}
          source={require('../assets/spike.png')}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  spike: {
    position: 'absolute',
    height: 44,
    width: 44
  },
  image: {
    resizeMode: 'contain',
    flex: 1
  }
});
