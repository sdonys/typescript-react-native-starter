declare module 'redux-persist/lib/*';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
}

interface HistoryLocations {
  _id: string;
  localisation: string;
  date: string;
}

interface LocationsModel {
  longitude: number;
  latitude: number;
  date: string;
  formattedAddress: string;
}
