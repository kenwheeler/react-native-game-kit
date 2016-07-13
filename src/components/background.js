import React, { Component } from 'react';
import {
  Dimensions,
  View,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react/native';

@observer
export default class Background extends Component {

  constructor(props) {
    super(props);
    this.getPosition = this.getPosition.bind(this);
  }

  getPosition() {
    return {
      transform: [
        { translateX: this.props.store.backgroundX }
      ]
    };
  }

  render() {
    return (
      <View style={[styles.background, this.getPosition()]}>
        {this.props.children}
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0
  }
});
