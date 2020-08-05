import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

const Loading = ({ size, visible }) => {
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        <ActivityIndicator size={size || 'large'} />
      </View>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { Loading };
