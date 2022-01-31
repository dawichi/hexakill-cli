import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import inquirer from 'inquirer'
import { Character } from '../entities/character.js'
import { powerups } from '../utils/choices.js'
import { br, printStats, sleep, tint } from '../utils/functions.js'

export const welcome = async () => {
    let player
    const title = chalkAnimation.glitch('Welcome to hexakill CLI!')
    await sleep()
    const subtitle = chalkAnimation.radar('0101 0100101 10 101010 1 101')
    await sleep()
    title.stop()
    subtitle.stop()
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

    player = new Character(ask_name.player_name)

    console.clear()
    console.log(`Hey ${chalk.red(player.name)}! Welcome to hexakill! \nFirst, meet your initial stats:`)

    printStats(player)

    console.log('Now, you must decide your first powerup!\n', 'Every 5 levels, you will have a powerup, think well which one to choose\n')

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
    return player
}
