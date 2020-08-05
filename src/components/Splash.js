import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import OnBoarding from './OnBoarding';

const saveWaste = require('../../assets/images/save_waste.png');

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    //this.image = (<Image style={styles.icon} source={saveWaste} />);
    //const data = await this.performTimeConsumingTask();
    //if (data !== null) {
      this.setState({ isLoading: false });
  //  }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <OnBoarding />
      );
    }
    return (
      <View style={styles.container} >
        <StatusBar barStyle="light-content" />
        {this.image}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#5C130E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    height: 150,
    width: 150,
  }
};

export default Splash;
