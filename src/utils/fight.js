import { tint } from './functions.js'

export const enemie_attack = (player, enemie) => {
    console.log(`The ${tint(enemie.name, 'bgRed')} is going to attack!`)
    const damage = enemie.attack()
    damage === 0 ? console.log('His attack missed!') : console.log(`Slime made ${tint(damage, 'bgRed')} of damage!`)

    player.getDamage(damage)
}

export const player_attack = (player, enemie) => {
    console.log(`Hey ${tint(player.name, 'bgGreen')}, is your turn!`)
    const damage = player.attack()
    damage === 0 ? console.log('Your attack missed!') : console.log(`You made ${tint(damage, 'bgGreen')} of damage!`)

    enemie.getDamage(damage)
}
