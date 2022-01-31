const init_stat = (num, level) => num + num * level * 0.1

export class Base_Entity {
    constructor(name, level) {
        this.name = name
        this.level = level
        this.dmgRecieved = 0
        this.health = init_stat(200, level)
        this.ad = init_stat(60, level)
        this.ap = init_stat(20, level)
        this.armor = init_stat(10, level)
        this.mr = init_stat(10, level)
        this.exp = init_stat(0, level)
    }

    gainExp(exp) {
        if (this.exp + exp > 100) {
            this._levelUp()
            this.exp += exp - 100
        } else {
            this.exp += exp
        }
    }

    _levelUp() {
        if (this.level < 18) {
            this.level++
            this.health += 200 * this.level * 0.1
            this.ad += 40 * this.level * 0.1
            this.ap += 40 * this.level * 0.1
            this.armor += 10 * this.level * 0.1
            this.mr += 10 * this.level * 0.1
        }
    }

    getDamage(damage) {
        damage = parseInt(damage)
        if (this.dmgRecieved + damage >= this.health) {
            this.dmgRecieved = this.health
            // it's dead now
            return true
        } else {
            this.dmgRecieved += damage
            // still alive
            return false
        }
    }

    attack() {
        // Range of damage, [0.8 to 1.4] AD dmg
        const min_hit = this.ad * 0.8
        const max_hit = this.ad * 1.4
        // Calc damage between the range
        const damage = (Math.floor(Math.random() * (max_hit - min_hit + 1)) + min_hit).toFixed(0)
        // Calc the chances. 10% critic, 10% misses
        const chances = Math.random()
        const critic = chances > 0.9
        const misses = chances < 0.1
        // return the correct damage done
        if (misses) return 0
        if (critic) return damage * 2
        return damage
    }
}
