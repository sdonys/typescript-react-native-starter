import opencage from 'opencage-api-client';
export const fetchReverseGeoCoding = async (
  longitude: number,
  latitude: number,
): Promise<string> => {
  // const key = '8b713bad64ad48ec967dd46b2f3aa0e8';
  const key = '8e6b62f3f27f4629bf0a6486c72bdca0';
  const response = await opencage.geocode({key, q: `${longitude}, ${latitude}`});
  const result = response.results[0];
  return result.formatted;
};
