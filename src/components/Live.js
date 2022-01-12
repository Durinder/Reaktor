import React, { useState } from "react"
const ws = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live")

const Live = ({ handleClick }) => {
	const [ matches, setMatches ] = useState([])

	ws.onmessage = (event) => {
		const match = JSON.parse(JSON.parse(event.data))
		if (match.type === "GAME_BEGIN") {
			if (matches.length === 0)
				setMatches([match])
			else if (matches.length < 10) {
				setMatches(matches => [...matches, match])
			}
			else {
				setMatches(matches => [...matches.slice(1), match])
			}
		}
		else if (match.type === "GAME_RESULT") {
			if (matches.filter(elem => elem.gameId === match.gameId).length > 0) {
				setMatches(matches.map(elem => elem.gameId !== match.gameId ? elem : match))
			}
		}}
	
	if (matches.length === 0) {
		return (
			<div>
				<h2>Live matches</h2>
				Awaiting games..
			</div>
		)
	} else {
		return (
			<div>
				<h2>Live matches</h2>
				<table>
					<thead>
						<tr>
							<th>Player A</th>
							<th>Played</th>
							<th>VS</th>
							<th>Played</th>
							<th>Player B</th>
						</tr>
					</thead>
					<tbody>
						{matches.map((elem) => (
							<tr key={elem.gameId}>
								<td><button onClick={() => handleClick(elem.playerA.name)}>{elem.playerA.name}</button></td>
								<td>{elem.playerA.played}</td>
								<td>vs</td>
								<td>{elem.playerB.played}</td>
								<td><button onClick={() => handleClick(elem.playerB.name)}>{elem.playerB.name}</button></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			)}
}

export default Live;