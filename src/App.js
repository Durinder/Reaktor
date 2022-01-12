import React, { useState } from "react"
import Live from "./components/Live"
import Statistics from "./components/Statistics"
import resultsService from "./services/resultsService"

const App = () => {
	const [ history, setHistory ] = useState([])
	const [ chosenPlayer, setChosenPlayer ] = useState("")

	const handleClick = (player) => {
		setHistory("Loading")
		resultsService
			.getAll()
			.then(updatedResults => {
				setHistory(updatedResults)
			})
			.catch(error => {
				console.log(error)
			})
		setChosenPlayer(player)
	}

	return (
		<div>
			<Live handleClick={handleClick}/>
			<Statistics player={chosenPlayer} history={history} />
		</div>
	)
}

export default App