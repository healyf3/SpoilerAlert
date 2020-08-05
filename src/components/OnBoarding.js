import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Easing,
  Image,
  StatusBar,
  NativeModules
} from 'react-native';
import { InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { ONBOARDING_TEXT } from '../../assets/texts/onboarding_text';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const WIDTH_THRESHOLD = 0.50 * SCREEN_WIDTH;
const VELOCITY_THESHOLD = 0.5;
const SWIPE_OUT_DURATION = 250;

type State = {|
 didFinishInitialAnimation: boolean,
|};

type Props = {
 dispatchTeamFetchStart: Function,
};

class OnBoarding extends Component<Props, State> {

  static get defaultProps()  {
    return {
      data: ONBOARDING_TEXT
    }
  }

  constructor(props: Props) {
    super(props);
    //this.state = { panResponder, position, index: 0 };

    this.state = { index: 0, didFinishInitialAnimation: false };
  }

  componentDidMount() {
    /*   // 1: Component is mounted off-screen */

    //NativeModules.RNRootViewBackground.setBackground(0, 0, 0, 1);
    console.log("finish animation");
   InteractionManager.runAfterInteractions(() => {
     /*  // 2: Component is done animating
        // 3: Start fetching the team */
     //this.props.dispatchTeamFetchStart();

     /*  // 4: set didFinishInitialAnimation to false
        // This will render the navigation bar and a list of players */
     this.setState({
       didFinishInitialAnimation: true,
     });
   });
 }


  position = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: this.position.x, dy: 0 }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > WIDTH_THRESHOLD || gesture.vx > VELOCITY_THESHOLD) {
        this.forceSwipe('right', gesture.vx, gesture.vy);
      } else if (gesture.dx < -WIDTH_THRESHOLD || gesture.vx < -VELOCITY_THESHOLD) {
        this.forceSwipe('left', gesture.vx, gesture.vy);
      } else {
        this.resetPosition();
      }
    }
  });

  onSwipeComplete(direction) {
    const { data } = this.props;
    if (direction === 'right') {
      this.onSwipeRight(data);
    } else {
      this.onSwipeLeft(data);
    }
    this.position.setValue({ x: 0, y: 0 });
  }

  onSwipeRight(data) {
    if (this.state.index === 0) {
      this.setState({ index: data.length - 1 });
    } else {
      this.setState({ index: this.state.index - 1 });
    }
  }

  onSwipeLeft(data) {
    if (this.state.index === data.length - 1) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  }

  getDataStyle() {
    return {
      ...this.position.getLayout(),
    };
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }

  forceSwipe(direction, vx, vy) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
//    Animated.decay(this.position, {
//      velocity: { x: vx, y: vy },
//      toValue: { x, y: 0 },
//      deceleration: 0.993,
//      useNativeDriver: true,
//    }).start(() => this.onSwipeComplete(direction));
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
      easing: Easing.linear
    }).start(() => this.onSwipeComplete(direction));
  }

  renderData() {
    const item = this.props.data[this.state.index];
    return (
    <Animated.View
      key={item.id}
      useNativeDriver={false}
      style={[styles.dataStyle, {transform: [{ translateX: this.position.x }]}, { zIndex: 99 }]}
      {...this.panResponder.panHandlers}
    >
        <Text style={{ marginBottom: 10 }}>
          {item.text}
        </Text>
    </Animated.View>
    );
  }

  renderPagination() {
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

  goToInventory() {
    Actions.HomeTab();
  }


  render() {
    if(this.state.didFinishInitialAnimation) {
      console.log("animation finished in on boarding");
      return (
        <View style={{flex: 1}}>
          <View style={styles.dataStyle}>
            {this.renderData()}
            {this.renderPagination()}
            </View>

          <Button onPress={this.goToInventory.bind(this)}>Login</Button>
        </View>
          );
    } else{
      console.log("on boarding null");
      return (null);
    }
  }
}

const styles = {
  dataStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
        //<Button onPress={() => this.props.navigation.navigate('Home')}>Login</Button>
