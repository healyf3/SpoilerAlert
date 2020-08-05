import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';

class Root extends Component {
  onLoginButtonPress() {
    Actions.login();
  }
  onSignUpButtonPress() {
    Actions.create_account();
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.onLoginButtonPress.bind(this)}>
            Log In
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onSignUpButtonPress.bind(this)}>
            Sign Up
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default Root;
