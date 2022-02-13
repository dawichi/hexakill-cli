import chalk from 'chalk'
import inquirer from 'inquirer'
import { Character } from '../entities/characters'
import { Slime } from '../entities/enemies'

export const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms))

export const br = () => console.log('------------------------------------------------------------------------------')

export const pause = async () => {
    const pause = await inquirer.prompt({
        name: 'pause',
        type: 'input',
        message: 'Press ENTER to continue...',
    })
}

export const tint = (text: string, background: string, color: string = '') => {
    if (color) return chalk[background](` ${chalk[color](text)} `)
    return chalk[background](` ${text} `)
}

export const level_up = (player: Character) => `
-------------------------------------------
LEVEL UP!!! ${player.level}
-------------------------------------------
`

export const printStats = (player: Character) =>
    console.table({
        name: player.name,
        level: player.level,
        health: `${player.health - player.dmgReceived}/${player.health}`,
        AD: player.ad,
        AP: player.ap,
        armor: player.armor,
        MR: player.mr,
        speed: player.speed,
    })

export const compareStats = (player: Character, enemy: Slime) =>
    console.table([
        {
            name: player.name,
            level: player.level,
            health: `${player.health - player.dmgReceived} / ${player.health}`,
            AD: player.ad,
            AP: player.ap,
            armor: player.armor,
            MR: player.mr,
            speed: player.speed,
            exp: `${player.exp}/100`,
        },
        {
            name: enemy.name,
            level: enemy.level,
            health: `${enemy.health - enemy.dmgReceived} / ${enemy.health}`,
            AD: enemy.ad,
            AP: enemy.ap,
            armor: enemy.armor,
            MR: enemy.mr,
            speed: enemy.speed,
        },
    ])
