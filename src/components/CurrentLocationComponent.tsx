import React, {memo, useEffect, useState} from 'react';
import {Image, PermissionsAndroid, Platform, StyleSheet, Text, View} from 'react-native';
import Colors from 'src/constants/colors';
import Geolocation from 'react-native-geolocation-service';
import {fetchReverseGeoCoding} from 'src/lib/GeoService';
import {getFormattedDateNow} from 'src/utils/DateUtils';
import {LocationsModel} from 'src/types';
import LocationItem from 'src/components/LocationItem';

const CurrentLocationComponent = () => {
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationsModel | null>(null);
  useEffect(() => {
    setInterval(() => fetchingGeolocalisationWithAddress(), 10000);
  }, [isPermissionGranted]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse').then((authorizationResult) => {
        if (authorizationResult === 'granted') setPermissionGranted(true);
      });
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      try {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
          (granted) => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) setPermissionGranted(true);
          },
        );
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  const fetchingGeolocalisationWithAddress = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        // console.log(position);
        if (currentLocation) {
          //TODO sending information to the the parent to update
        }
        const formattedAddress = await fetchReverseGeoCoding(
          position.coords.longitude,
          position.coords.latitude,
        );
        setCurrentLocation({
          date: getFormattedDateNow(),
          formattedAddress: formattedAddress,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        throw new Error(`Something went wrong in getting current position ${error}`);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const showLocation = (location: LocationsModel | null) =>
    location && (
      <View>
        <Text>Current location</Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/NA-BUTTON.png')} />
          <LocationItem date={location.date} formattedAddress={location.formattedAddress} />
        </View>
      </View>
    );

  return <View style={styles.container}>{showLocation(currentLocation)}</View>;
};

export default memo(CurrentLocationComponent);
const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
    marginHorizontal: '5%',
    flex: 1,
    backgroundColor: Colors.aliceBlue,
  },
});
