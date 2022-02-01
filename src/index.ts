#!/usr/bin/env node

//  ________      ________      ___       __       ___      ________      ___  ___      ___
// |\   ___ \    |\   __  \    |\  \     |\  \    |\  \    |\   ____\    |\  \|\  \    |\  \
// \ \  \_|\ \   \ \  \|\  \   \ \  \    \ \  \   \ \  \   \ \  \___|    \ \  \\\  \   \ \  \
//  \ \  \ \\ \   \ \   __  \   \ \  \  __\ \  \   \ \  \   \ \  \        \ \   __  \   \ \  \
//   \ \  \_\\ \   \ \  \ \  \   \ \  \|\__\_\  \   \ \  \   \ \  \____    \ \  \ \  \   \ \  \
//    \ \_______\   \ \__\ \__\   \ \____________\   \ \__\   \ \_______\   \ \__\ \__\   \ \__\
//     \|_______|    \|__|\|__|    \|____________|    \|__|    \|_______|    \|__|\|__|    \|__|


import { welcome } from './views/welcome.js'
import { Eagle, Knight, Slime } from './entities/enemies.js'
import { br, compareStats, sleep, tint } from './utils/functions.js'
import { fight } from './views/fight.js'
import { Base_Entity } from './entities/base.js'
import chalk from 'chalk'

const enemies_pool = [Eagle, Knight, Slime]

const run = async () => {
    console.clear()

    let player = await welcome()
    let enemy: Base_Entity
    let playing = true

    while (playing) {
		const min_enemy_level = Math.floor(player.level / 2)
        const max_enemy_level = player.level * 2
        const enemy_level = parseInt((Math.floor(Math.random() * (max_enemy_level - min_enemy_level + 1)) + min_enemy_level).toFixed(0))
		
		let enemy_pick = enemies_pool[Math.floor(Math.random()*enemies_pool.length)]
        enemy = new enemy_pick(enemy_level)
        // present the enemy
        console.clear()
        console.log(`Careful! One ${chalk.red(`lv ${enemy.level} ${enemy.name}`)} has appeared!`)
        compareStats(player, enemy)
        br()
        await sleep()
        // lets fight it!
        await fight(player, enemy)
    }
    console.log('END OF THE GAME')
}

run()
