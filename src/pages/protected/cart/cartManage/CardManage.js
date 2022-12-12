import { StyleSheet, Text, View ,useWindowDimensions } from 'react-native'
import React , {useState}from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

const CardManage = () => {
    
        const layout = useWindowDimensions();
      
        const [index, setIndex] = useState(0);
        const [routes] = React.useState([
          { key: 'first', title: 'First' },
          { key: 'second', title: 'Second' },
        ]);
 
  return (
    <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
  />
  )
}

export default CardManage

const styles = StyleSheet.create({})