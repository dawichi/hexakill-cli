import { br, tint } from './functions.js'

export const enemie_attack = (player, enemie) => {
    console.log(`The ${tint(enemie.name, 'bgRed')} is going to attack!`)
    const damage = enemie.attack()
    damage === 0 ? console.log('His attack missed!') : console.log(`Slime made ${tint(damage, 'bgRed')} of damage!`)

    player.recieveAttack(damage)
	console.log(`${player.name} hp: ${tint(`${player.health - player.dmgRecieved} / ${player.health}`, 'bgGreen', 'black')}`)
	br()
}

export const player_attack = (player, enemie) => {
    const damage = player.attack()
    damage === 0 ? console.log('Your attack missed!') : console.log(`You made ${tint(damage, 'bgGreen', 'black')} of damage!`)

    enemie.recieveAttack(damage)
	console.log(`${enemie.name} hp: ${tint(`${enemie.health - enemie.dmgRecieved} / ${enemie.health}`, 'bgRed')}`)
	br()
}
