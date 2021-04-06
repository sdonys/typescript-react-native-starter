import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import Colors from 'src/constants/colors';

function Home() {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('Current location manager')}</Text>
    </View>
  );
}

export default memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.aliceBlue,
  },
});
