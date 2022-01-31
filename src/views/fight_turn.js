import chalk from 'chalk'
import inquirer from 'inquirer'

import { loser, winner } from './end.js'
import { actions } from '../utils/choices.js'
import { br, compareStats, sleep, tint } from '../utils/functions.js'

// TODO: refactor this file 

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
        console.log(`You are ${chalk.red('attacking')}!`)
        const damage = player.attack()
        if (damage === 0) {
            console.log('Your attack missed!')
        } else {
            console.log(`You made ${tint(damage - enemy.armor, 'bgGreen', 'black')} of damage!`)
            enemy.recieveAttack(damage)
            console.log(`${enemy.name} hp: ${tint(`${enemy.health - enemy.dmgRecieved} / ${enemy.health}`, 'bgRed')}`)
        }
    } else if (choice === 1) {
        console.log(`You are using ${chalk.blue('magic')}!`)
        const damage = player.magic()
        if (damage === 0) {
            console.log('Your magic missed!')
        } else {
            console.log(`You made ${tint(damage - enemy.mr, 'bgGreen', 'black')} of damage!`)
            enemy.recieveMagic(damage)
            console.log(`${enemy.name} hp: ${tint(`${enemy.health - enemy.dmgRecieved} / ${enemy.health}`, 'bgRed')}`)
        }
    } else {
        console.log('You healed!')
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
        console.log(`The ${tint(enemy.name, 'bgRed')} is going to ${chalk.red('attack')}!`)
        const damage = enemy.attack()
		if (damage) {
			console.log(`His ${chalk.red('attack')} missed!`)
		} else {
			console.log(`Slime made ${tint(damage - player.armor, 'bgRed')} of damage!`)
			player.recieveAttack(damage)
			console.log(`${player.name} hp: ${tint(`${player.health - player.dmgRecieved} / ${player.health}`, 'bgGreen', 'black')}`)
		}
    } else if (choice === 1) {
        console.log(`The ${tint(enemy.name, 'bgRed')} is going to use ${chalk.blue('magic')}!`)
        const damage = enemy.magic()
		if (damage === 0) {
			console.log(`His ${chalk.blue('magic')} missed!`)
		} else {
			console.log(`Slime made ${tint(damage - player.mr, 'bgRed')} of damage!`)
			player.recieveMagic(damage)
			console.log(`${player.name} hp: ${tint(`${player.health - player.dmgRecieved} / ${player.health}`, 'bgGreen', 'black')}`)
		}
    } else {
        console.log('Enemy healed!')
        enemy.heal()
    }
    await sleep(3000)
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
