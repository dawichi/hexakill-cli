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

export const compareStats = (player, enemie) =>
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
            name: enemie.name,
            level: enemie.level,
            health: `${enemie.health - enemie.dmgRecieved}/${enemie.health}`,
            AD: enemie.ad,
            AP: enemie.ap,
            armor: enemie.armor,
            MR: enemie.mr,
            exp: enemie.exp,
        },
    ])
