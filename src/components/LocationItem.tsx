import React, {memo} from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface Props {
  formattedAddress: string;
  date: string;
}

const LocationItem = ({formattedAddress, date}: Props) => {
  return (
    <View style={styles.container}>
      <Text>{formattedAddress}</Text>
      <Text>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '70%'},
});

export default memo(LocationItem);
