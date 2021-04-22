import axios from 'axios';

const BASE_URL = 'http://localhost:3001';
//for making axios requests

class PixlyApi {

  static async fetchImages() {
    const res = await axios.get(`${BASE_URL}/images`);
    console.log(res.data);
    const {images} = res.data;
    return images;
  }

  static async login() {
    console.log('in login...')
  }
}

export default PixlyApi;