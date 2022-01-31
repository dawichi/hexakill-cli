import gradient from 'gradient-string'

export const winner = enemy => {
    console.log(
        gradient.pastel.multiline(`
		-------------------------------------------
		Congrats , the ${enemy.name} has been defeated
		-------------------------------------------
	`),
    )
}

export const loser = player => {
    console.log(
        gradient.pastel.multiline(`
		-------------------------------------------
		Oh no! I'm sorry ${player.name}, you are dead ;c
		-------------------------------------------
	`),
    )
}
