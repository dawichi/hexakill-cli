import inquirer from 'inquirer'
import { Character } from '../entities/characters.js'
import { powerups } from '../utils/choices.js'
import { br } from '../utils/functions.js'

const increment = (player: Character, stat: string, increment: number) => {
    return parseInt((player[stat] * increment).toFixed(0))
}

export const powerup = async (player: Character) => {
    const choice = await inquirer.prompt({
        name: 'powerup',
        type: 'list',
        message: 'What would you like to powerup?',
        choices: powerups,
    })

    br()

    const option_idx = powerups.indexOf(choice.powerup)

    switch (option_idx) {
        case 0:
            console.log(`${player.ad} => ${increment(player, 'ad', 1.3)}`)
            player.ad = increment(player, 'ad', 1.3)
            break
        case 1:
            console.log(`${player.ap} => ${increment(player, 'ap', 1.3)}`)
            player.ap = increment(player, 'ap', 1.3)
            break
        case 2:
            console.log(`AD: ${player.ad} => ${increment(player, 'ad', 1.15)}`)
            console.log(`AP: ${player.ap} => ${increment(player, 'ap', 1.15)}`)
            player.ad = increment(player, 'ad', 1.15)
            player.ap = increment(player, 'ap', 1.15)
            break
        case 3:
            console.log(`Armor: \t ${player.armor} => ${increment(player, 'armor', 1.1)}`)
            console.log(`MR: \t ${player.mr} => ${increment(player, 'mr', 1.1)}`)
            console.log(`HP: \t ${player.health} => ${increment(player, 'health', 1.15)}`)
            player.armor = increment(player, 'armor', 1.1)
            player.mr = increment(player, 'mr', 1.1)
            player.health = increment(player, 'health', 1.15)
            break
        default:
            break
    }
}
