#!/usr/bin/env node

//  ________      ________      ___       __       ___      ________      ___  ___      ___
// |\   ___ \    |\   __  \    |\  \     |\  \    |\  \    |\   ____\    |\  \|\  \    |\  \
// \ \  \_|\ \   \ \  \|\  \   \ \  \    \ \  \   \ \  \   \ \  \___|    \ \  \\\  \   \ \  \
//  \ \  \ \\ \   \ \   __  \   \ \  \  __\ \  \   \ \  \   \ \  \        \ \   __  \   \ \  \
//   \ \  \_\\ \   \ \  \ \  \   \ \  \|\__\_\  \   \ \  \   \ \  \____    \ \  \ \  \   \ \  \
//    \ \_______\   \ \__\ \__\   \ \____________\   \ \__\   \ \_______\   \ \__\ \__\   \ \__\
//     \|_______|    \|__|\|__|    \|____________|    \|__|    \|_______|    \|__|\|__|    \|__|

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import nanospinner from 'nanospinner'

import { br, compareStats, printStats, sleep, tint } from './utils/functions.js'
import { Character } from './entities/character.js'
import { Slime } from './entities/enemy.js'
import { actions, powerups } from './utils/choices.js'
import { enemie_attack, player_attack } from './utils/fight.js'

let player
let enemie

const welcome = async () => {
    const title = chalkAnimation.glitch('Welcome to hexakill CLI!')
    await sleep()
    const subtitle = chalkAnimation.radar('0101 0100101 10 101010 1 101')
    await sleep()
    title.stop()
    subtitle.stop()

    console.log(`
		${chalk.bgGreen(chalk.black(' HOW TO PLAY: '))} 

		In ${chalk.redBright('hexakill CLI')} you will need to select and build
		the correct items for your champ to improve it's stats
	`)

    const ask_name = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        },
    })

    player = new Character(ask_name.player_name)

    console.clear()
    console.log(`Hey ${chalk.red(player.name)}! Welcome to hexakill! \nFirst, meet your initial stats:`)
    printStats(player)
    console.log('Before start, you must decide the build you would like to follow this time!')

    const choice = await inquirer.prompt({
        name: 'powerup',
        type: 'list',
        message: 'What stat would you like to powerup?',
        choices: powerups,
    })

    console.log('-------------------------------------------')

    const option_idx = options.indexOf(choice.powerup)

    switch (option_idx) {
        case 0:
            console.log('+30 AD!')
            console.log(`${player.ad} => ${player.ad + 40}`)
            player.ad += 30
            break
        case 1:
            console.log('+40 AP!')
            console.log(`${player.ap} => ${player.ap + 50}`)
            player.ap += 40
            break
        case 2:
            console.log('+15 AD and +20AP!')
            console.log(`AD: ${player.ad} => ${player.ad + 15}`)
            console.log(`AP: ${player.ap} => ${player.ap + 20}`)
            player.ad += 15
            player.ap += 20
            break
        default:
            break
    }

    console.log('-------------------------------------------')

    console.log('Get ready...')
    await sleep()
    console.log('The game is about to start ^^')
    await sleep()
}


const fight = async () => {
	console.log(`Careful! One ${tint(`${enemie.name} lv ${enemie.level}`, 'bgRed')} has appeared!`)
	compareStats(player, enemie)
	br()
	await sleep()
	fight_turn()
}

const fight_turn = async () => {
	const action = await inquirer.prompt({
		name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: actions,
    })
	const choice = actions.indexOf(action.action)

	switch (choice) {
		case 0:
			break;
	
		default:
			break;
	}
	
	
    enemie_attack(player, enemie)
    player_attack(player, enemie)
	console.table({
		enemie: '200/2000',
        player: '4234',
    })
    await sleep()
    enemie_attack(player, enemie)
    player_attack(player, enemie)
    br()
}

const run = async () => {
	console.clear()
    // await welcome()
    player = new Character('Dawichi')
    console.clear()
	const enemie = new Slime()
    await fight()
}

run()
