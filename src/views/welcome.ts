import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import inquirer from 'inquirer'

import { Barbarian, Character, Thieve, Wizard } from '../entities/characters.js'
import { characters } from '../utils/choices.js'
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
        `${chalk.green('HOW TO PLAY:')}\n\n`,
        `In ${chalk.red('hexakill CLI')} you will need to farm to level up your character and improve his stats.\n`,
        'You will fight different enemies with strengths and weaknesses.\n',
        'Play the correct damage and build to reach the final boss and win hexakill!\n',
    )
    br()
    console.log(
        '\n In hexakill, there are 2 types of damage:\n',
        `- ${chalk.red('Attacks (AD)')} 10% critic. 10% missing.\n`,
        `- ${chalk.blue('Magic (AP)')} 40% critic. 30% missing.\n\n`,
        `It\'s on you which one priorize! Remember that some enemies are stronger vs a specific type.\n`,
        `${chalk.yellow('Armor')} and ${chalk.cyan('Magic Resist (MR)')} reduces by a flat amount the damage received.\n`,
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

    console.log(`\nGreat ${chalk.cyan(ask_name.player_name)}, you have 3 different characters available.`)
    console.log(`Each one has it's unique gameplay style, choose well!\n`)

    const ask_champ = await inquirer.prompt({
        name: 'champ',
        type: 'list',
        message: 'What type of character do you want to be?',
        choices: characters,
    })

    const characters_idx = characters.indexOf(ask_champ.champ)
    const characters_available = [Wizard, Thieve, Barbarian]
    const character_selection = characters_available[characters_idx]

    player = new character_selection(5, ask_name.player_name)

    console.clear()
    console.log(`Hey ${chalk.cyan(player.name)}! Welcome to hexakill! \nFirst, meet your initial stats:\n`)

    printStats(player)

    console.log('\nNow, you must decide your first powerup!\nEvery 5 levels, you will pick a powerup, think well which one to choose!\n')

    await powerup(player)

    br()
    console.log('Get ready...')
    console.log('The game is about to start...')
    await sleep()
    await pause()
    return player
}
