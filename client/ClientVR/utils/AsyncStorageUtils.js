import { AsyncStorage } from 'react-vr';

class AsyncStorageUtils {
  constructor() {

  }

  static setPano = async (key, uri) => {
    try {
      await AsyncStorage.setItem(key, uri);
    } catch (err) {
      throw new Error(`failed to set pano: ${err}`);
    }
  }

  static setManyPano = async (...keyValArr) => {
    try {
      await AsyncStorage.multiSet([...keyValArr]);
    } catch (err) {
      throw new Error(`failed to set many pano: ${err}`);
    }
  }

  static clearAsyncStorage = async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
      console.log('keys removed');
    } catch (err) {
      throw new Error(`failed to clear AsyncStorage: ${err}`);
    }
  }
}

export default AsyncStorageUtils;
