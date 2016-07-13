import React, { Component } from 'react';
import {
  Dimensions,
  View,
  StyleSheet
} from 'react-native';

import Spike from './spike';

export default class Spikes extends Component {

  render() {
    return (
      <View style={styles.container}>

        {this.props.spikes.map((position, index) => {

          return (
            <Spike
              key={index}
              position={position}
            />
          );

        })}

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
