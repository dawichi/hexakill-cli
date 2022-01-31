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
		${tint('HOW TO PLAY: ', 'bgGreen', 'black')}

		In ${tint('hexakill CLI', 'bgRed')} you will need to farm to level up your character
		and improve his stats. You will fight different enemies with strengths and weaknesses.
		Play the correct damage and build the correct powerups to reach the final boss and win hexakill!
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

	br()
	console.log(
		'Basic info about combats:\n',
		'Your character has a max of 18 levels available, with each level up, your stats will be improved!\n\n',
		'In hexakill, there are 2 types of damage\n',
		`- ${tint('Attacks', 'bgRed')}: 10% critic. 10% missing.\n`,
		`- ${tint('Magic', 'bgBlue', 'black')}: 40% critic. 30% missing.\n\n`,
		'Attacks scale with AD (Attack Damage) and Magic scales with AP (Ability Power)\n',
		'it\'s on you which one priorize! But some enemies are stronger vs one specific dmg\n',
		'Armor and MR (Magic Resist) reduces the dmg recieved by each type by a flat amount\n',
		'NOTE: AP scales better in late levels!',
	)
	br()

    console.log(
		'Now, you must decide your first powerup!\n',
		'After each 6 levels, you will have a powerup available, so think well which one to choose\n',
	)

    const choice = await inquirer.prompt({
        name: 'powerup',
        type: 'list',
        message: 'What would you like to powerup?',
        choices: powerups,
    })

    console.log('-------------------------------------------')

    const option_idx = powerups.indexOf(choice.powerup)

    switch (option_idx) {
        case 0:
            console.log('+30 AD!')
            console.log(`${player.ad} => ${player.ad + 30}`)
            player.ad += 30
            break
        case 1:
            console.log('+40 AP!')
            console.log(`${player.ap} => ${player.ap + 40}`)
            player.ap += 40
            break
        case 2:
            console.log('+15 AD and +20 AP!')
            console.log(`AD: ${player.ad} => ${player.ad + 15}`)
            console.log(`AP: ${player.ap} => ${player.ap + 20}`)
            player.ad += 15
            player.ap += 20
            break
		case 3:
			console.log('+20 armor and +20 MR!')
			console.log(`Armor: ${player.armor} => ${player.armor + 20}`)
			console.log(`MR: ${player.mr} => ${player.mr + 20}`)
			player.armor += 20
			player.mr += 20
			break
        default:
            break
    }

    br()
    console.log('Get ready...')
    console.log('The game is about to start ^^')
    await sleep(6_000)
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

    // init the combat
    let playing = true
    while (playing) {
        await fight_turn(player, enemie)
    }
}

run()
