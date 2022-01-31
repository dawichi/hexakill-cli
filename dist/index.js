#!/usr/bin/env node
//  ________      ________      ___       __       ___      ________      ___  ___      ___
// |\   ___ \    |\   __  \    |\  \     |\  \    |\  \    |\   ____\    |\  \|\  \    |\  \
// \ \  \_|\ \   \ \  \|\  \   \ \  \    \ \  \   \ \  \   \ \  \___|    \ \  \\\  \   \ \  \
//  \ \  \ \\ \   \ \   __  \   \ \  \  __\ \  \   \ \  \   \ \  \        \ \   __  \   \ \  \
//   \ \  \_\\ \   \ \  \ \  \   \ \  \|\__\_\  \   \ \  \   \ \  \____    \ \  \ \  \   \ \  \
//    \ \_______\   \ \__\ \__\   \ \____________\   \ \__\   \ \_______\   \ \__\ \__\   \ \__\
//     \|_______|    \|__|\|__|    \|____________|    \|__|    \|_______|    \|__|\|__|    \|__|
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { welcome } from './views/welcome.js';
import { Slime } from './entities/enemies.js';
import { fight_turn } from './views/fight_turn.js';
import { br, compareStats, level_up, sleep, tint } from './utils/functions.js';
const fight = (player, enemy) => __awaiter(void 0, void 0, void 0, function* () {
    // init the combat
    let combat = true;
    while (combat) {
        const fight = yield fight_turn(player, enemy);
        if (!fight)
            continue;
        if (fight.won) {
            yield sleep(3000);
            console.clear();
            const exp_gained = parseInt((enemy.health / player.level / 2).toFixed(0));
            console.log(`\n\n\n Well played! You have gained ${chalk.green(exp_gained)}`);
            console.log(`${player.name} exp: ${player.exp}/100 => ${player.exp + exp_gained}/100 \n\n\n`);
            const levelup = player.gainExp(exp_gained);
            if (levelup) {
                console.log(gradient.cristal.multiline(level_up(player)), 'You level up! Well done! ^^');
                if (player.level > 18) {
                    figlet('winner', (err, data) => {
                        console.log(gradient.pastel.multiline(data) + '\n');
                        console.log(chalk.green(`Congrats ${player.name}! You have won hexakill!`));
                        process.exit(0);
                    });
                }
            }
            yield sleep(4000);
            combat = false;
        }
        else {
            console.log('Better luck next time!!!\n\n');
            process.exit();
        }
    }
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    let player = yield welcome();
    // let player = new Character('Dawichi')
    let enemy;
    let playing = true;
    while (playing) {
        const min_enemy_level = Math.floor(player.level / 2);
        const max_enemy_level = player.level + 2;
        const enemy_level = parseInt((Math.floor(Math.random() * (max_enemy_level - min_enemy_level + 1)) + min_enemy_level).toFixed(0));
        enemy = new Slime('Slime', enemy_level);
        // present the enemy
        console.clear();
        console.log(`Careful! One ${tint(`${enemy.name} lv ${enemy.level}`, 'bgRed')} has appeared!`);
        compareStats(player, enemy);
        br();
        yield sleep();
        // lets fight it!
        yield fight(player, enemy);
    }
    console.log('END OF THE GAME');
});
run();
//# sourceMappingURL=index.js.map