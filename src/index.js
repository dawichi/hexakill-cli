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

class character {
    constructor(name, level = 1) {
        this.name = name
        this.level = level
        this.dmgRecieved = 0
        this.health = 200
        this.ability_power = 60
        this.attack_damage = 20
        this.magic_resist = 25
        this.armor = 25
    }

    upLevel() {
        if (this.level < 18) {
            this.level++
            this.health += 40
            this.ability_power += 15
            this.attack_damage += 10
            this.magic_resist += 3
            this.armor += 3
        }
    }

    getDamage(damage) {
        if (this.dmgRecieved + damage >= this.health) {
            this.dmgRecieved = this.health
        } else {
            this.dmgRecieved += damage
        }
    }

    passive() {}

    attack() {
        console.log('defend')
    }

    defend() {
        console.log('defend')
    }

    skillshot() {
        console.log('skillshot')
    }

    ultimate() {
        console.log('ultimate')
    }
}

const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms))

let player

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

    player = new character(ask_name.player_name)

    console.clear()
    console.log(`
		Welcome ${chalk.red(player.name)} to hexakill CLI!
		First, you must pick your champ:
	`)

    const champs = await inquirer.prompt({
        name: 'champ_select',
        type: 'list',
        message: 'Which one would you like to use?',
        choices: ['Alex  (AP, healer)', 'Bruno (AD, bleeding)'],
    })

    console.log(champs.champ_select)
    player.champ = champs.champ_select
}

const printStats = () => {
    console.log(`
		AD
	`)
}

async function handleAnswer(isCorrect) {
    const spinner = nanospinner.createSpinner('Checking answer...').start()
    await sleep()

    if (isCorrect) {
        spinner.success({ text: `success` })
    } else {
        spinner.error({ text: `nop ;(` })
        process.exit(1)
    }
}

const winner = () => {
    console.clear()
    figlet(`Congrats , ${player.name}`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n')
        console.log(chalk.green(`Programming isn't about what you know; it's about making the command line look cool`))
        process.exit(0)
    })
}

const run = async () => {
    console.clear()
    await welcome()
    winner()
}

run()
