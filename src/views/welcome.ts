import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import inquirer from 'inquirer'

import { Character } from '../entities/characters.js'
import { powerups } from '../utils/choices.js'
import { br, pause, printStats, sleep, tint } from '../utils/functions.js'
import { powerup } from './powerup.js'

export const welcome = async () => {
    let player: Character
    const title = chalkAnimation.glitch('Welcome to hexakill CLI!')
    await sleep()
    const subtitle = chalkAnimation.radar('0101 0100101 10 101010 1 101')
    await sleep()
    title.stop()
    subtitle.stop()

    // Presentation
    console.log(
        `${tint('HOW TO PLAY: ', 'bgGreen', 'black')}\n\n`,
        `In ${tint('hexakill CLI', 'bgRed')} you will need to farm to level up your character\n`,
        'and improve his stats. You will fight different enemies with strengths and weaknesses.\n',
        'Play the correct damage and build the correct powerups to reach the final boss and win hexakill!\n',
    )
    br()
    console.log(
        'Basic info about combats:\n',
        'Your character has a max of 18 levels available, with each level up, your stats will be improved!\n\n',
        'In hexakill, there are 2 types of damage\n',
        `- ${tint('Attacks', 'bgRed')}: 10% critic. 10% missing.\n`,
        `- ${tint('Magic', 'bgBlue', 'black')}: 40% critic. 30% missing.\n\n`,
        `${chalk.red('Attacks')} scale with ${chalk.red('AD (Attack Damage)')} and ${chalk.blue('Magic')} scales with ${chalk.blue(
            'AP (Ability Power)',
        )}\n`,
        "It's on you which one priorize! But some enemies are stronger vs a specific type\n",
        `${chalk.yellow('Armor')} and ${chalk.cyan('MR (Magic Resist)')} reduces by a flat amount the dmg recieved\n`,
        'NOTE: AP scales better in last levels!',
    )
    br()
    const ask_name = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        },
    })

	console.log(`Great ${ask_name.player_name}, you will have 3 different champs available`)
	console.log(`Each one has it's unique gameplay style and benefits, so choose well!`)

    const ask_champ = await inquirer.prompt({
        name: 'champ',
        type: 'list',
        message: 'What type of character do you want to be?',
		choices: 
	})

    player = new Character(ask_name.player_name)

    console.clear()
    console.log(`Hey ${chalk.red(player.name)}! Welcome to hexakill! \nFirst, meet your initial stats:`)

    printStats(player)

    console.log('Now, you must decide your first powerup!\n', 'Every 5 levels, you will have a powerup, think well which one to choose\n')

    await powerup(player)

    br()
    console.log('Get ready...')
    console.log('The game is about to start...')
    await sleep()
    await pause()
    return player
}
