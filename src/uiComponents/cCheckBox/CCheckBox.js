import { StyleSheet, Text, View ,CheckBox} from 'react-native'
import React , {useState} from 'react'

const CCheckBox = () => {
    const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.main}>
      <Text>CCheckBox</Text>
      <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
    </View>
  )
}

export default CCheckBox

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
    }
})