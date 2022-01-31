import gradient from 'gradient-string'
import { Character } from '../entities/character'
import { Slime } from '../entities/enemies'

export const winner = (enemy: Slime) => {
    console.log(
        gradient.pastel.multiline(`
		-------------------------------------------
		Congrats , the ${enemy.name} has been defeated
		-------------------------------------------
	`),
    )
}

export const loser = (player: Character) => {
    console.log(
        gradient.pastel.multiline(`
		-------------------------------------------
		Oh no! I'm sorry ${player.name}, you are dead ;c
		-------------------------------------------
	`),
    )
}
