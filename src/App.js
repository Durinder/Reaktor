import React, { useEffect, useState } from "react"
import Live from "./components/Live"
import Statistics from "./components/Statistics"
import resultsService from "./services/resultsService"

const App = () => {
	const [ history, setHistory ] = useState([])
	const [ chosenPlayer, setChosenPlayer ] = useState("")
	const [ cursor, setCursor ] = useState("/rps/history")

	useEffect(() => {
		resultsService
			.getPage(cursor)
			.then(newPage => {
				setCursor(newPage.cursor)
				if (history.length < 100000) {
					setHistory(history => [...history, ...newPage.data])
				}
			})
	}, [history])

	const handleClick = (player) => {
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