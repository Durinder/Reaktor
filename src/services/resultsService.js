import axios from 'axios'
const baseUrl = '/rps'

const getAll = () => {
	const request = axios.get(`${baseUrl}/history`)
	return request.then(response => response.data)
}

const resultsService = {
	getAll: getAll
}

export default resultsService;