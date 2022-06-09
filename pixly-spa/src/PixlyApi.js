import axios from 'axios';
import jwt from "jsonwebtoken";
import FormData from 'form-data'

const BASE_URL = 'http://localhost:3001';
//for making axios requests

class PixlyApi {

  static async fetchImages(token) {
    const res = await axios.get(`${BASE_URL}/images`, { headers: { 'Authorization': `Bearer ${token}`}});
    const { images } = res.data;
    return images;
  }

  static async fetchImageById(id, token) {
    const res = await axios.get(`${BASE_URL}/images/${id}`, { headers: { 'Authorization': `Bearer ${token}`}});
    const { image } = res.data;
    return image;
  }

  static async uploadImage(data, token) {
    const fd = new FormData();
    fd.append('image', data.image);
    const res = await axios.post(`${BASE_URL}/images`, fd,
      { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
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