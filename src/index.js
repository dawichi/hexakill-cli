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
import { Character } from './character.js'
import { printStats, sleep } from './utils.js'

let player

const welcome = async () => {
    // const title = chalkAnimation.glitch('Welcome to hexakill CLI!')
    // await sleep()
    // const subtitle = chalkAnimation.radar('0101 0100101 10 101010 1 101')
    // await sleep()
    // title.stop()
    // subtitle.stop()

    console.log(`
		${chalk.bgGreen(chalk.black(' HOW TO PLAY: '))} 

		In ${chalk.redBright('hexakill CLI')} you will need to select and build
		the correct items for your champ to improve it's stats
	`)

    // const ask_name = await inquirer.prompt({
    //     name: 'player_name',
    //     type: 'input',
    //     message: 'What is your name?',
    //     default() {
    //         return 'Player'
    //     },
    // })

    // player = new character(ask_name.player_name)
    player = new Character('daw')

    console.clear()
    console.log(`Hey ${chalk.red(player.name)}! Welcome to hexakill! \nFirst, meet your initial stats:`)
    printStats(player)
    console.log('Before start, you must decide the build you would like to follow this time!')

    const options = [
        `${chalk.red('Attack Damage:')} always hits, always works`,
        `${chalk.blue('Ability Power:')} let\'s blow them up!`,
        `${chalk.magenta('Mixed damage:')} why not... both?`,
    ]

    const powerups = await inquirer.prompt({
        name: 'powerup',
        type: 'list',
        message: 'What stat would you like to powerup?',
        choices: options,
    })

    console.log('-------------------------------------------')

    const option_idx = options.indexOf(powerups.powerup)

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
    console.log('The game is about to start')
    await sleep()
}

const run = async () => {
    console.clear()
    await welcome()
    while (true) {}
}

run()
