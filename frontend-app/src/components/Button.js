import React from 'react'
import { StyleSheet, Text } from 'react-native'

import Touchable from './Touchable'

export const Button = ({ text, children, style, textStyle, ...rest }) => (
  <Touchable style={[styles.button, style]} {...rest}>
    <Text style={[styles.text, textStyle]}>{text || children}</Text>
  </Touchable>
)

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#037aff',
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 35,
    color: '#037aff',
  },
})

export default Button
