import inquirer from 'inquirer'
import { br, compareStats, sleep, tint } from '../utils/functions.js'
import { actions } from '../utils/choices.js'
import { enemy_attack, player_attack } from '../utils/fight.js'
import figlet from 'figlet'
import gradient from 'gradient-string'
import { loser, winner } from './end.js'

const player_action = async (player, enemy) => {
    console.log(`Hey ${tint(player.name, 'bgGreen')}, is your turn!`)

    const action = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: actions,
    })

    const choice = actions.indexOf(action.action)

    if (choice === 0) {
        console.log('You are attacking!')
        player_attack(player, enemy)
    } else if (choice === 1) {
        console.log('You are using magic!')
        player_attack(player, enemy)
    } else {
        player.heal()
    }

    br()
}

const enemy_action = async (player, enemy) => {
    // Generate a random enemy action with 33% chances in each option
    const enemy_action_generator = Math.random()
    const choice = enemy_action_generator < 0.33 ? 0 : enemy_action_generator < 0.66 ? 1 : 2

    console.log('Enemy is thinking...')
    await sleep()

    if (choice === 0) {
        console.log('He is attacking!')
        enemy_attack(player, enemy)
    } else if (choice === 1) {
        console.log('He is using magic!')
        enemy_attack(player, enemy)
    } else {
        console.log('Enemy healed himself!')
        enemy.heal()
    }

    br()
}

export const fight_turn = async (player, enemy) => {
    await player_action(player, enemy)
    if (enemy.health - enemy.dmgRecieved === 0) {
        winner(enemy)
        return { won: true }
    }

    await enemy_action(player, enemy)
    if (player.health - player.dmgRecieved === 0) {
        loser(player)
        return { won: false }
    }
    console.log('\n\n\n\n')
    compareStats(player, enemy)
    return false
}
