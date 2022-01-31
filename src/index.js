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

    const option_idx = powerups.indexOf(choice.powerup)

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

    br()
    console.log('Get ready...')
    console.log('The game is about to start ^^')
    await sleep()
    await sleep()
}

const fight_turn = async (player, enemie) => {
    console.log(`Hey ${tint(player.name, 'bgGreen')}, is your turn!`)
    const action = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: actions,
    })
    const player_action = actions.indexOf(action.action)

	// Generate the 33% random enemie action
    const enemie_action_generator = Math.random()
	
	if (player_action === 0) {
		console.log('You are attacking!')
		player_attack(player, enemie)
	} else if (player_action === 1) {
		console.log('You are using magic!')
		player_attack(player, enemie)
	} else {
		player.heal()
	}
	
	br()
	console.log('Enemie is thinking...')
	const enemie_action = enemie_action_generator < 0.33 ? 0 : enemie_action_generator < 0.66 ? 1 : 2
	await sleep()

	if (enemie_action === 0) {
		console.log('He is attacking!')
		enemie_attack(player, enemie)
	} else if (player_action === 1) {
		console.log('He is using magic!')
		enemie_attack(player, enemie)
	} else {
		console.log('Enemie healed himself!')
		enemie.heal()
	}

	console.log('\n\n\n\n')
    compareStats(player, enemie)
}

const run = async () => {
    console.clear()
    await welcome()
    // player = new Character('Dawichi')

	// present the enemie
    const enemie = new Slime()
	console.clear()
    console.log(`Careful! One ${tint(`${enemie.name} lv ${enemie.level}`, 'bgRed')} has appeared!`)
    compareStats(player, enemie)
    br()
    await sleep()

	// init the combar
	let playing = true
	while (playing) {
		await fight_turn(player, enemie)
	}
}

run()
