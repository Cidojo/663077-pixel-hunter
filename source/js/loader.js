import {adaptServerData} from './data/data-adapter.js';


const SERVER_URL = `https://es.dump.academy/pixel-hunter`;


const DEFAULT_NAME = `cubic`;
const APP_ID = 19850701;


export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    const responseData = await response.json();
    return adaptServerData(responseData);
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    const responseData = await response.json();
    return responseData;
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings);
  }
}
