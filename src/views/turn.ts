import chalk from 'chalk'
import inquirer from 'inquirer'

import { loser, winner } from '../utils/end.js'
import { actions } from '../utils/choices.js'
import { br, compareStats, sleep, tint } from '../utils/functions.js'
import { Character } from '../entities/characters.js'
import { BaseEntity } from '../entities/base.js'

// -----------------------------------------------------
//  Returns 0/1/2 depending of the choice of the player
// -----------------------------------------------------
const player_action = async () => {
    const action = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: actions,
    })

    return actions.indexOf(action.action)
}

// -----------------------------------------------------
//  Returns 0/1/2 depending of NPC selection (~ random)
// -----------------------------------------------------
const enemy_action = (enemy: BaseEntity) => {
    let choice: number
    const enemy_action_generator = Math.random()

    if ((enemy.health - enemy.dmgReceived) / enemy.health < 0.2) {
        // If less than 20% hp, always heals
        choice = 2
    } else if ((enemy.health - enemy.dmgReceived) / enemy.health > 0.6) {
        // If more than 60% hp, never heals
        choice = enemy_action_generator < 0.5 ? 0 : 1
    } else {
        choice = enemy_action_generator < 0.33 ? 0 : enemy_action_generator < 0.66 ? 1 : 2
    }
    return choice
}

interface TurnParams {
    entity: BaseEntity
    rival: BaseEntity
    is_player: boolean
    init_phrase: string
    attack_phrase: string
    magic_phrase: string
}

// -----------------------------------------------------
//  Executes a 'turn' logic checking the type of the attack (attack, magic, heal)
// -----------------------------------------------------
const execute_turn = async ({ entity, rival, is_player, init_phrase, attack_phrase, magic_phrase }: TurnParams) => {
    console.log(init_phrase)
    await sleep()

    const choice = is_player ? await player_action() : enemy_action(entity)

    let damage: number = 0
    let dmgReceived: number = 0

    switch (choice) {
        case 0:
            console.log(attack_phrase)
            damage = entity.attack()
            if (!damage) {
                console.log(`The ${chalk.red('attack')} missed!`)
                break
            }
            dmgReceived = rival.receiveAttack(damage)
            console.log(`It did ${chalk.red(dmgReceived.toString())} of damage!`)
            console.log(`${rival.name} HP: ${chalk.cyan(`${rival.health - rival.dmgReceived} / ${rival.health}`)}`)
            break
        case 1:
            console.log(magic_phrase)
            damage = entity.magic()
            if (!damage) {
                console.log(`The ${chalk.blue('magic')} missed!`)
                break
            }
            dmgReceived = rival.receiveMagic(damage)
            console.log(`It did ${chalk.blue(dmgReceived.toString())} of damage!`)
            console.log(`${rival.name} HP: ${chalk.cyan(`${rival.health - rival.dmgReceived} / ${rival.health}`)}`)
            break
        case 2:
            console.log('Healing...')
            console.log(chalk.cyan('Healed: ') + entity.heal())
            break
    }
    br()
	await sleep()
}

// -----------------------------------------------------
//  The main function: depending of the speed, executes 2 turns (player and NPC) in correct order
// -----------------------------------------------------
export const turn = async (player: Character, enemy: BaseEntity) => {
    const player_turn_params = {
        entity: player,
        rival: enemy,
        is_player: true,
        init_phrase: `Hey ${chalk.cyan(player.name)}, is your turn!\n`,
        attack_phrase: `You are ${chalk.red('attacking')}!`,
        magic_phrase: `You are using ${chalk.blue('magic')}!`,
    }

    const enemy_turn_params = {
        entity: enemy,
        rival: player,
        is_player: false,
        init_phrase: `${chalk.red(enemy.name)} is thinking...\n`,
        attack_phrase: `He is ${chalk.red('attacking')}!`,
        magic_phrase: `He is using ${chalk.blue('magic')}!`,
    }

    if (enemy.speed > player.speed) {
        // Enemy attacks first
        await execute_turn(enemy_turn_params)

        if (player.health - player.dmgReceived === 0) {
            loser(player)
            return { won: false }
        }

        await execute_turn(player_turn_params)

        if (enemy.health - enemy.dmgReceived === 0) {
            winner(enemy)
            return { won: true }
        }
    } else {
        // player attacks first: reversed order
        await execute_turn(player_turn_params)

        if (enemy.health - enemy.dmgReceived === 0) {
            winner(enemy)
            return { won: true }
        }

        await execute_turn(enemy_turn_params)

        if (player.health - player.dmgReceived === 0) {
            loser(player)
            return { won: false }
        }
    }

    console.log('\n\n\n\n\n')
    compareStats(player, enemy)
    return false
}
