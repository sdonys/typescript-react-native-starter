import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from 'src/constants/colors';
import CurrentLocationComponent from 'src/components/CurrentLocationComponent';

function Home() {
  return (
    <View style={styles.container}>
      <CurrentLocationComponent />
    </View>
  );
}

export default memo(Home);
const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
    marginHorizontal: '5%',
    flex: 1,
    backgroundColor: Colors.aliceBlue,
  },
});
