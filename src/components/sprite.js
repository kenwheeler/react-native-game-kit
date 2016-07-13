import React, { Component } from 'react';

import {
  Image,
  View,
  StyleSheet
} from 'react-native';

const sheet = [
  require('../assets/sprite-walk1.png'),
  require('../assets/sprite-walk2.png'),
  require('../assets/sprite-walk3.png'),
  require('../assets/sprite-walk4.png'),
];

export default class Sprite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spriteIndex: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { spriteIndex } = this.state;
      const targetIndex = spriteIndex >= 3 ? 0 : spriteIndex + 1;

      this.setState({
        spriteIndex: targetIndex
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.sprite}>
        <Image source={sheet[this.state.spriteIndex]} style={styles.image} />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  sprite: {
    flex: 1
  }
});
