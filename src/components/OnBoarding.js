import React, { Component } from 'react';
import {
  View,
  Text,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Image,
  StatusBar,
  NativeModules
} from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { usePanGestureHandler, withOffset, withDecay, diffClamp } from "react-native-redash";
import { InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { ONBOARDING_TEXT } from '../../assets/texts/onboarding_text';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_WIDTH_THRESHOLD = 0.20 * SCREEN_WIDTH;
const SWIPE_VELOCITY_THESHOLD = 100;
const SWIPE_OUT_DURATION = 500;
const ROTATION_TIME_INTERVAL = 2000;
const ROTATION_SWIPE_OUT_VELOCITY = 0.4

class OnBoarding extends Component {

  data = ONBOARDING_TEXT;
  constructor(props) {
    super(props);

    //this.state = {translateX: new Animated.Value(0)};
    this.translateX = new Animated.Value(0);
    this.state = { gestureReleased: true, swipeFinished: true, swipeTimer: setInterval(() => {
                  this.swipe()}, 4000), dir: 1};
  }

  componentDidMount() {
  //  const swipeTimer = setInterval(() => {
  //    this.swipe()}, 30000);
  }

  swipe() {
    this.translateX.setValue(0);
    this.setState({ swipeFinished: false });
    Animated.timing(this.translateX, {
      toValue: 1,
      duration: SWIPE_OUT_DURATION,
      easing: Easing.bezier(1, 1, 1, 1), // linear
      useNativeDriver: true
    }).start(() => this.setState({ swipeFinished: true }));
  }

  handleGesture = (evt) => {
    let { nativeEvent } = evt;
    if (this.state.swipeFinished && this.state.gestureReleased &&
      (Math.abs(nativeEvent.velocityX) > SWIPE_VELOCITY_THESHOLD)) {
      this.setState({ dir: 1 });
      if(nativeEvent.translationX < 0) {
        this.setState({ dir: -1 });
      }

      this.setState({ swipeFinished: false, gestureReleased: false });
      this.swipe();
      clearInterval(this.state.swipeTimer);
      this.setState({ swipeTimer: setInterval(() => {this.swipe()}, 4000)});
    }
  }

  onGestureStateChange = (evt) => {
    this.setState({ gestureReleased: true });
  }


  componentWillUnmount() {
    clearInterval(this.swipeTimer);
  }

  render() {
    const swipeTranslate = this.translateX.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, this.state.dir*SCREEN_WIDTH, 0]});


    return (
      <View style={styles.view}>
        {this.data.slice(0, 3).map((obj, idx) => {

          return(
          <PanGestureHandler onGestureEvent={this.handleGesture} onHandlerStateChange={this.onGestureStateChange} >
            <Animated.View
            key={idx}
            style={[styles.view, {transform: [{ translateX: swipeTranslate }]}]} >
              <Text style={styles.text} >
                {this.data[idx].text}
              </Text>
            </Animated.View>
          </PanGestureHandler>
          );
        })}
      </View>
    );
  }
}

//<Button onPress={this.goToInventory.bind(this)}>Login</Button>

const renderPagination = () => {
  const { data } = this.props;
  const activeDot = <View style={[styles.dot, styles.activeDot]} />;
  const dot = <View style={styles.dot} />;

  const dots = [];
  for (let key = 0; key < data.length; key++) {
    dots.push(key === this.state.index
      ? React.cloneElement(activeDot, { key })
      : React.cloneElement(dot, { key })
    );
  }

  return (
    <View
      pointerEvents="auto"
      style={[styles.pagination]}
    >
      {dots}
    </View>
  );
}

const styles = {
  view: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  text: {
    flex: 1,
    color: 'blue',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    //width: SCREEN_WIDTH,
    //height: SCREEN_HEIGHT
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.25)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 40,
    marginBottom: 3
  },

  activeDot: {
    backgroundColor: 'black',
  },

  pagination: {
    position: 'absolute',
    flexDirection: 'row',
  },

  image: {
  }
};

export default OnBoarding;
