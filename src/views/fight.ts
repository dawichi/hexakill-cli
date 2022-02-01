import chalk from 'chalk'
import figlet from 'figlet'
import gradient from 'gradient-string'

import { Knight, Slime } from '../entities/enemies.js'
import { turn } from './turn.js'
import { level_up, pause, sleep } from '../utils/functions.js'
import { Character } from '../entities/character.js'


export const fight = async (player: Character, enemy: Slime) => {
    // init the combat
    let combat = true
    while (combat) {
        const fight = await turn(player, enemy)
        if (!fight) continue
        if (fight.won) {
            await sleep(3000)
            console.clear()
            const exp_gained = parseInt(((enemy.health / player.level) * 2).toFixed(0))
            console.log(`\n\n\n Well played! You have gained ${chalk.green(exp_gained + ' exp')}`)
            console.log(`\t ${player.exp}/100 => ${player.exp + exp_gained}/100 \n\n\n`)
            const levelup = player.gainExp(exp_gained)
            if (levelup) {
                console.log(gradient.cristal.multiline(level_up(player)), 'You level up! Well done! ^^\n\n')
                if (player.level >= 18) {
                    figlet(`winner, ${player.name}`, (err, data) => {
                        console.log(gradient.pastel.multiline(data) + '\n')
                        console.log(chalk.green(`Congrats ${player.name}! You have won hexakill!`))
                        process.exit(0)
                    })
                }
            }
            await pause()
            combat = false
        } else {
            console.log('Better luck next time!!!\n\n')
            process.exit()
        }
    }
}