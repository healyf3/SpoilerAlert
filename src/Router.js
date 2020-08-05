import React, {Component} from 'react';
import {View, Animated, Easing} from 'react-native';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox } from 'react-native-router-flux';
import {
  StackViewStyleInterpolator,
  SceneInterpolatorProps,
} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Root from './components/Root';
import Fridge from './components/Fridge';
import Freezer from './components/Freezer';
import Pantry from './components/Pantry';
import Home from './components/Home';
import Settings from './components/Settings';
import OnBoarding from './components/OnBoarding';
import HomeTab from './components/HomeTab';
import Splash from './components/Splash';

export const TAB_COLOR = '#3386FF';
export const ACTIVE_TAB_COLOR = '#06DCF9';

type Props = {
  scene: Scene;
  scenes: Scene[];
 };

function getSceneIndicesForInterpolationInputRange(props: Props) {
  const { scene, scenes } = props;
  const index = scene.index;
  const lastSceneIndexInScenes = scenes.length - 1;
  const isBack = !scenes[lastSceneIndexInScenes].isActive;

  if (isBack) {
    const currentSceneIndexInScenes = scenes.findIndex(item => item === scene);
    const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive);
    const targetSceneIndex = scenes[targetSceneIndexInScenes].index;
    const lastSceneIndex = scenes[lastSceneIndexInScenes].index;

    if (
      index !== targetSceneIndex &&
      currentSceneIndexInScenes === lastSceneIndexInScenes
    ) {
      return {
        first: Math.min(targetSceneIndex, index - 1),
        last: index + 1,
      };
    } else if (
      index === targetSceneIndex &&
      currentSceneIndexInScenes === targetSceneIndexInScenes
    ) {
      return {
        first: index - 1,
        last: Math.max(lastSceneIndex, index + 1),
       };
     } else if (
       index === targetSceneIndex ||
       currentSceneIndexInScenes > targetSceneIndexInScenes
     ) {
       return null;
     } else {
       return { first: index - 1, last: index + 1 };
     }
   } else {
     return { first: index - 1, last: index + 1 };
   }
 }


function flip(props) {
    const { layout, position, scene } = props;
    const interpolate = getSceneIndicesForInterpolationInputRange(props);
    if(!interpolate) {
      return { opacity: 0 };
    }

    const { first, last } = interpolate;

    const {index} = scene;
    const width = layout.initWidth;
    const inputRange = [first, index, last];

    const opacity = position.interpolate({
      inputRange,
      outputRange: ([0, 1, 0]),
    });

    return {
        opacity: first ?
              position.interpolate({
                inputRange: [0, 0.5, 0.500001, 1],
                outputRange: [1, 1, 0, 0],
              }) : position.interpolate({
                inputRange: [0, 0.5, 0.500001, 1],
                outputRange: [0, 0, 1, 1],
              }),
        transform: [
            { perspective: 5000 },
            { rotateY: first ?
              position.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "-180deg"],
              }) :  position.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["180deg", "0deg"],
                }),
            },
            { scaleY: first ?
                position.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8],
                }) : position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                }),
            },
          ],
    };
}

const transitionConfig = () => ({
  transitionSpec: {
    duration: 400,
    //easing: Easing.bezier(0, 0, 0, 1),
    easing: Easing.bezier(0, 0, 1, 1), // linear
  },
  screenInterpolator: flip,
  containerStyle: {
    backgroundColor: '#383838'
  }
});

const RouterComponent = () => (
    <Router >
        <Scene key="root" hideNavBar transitionConfig={transitionConfig} >
          <Scene key="Splash" component={Splash} title="Splash" initial />
          <Scene key="OnBoarding" component={OnBoarding} title="OnBoarding" />
          <Scene key="HomeTab" component={HomeTab} title="Homasdfe"/>
          <Scene key="auth">
            <Scene key="login" component={LoginForm} title="Login" />
          </Scene>
          <Scene key="main">
            <Scene key="home" component={Home} title="Home" initial />
          </Scene>
        </Scene>
    </Router>
  );

export default RouterComponent;
