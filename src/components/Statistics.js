const Statistics = ({ player, history }) => {
	console.log(history)
	if (history.data) {
		const playerHistory = history.data.filter(elem => elem.playerA.name === player || elem.playerB.name === player)
		console.log(playerHistory)
		return (
			<div>
				<h2>Statistics</h2>
				{player}
			</div>
			
		)
	}
	else {
		return (
			<div>
				<h2>Statistics</h2>
			</div>
		)
	}
}

export default Statistics;