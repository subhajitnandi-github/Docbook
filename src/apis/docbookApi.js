import axios from 'axios'

export default axios.create({
	baseURL: 'http://docbook-api.herokuapp.com'
})
