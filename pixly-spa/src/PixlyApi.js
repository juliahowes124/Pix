import axios from 'axios';
import jwt from "jsonwebtoken"

const BASE_URL = 'http://localhost:3001';
//for making axios requests

class PixlyApi {

  static async fetchImages() {
    const res = await axios.get(`${BASE_URL}/images`);
    const { images } = res.data;
    return images;
  }

  static async register(formData) {
    const res = await axios.post(`${BASE_URL}/auth/register`, formData);
    const user = jwt.decode(res.data.token);
    return {...user, token: res.data.token};
  }

  static async login(formData) {
    const res = await axios.post(`${BASE_URL}/auth/login`, formData);
    const user = jwt.decode(res.data.token);
    return { ...user, token: res.data.token };
  }
}

export default PixlyApi;