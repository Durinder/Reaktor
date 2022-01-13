import axios from "axios"

const getPage = ( cursor ) => {
	const request = axios.get(cursor)
	return request.then(response => response.data)
}

const resultsService = {
	getPage: getPage
}

export default resultsService