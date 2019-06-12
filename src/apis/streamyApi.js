import axios from 'axios';

export default axios.create({
	baseURL: 'http://streamy-api.herokuapp.com'
});
