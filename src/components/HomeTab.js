import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StatusBar, NativeModules } from 'react-native';
import { Icon } from 'react-native-elements';
import { TAB_BUTTONS } from '../../assets/buttons/tab_buttons';
import { gen as gens } from '../styles';
import GetInventory from '../components/GetInventory';
import { InteractionManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const TAB_BUTTON_COLOR = '#3386FF';
export const ACTIVE_TAB_BUTTON_COLOR = '#06DCF9';

type Props = {
 dispatchTeamFetchStart: Function,
};

type State = {|
 didFinishInitialAnimation: boolean,
|};

class HomeTab extends Component<State> {
  static defaultProps = {
    data: TAB_BUTTONS
  }

  componentDidMount() {
/*   // 1: Component is mounted off-screen */
//    NativeModules.RNRootViewBackground.setBackground(0.0, 0.0, 0.0, 1.0);
      InteractionManager.runAfterInteractions(() => {
/*     // 2: Component is done animating
     // 3: Start fetching the team */
     //this.props.dispatchTeamFetchStart();

/*     // 4: set didFinishInitialAnimation to false
     // This will render the navigation bar and a list of players */
      this.setState({
        didFinishInitialAnimation: true,
      });
    });
    }

  constructor(props) {
    super(props);
    this.state = { buttonColor: [], pageContent: 0, pageTitle: 'Home', didFinishInitialAnimation: false };
    for (let key = 0; key < this.props.data.length; key++) {
      let color = TAB_BUTTON_COLOR;
      if (key === 0) {
        this.state.pageContent = `Content: ${key}`;
        color = ACTIVE_TAB_BUTTON_COLOR;
      }
      this.state.buttonColor = [...this.state.buttonColor, color];
    }
  }

  onPress(page) {
    { /* change color of active page button */ }
    const buttonArray = this.state.buttonColor;
    for (let i = 0; i < this.props.data.length; i++) {
      if (page.id === i) {
        buttonArray[page.id] = ACTIVE_TAB_BUTTON_COLOR;
      } else {
        buttonArray[i] = TAB_BUTTON_COLOR;
      }
    }
    this.setState({ pageTitle: page.title, pageContent: `Content: ${page.id}`, buttonColor: buttonArray });
    { /* write code to render different screens */ }
  }

  renderButtons() {

    const { data } = this.props;
    const ICON_SIZE = (SCREEN_WIDTH / data.length) / 3; // this scale is subject to change

    const buttons = [];
    for (let key = 0; key < data.length; key++) {
      // render buttons and their text into buttons array
      buttons.push(
        <TouchableOpacity activeOpacity={0} key={key} onPress={this.onPress.bind(this, data[key])}>
          <Icon name={data[key].icon} color={this.state.buttonColor[key]} size={ICON_SIZE} containerStyle={{ width: SCREEN_WIDTH / data.length }} />
          <Text style={[HomeTabStyles.text, { color: this.state.buttonColor[key] }]}>{data[key].title}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={HomeTabStyles.tab}>
        {buttons}
      </View>
    );
  }


  render() {
    if(this.state.didFinishInitialAnimation) {
    //if(0) {
    return (
      <View style={gens.container}>
        <View style={gens.statusBar}>
          <StatusBar barStyle="light-content" />
        </View>
        <View style={gens.title}>
          <Text style={gens.titleText}>{this.state.pageTitle}</Text>
        </View>
        <View style={HomeTabStyles.gen}>
          <Text>{this.state.pageContent}</Text>
          <GetInventory />
        </View>
         <View style={HomeTabStyles.container}>
          {this.renderButtons()}
        </View>
      </View>
    );
  } else {
    return <View style={{flex: 1, backgroundColor: 'blue'}}><Text>yoooooooo</Text></View>;
  }
  }
}

const HomeTabStyles = {
  gen: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
    borderColor: '#3386FF',
    backgroundColor: '#000000',
    paddingTop: 5,
  },
  text: {
    textAlign: 'center',
    color: TAB_BUTTON_COLOR
  },
  container: {
    justifyContent: 'flex-end',
  }
}

export default HomeTab;
