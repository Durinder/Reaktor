import React from "react"
import PropTypes from "prop-types"

const Statistics = ({ player, history }) => {
	if (history === "Loading") {
		return (
			<div>
				<h2>Statistics</h2>
				Loading..
			</div>
		)
	}
	else if (history.data === undefined) {
		return (
			<div>
				<h2>Statistics</h2>
				Select a player to view historical data.
			</div>
		)}
	else if (history.data) {
		const determineWinner = ( playerA, playerB ) => {
			if (playerA.played === playerB.played) {
				return ("TIE")
			}
			else if ((playerA.played === "ROCK" && playerB.played === "SCISSORS") ||
			(playerA.played === "PAPER" && playerB.played === "ROCK") ||
			(playerA.played === "SCISSORS" && playerB.played === "PAPER")) {
				return (playerA.name)
			}
			else {
				return (playerB.name)
			}
		}
	
		const mostPlayedHand = ( player, playerHistory ) => {
			const played = playerHistory.map((elem) => elem.playerA === player ? elem.playerA.played : elem.playerB.played)
			const rock = played.filter(elem => elem === "ROCK").length
			const paper = played.filter(elem => elem === "PAPER").length
			const scissors = played.filter(elem => elem === "SCISSORS").length
			if (rock > paper && rock > scissors)
				return ("rock")
			else if (paper > rock && paper > scissors)
				return ("paper")
			else if (scissors > paper && scissors > rock)
				return ("scissors")
			else
				return ("tied")
		}

		const playerHistory = history.data.filter(elem => elem.playerA.name === player || elem.playerB.name === player)
		return (
			<div>
				<h2>Statistics</h2>
				<h3>{player}</h3>
				win ratio: {(playerHistory.filter((elem) => (
					determineWinner(elem.playerA, elem.playerB) === player)).length / playerHistory.length * 100).toFixed(2)}%<br />
				matches played: {playerHistory.length}<br />
				most played hand: {mostPlayedHand(player, playerHistory)}
				{playerHistory.map((elem) => (
					<p key={elem.gameId}>
						{elem.playerA.name} {elem.playerA.played} vs {elem.playerB.played} {elem.playerB.name}</p>))}
			</div>
			
		)
	}
}

Statistics.propTypes = {
	player: PropTypes.string,
	history: PropTypes.any
}

export default Statistics