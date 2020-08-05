/* Note: Signup form will not be used for now. It is expected that the user already has a Kroger/KingSoopers account */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, signUpUser } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class SignUpForm extends Component {
  onEmailChange(text) {
      this.props.emailChanged(text);
  }
  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.signUpUser({ email, password });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create Account
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, signUpUser })(SignUpForm);
