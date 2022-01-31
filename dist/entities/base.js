export const init_stat = (num, level) => parseInt((num * (Math.pow(1.1, level))).toFixed(0));
export class Base_Entity {
    constructor(name, level) {
        this.name = name;
        this.level = level;
        this.dmgRecieved = 0;
        this.health = init_stat(200, level);
        this.ad = init_stat(40, level);
        this.ap = init_stat(20, level);
        this.armor = init_stat(10, level);
        this.mr = init_stat(10, level);
        this.exp = init_stat(0, level);
    }
    _levelUp() {
        if (this.level < 18) {
            this.level++;
            this.health = parseInt((this.health * 1.25).toFixed(0));
            this.ad = parseInt((this.ad * 1.2).toFixed(0));
            this.ap = parseInt((this.ap * 1.25).toFixed(0));
            this.armor = parseInt((this.armor * 1.15).toFixed(0));
            this.mr = parseInt((this.mr * 1.15).toFixed(0));
        }
    }
    gainExp(exp) {
        let exp_total = this.exp + exp;
        if (exp_total > 100) {
            while (true) {
                this._levelUp();
                exp_total -= 100;
                if (exp_total < 100)
                    break;
            }
            this.exp = exp_total;
            return true;
        }
        else {
            this.exp += exp;
            return false;
        }
    }
    _getDamage(damage) {
        if (this.dmgRecieved + damage >= this.health) {
            // it's dead now
            this.dmgRecieved = this.health;
        }
        else {
            // still alive
            this.dmgRecieved += damage;
        }
    }
    recieveAttack(damage) {
        if (damage > this.armor) {
            this._getDamage(damage - this.armor);
        }
    }
    recieveMagic(damage) {
        if (damage > this.mr) {
            this._getDamage(damage - this.mr);
        }
    }
    attack() {
        // Range of damage, [80% to 140%] of AD
        const min_hit = this.ad * 0.8;
        const max_hit = this.ad * 1.4;
        // Calc damage between the range
        const damage = parseInt((Math.floor(Math.random() * (max_hit - min_hit + 1)) + min_hit).toFixed(0));
        // Calc the chances. 10% critic, 10% misses
        const chances = Math.random();
        const critic = chances > 0.9;
        const misses = chances < 0.1;
        // return the correct damage done
        if (misses)
            return 0;
        if (critic)
            return damage * 2;
        return damage;
    }
    magic() {
        // Range of damage, [30% to 200%] of AP
        const min_hit = this.ap * 0.3;
        const max_hit = this.ap * 2;
        // Calc damage between the range
        const damage = parseInt((Math.floor(Math.random() * (max_hit - min_hit + 1)) + min_hit).toFixed(0));
        // Calc the chances. 40% critic, 30% misses
        const chances = Math.random();
        const critic = chances > 0.6;
        const misses = chances < 0.3;
        // return the correct damage done
        if (misses)
            return 0;
        if (critic)
            return damage * 2;
        return damage;
    }
    heal() {
        // Range of heal, [20% to 40%] of dmgRecieved
        const min_heal = this.dmgRecieved * 0.2;
        const max_heal = this.dmgRecieved * 0.4;
        // Calc heal between the range
        const heal = parseInt((Math.floor(Math.random() * (max_heal - min_heal + 1)) + min_heal).toFixed(0));
        this.dmgRecieved -= heal;
        if (this.dmgRecieved < 0) {
            this.dmgRecieved = 0;
        }
        return heal;
    }
}
//# sourceMappingURL=base.js.map