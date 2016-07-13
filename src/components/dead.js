import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class Dead extends Component {

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.flex}
        onPress={this.props.onReset}
      >
        <View style={styles.background}>
          <Text style={styles.text}>YOU DIED</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  background: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 36,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  }
});
