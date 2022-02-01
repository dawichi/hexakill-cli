#!/usr/bin/env node

//  ________      ________      ___       __       ___      ________      ___  ___      ___
// |\   ___ \    |\   __  \    |\  \     |\  \    |\  \    |\   ____\    |\  \|\  \    |\  \
// \ \  \_|\ \   \ \  \|\  \   \ \  \    \ \  \   \ \  \   \ \  \___|    \ \  \\\  \   \ \  \
//  \ \  \ \\ \   \ \   __  \   \ \  \  __\ \  \   \ \  \   \ \  \        \ \   __  \   \ \  \
//   \ \  \_\\ \   \ \  \ \  \   \ \  \|\__\_\  \   \ \  \   \ \  \____    \ \  \ \  \   \ \  \
//    \ \_______\   \ \__\ \__\   \ \____________\   \ \__\   \ \_______\   \ \__\ \__\   \ \__\
//     \|_______|    \|__|\|__|    \|____________|    \|__|    \|_______|    \|__|\|__|    \|__|


import { welcome } from './views/welcome.js'
import { Knight, Slime } from './entities/enemies.js'
import { br, compareStats, sleep, tint } from './utils/functions.js'
import { fight } from './views/fight.js'

const run = async () => {
    console.clear()
    let player = await welcome()

    let enemy: Slime
    let playing = true
    while (playing) {
        const min_enemy_level = Math.floor(player.level / 2)
        const max_enemy_level = player.level * 2
        const enemy_level = parseInt((Math.floor(Math.random() * (max_enemy_level - min_enemy_level + 1)) + min_enemy_level).toFixed(0))
        enemy = new Knight(enemy_level)
        // present the enemy
        console.clear()
        console.log(`Careful! One ${tint(`${enemy.name} lv ${enemy.level}`, 'bgRed')} has appeared!`)
        compareStats(player, enemy)
        br()
        await sleep()
        // lets fight it!
        await fight(player, enemy)
    }
    console.log('END OF THE GAME')
}

run()
