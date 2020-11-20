import axios from 'axios';
const instance = axios.create({
	baseURL: 'https://hilbert-bucket.herokuapp.com/',
});
export default instance;
