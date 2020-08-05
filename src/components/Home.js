import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardSection } from '../components/common';

class Home extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View>
          <CardSection>
            <Text >
              feeeeeed
            </Text>
          </CardSection>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Home;
