import { Dimensions } from 'react-native';
/* NavTab styles */

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const gen = {
  container: {
    flex: 1,
  },
  title: {
    height: 65,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: '#3386FF',
    backgroundColor: '#000000',
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 15
  },
  statusBar: {
    borderColor: '#3386FF',
    color: '#3386FF',
  }
};
