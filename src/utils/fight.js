import { br, tint } from './functions.js'

// TODO: delete this 2 functinos, move the logic
export const enemy_attack = (player, enemy) => {
    console.log(`The ${tint(enemy.name, 'bgRed')} is going to attack!`)
    const damage = enemy.attack()
    damage === 0 ? console.log('His attack missed!') : console.log(`Slime made ${tint(damage, 'bgRed')} of damage!`)

    player.recieveAttack(damage)
    console.log(`${player.name} hp: ${tint(`${player.health - player.dmgRecieved} / ${player.health}`, 'bgGreen', 'black')}`)
}

export const player_attack = (player, enemy) => {
    const damage = player.attack()
    damage === 0 ? console.log('Your attack missed!') : console.log(`You made ${tint(damage, 'bgGreen', 'black')} of damage!`)

    enemy.recieveAttack(damage)
    console.log(`${enemy.name} hp: ${tint(`${enemy.health - enemy.dmgRecieved} / ${enemy.health}`, 'bgRed')}`)
}
