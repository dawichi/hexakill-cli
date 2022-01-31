import chalk from 'chalk'

export const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms))

export const br = () => console.log('------------------------------------------------------------------------------')

export const tint = (text, background, color = '') => {
    if (color) return chalk[background](` ${chalk[color](text)} `)
    return chalk[background](` ${text} `)
}

export const printStats = player =>
    console.table({
        name: player.name,
        level: player.level,
        health: `${player.health - player.dmgRecieved}/${player.health}`,
        AD: player.ad,
        AP: player.ap,
        armor: player.armor,
        MR: player.mr,
        exp: player.exp,
    })

export const compareStats = (player, enemy) =>
    console.table([
        {
            name: player.name,
            level: player.level,
            health: `${player.health - player.dmgRecieved}/${player.health}`,
            AD: player.ad,
            AP: player.ap,
            armor: player.armor,
            MR: player.mr,
            exp: player.exp,
        },
        {
            name: enemy.name,
            level: enemy.level,
            health: `${enemy.health - enemy.dmgRecieved}/${enemy.health}`,
            AD: enemy.ad,
            AP: enemy.ap,
            armor: enemy.armor,
            MR: enemy.mr,
            exp: enemy.exp,
        },
    ])
