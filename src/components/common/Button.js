import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#3386FF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        backgroundColor: '#000000',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#3386FF',
        marginTop: 30,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 30
    }
};
export { Button };
