import axios from 'axios';
const instance = axios.create({
	baseURL: 'https://hilbertads.herokuapp.com',
});
export default instance;
