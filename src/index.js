#!/usr/bin/env node

//  ________      ________      ___       __       ___      ________      ___  ___      ___
// |\   ___ \    |\   __  \    |\  \     |\  \    |\  \    |\   ____\    |\  \|\  \    |\  \
// \ \  \_|\ \   \ \  \|\  \   \ \  \    \ \  \   \ \  \   \ \  \___|    \ \  \\\  \   \ \  \
//  \ \  \ \\ \   \ \   __  \   \ \  \  __\ \  \   \ \  \   \ \  \        \ \   __  \   \ \  \
//   \ \  \_\\ \   \ \  \ \  \   \ \  \|\__\_\  \   \ \  \   \ \  \____    \ \  \ \  \   \ \  \
//    \ \_______\   \ \__\ \__\   \ \____________\   \ \__\   \ \_______\   \ \__\ \__\   \ \__\
//     \|_______|    \|__|\|__|    \|____________|    \|__|    \|_______|    \|__|\|__|    \|__|

import { br, compareStats, sleep, tint } from './utils/functions.js'
import { Slime } from './entities/enemies.js'
import { welcome } from './views/welcome.js'
import { fight_turn } from './views/fight_turn.js'

const run = async () => {
    console.clear()
    let player = await welcome()
    // player = new Character('Dawichi')

    // present the enemy
    const enemy = new Slime()
    console.clear()
    console.log(`Careful! One ${tint(`${enemy.name} lv ${enemy.level}`, 'bgRed')} has appeared!`)
    compareStats(player, enemy)
    br()
    await sleep()

    // init the combat
    let playing = true
    while (playing) {
        const fight = await fight_turn(player, enemy)
        if (!fight) continue
        if (fight.won) {
            console.log('next combat')
            playing = false
        } else {
            console.log('you lose')
            playing = false
        }
    }
    console.log('END OF THE GAME')
    console.log('END OF THE GAME')
    console.log('END OF THE GAME')
    console.log('END OF THE GAME')
}

run()
