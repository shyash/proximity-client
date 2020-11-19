import axios from 'axios';
const instance = axios.create({
	baseURL: 'http://photu-godaam.herokuapp.com',
});
export default instance;
