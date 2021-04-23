import axios from 'axios';
import jwt from "jsonwebtoken";
import FormData from 'form-data'

const BASE_URL = 'http://localhost:3001';
//for making axios requests

class PixlyApi {

  static async fetchImages() {
    const res = await axios.get(`${BASE_URL}/images`);
    const { images } = res.data;
    return images;
  }

  static async fetchUserImages(username, token) {
    const res = await axios.get(`${BASE_URL}/users/${username}/images`, { headers: { 'Authorization': `Bearer ${token}`} });
    const { images } = res.data;
    return images;
  }

  static async uploadImage(data, token) {
    const fd = new FormData();
    fd.append('image', data.image)
    const res = await axios.post(`${BASE_URL}/images`, fd,
      { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
    console.log(res.data);
    return res.data.image;
  }

  static async register(formData) {
    const res = await axios.post(`${BASE_URL}/auth/register`, formData);
    const user = jwt.decode(res.data.token);
    return { ...user, token: res.data.token };
  }

  static async login(formData) {
    const res = await axios.post(`${BASE_URL}/auth/login`, formData);
    const user = jwt.decode(res.data.token);
    return { ...user, token: res.data.token };
  }
}

export default PixlyApi;