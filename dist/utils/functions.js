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
import inquirer from 'inquirer';
export const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
export const br = () => console.log('------------------------------------------------------------------------------');
export const pause = () => __awaiter(void 0, void 0, void 0, function* () {
    const pause = yield inquirer.prompt({
        name: 'pause',
        type: 'input',
        message: 'Press ENTER to continue...',
    });
});
export const tint = (text, background, color = '') => {
    if (color)
        return chalk[background](` ${chalk[color](text)} `);
    return chalk[background](` ${text} `);
};
export const level_up = (player) => `
-------------------------------------------
LEVEL UP!!! ${player.level - 1}  =>  ${player.level}
-------------------------------------------
`;
export const printStats = (player) => console.table({
    name: player.name,
    level: player.level,
    health: `${player.health - player.dmgRecieved}/${player.health}`,
    AD: player.ad,
    AP: player.ap,
    armor: player.armor,
    MR: player.mr,
    exp: `${player.exp}/100`,
});
//TODO:don't show Index
export const compareStats = (player, enemy) => console.table([
    {
        name: player.name,
        level: player.level,
        health: `${player.health - player.dmgRecieved}/${player.health}`,
        AD: player.ad,
        AP: player.ap,
        armor: player.armor,
        MR: player.mr,
        exp: `${player.exp}/100`,
    },
    {
        name: enemy.name,
        level: enemy.level,
        health: `${enemy.health - enemy.dmgRecieved}/${enemy.health}`,
        AD: enemy.ad,
        AP: enemy.ap,
        armor: enemy.armor,
        MR: enemy.mr,
        exp: ` - `,
    },
]);
//# sourceMappingURL=functions.js.map