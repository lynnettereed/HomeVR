import { AsyncStorage } from 'react-vr';

class AsyncStorageUtils {
  constructor() {

  }

  static setPano = async (key, uri) => {
    try {
      await AsyncStorage.setItem(key, uri);
    } catch (err) {
      console.error('failed to set pano');
    }
  }

  static setManyPano = async (...keyValArr) => {
    try {
      await AsyncStorage.multiSet([...keyValArr]);
    } catch (err) {
      console.error('failed to set many pano');
    }
  }

  static clearAsyncStorage = async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
      console.log('keys removed');
    } catch (err) {
      console.error(err);
    }
  }
}

export default AsyncStorageUtils;
