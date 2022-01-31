export const init_stat = (num: number, level: number) => num + num * level * 0.3

export class Base_Entity {
	name: string
	level: number
	dmgRecieved: number
	health: number
	ad: number
	ap: number
	armor: number
	mr: number
	exp: number

    constructor(name: string, level: number) {
        this.name = name
        this.level = level
        this.dmgRecieved = 0
        this.health = init_stat(200, level)
        this.ad = init_stat(40, level)
        this.ap = init_stat(20, level)
        this.armor = init_stat(10, level)
        this.mr = init_stat(10, level)
        this.exp = init_stat(0, level)
    }

    _levelUp() {
        if (this.level < 18) {
            this.level++
            this.health += 200 * this.level * 0.1
            this.ad += 30 * this.level * 0.1
            this.ap += 40 * this.level * 0.1
            this.armor += 10 * this.level * 0.1
            this.mr += 10 * this.level * 0.1
        }
    }

    gainExp(exp: number) {
        if (this.exp + exp > 100) {
            this._levelUp()
            this.exp += exp - 100
			return true
        } else {
            this.exp += exp
			return false
        }
    }

    _getDamage(damage: number) {
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

    recieveAttack(damage: number) {
        if (damage > this.armor) {
            this._getDamage(damage - this.armor)
        }
    }

    recieveMagic(damage: number) {
        if (damage > this.mr) {
            this._getDamage(damage - this.mr)
        }
    }

    attack() {
        // Range of damage, [80% to 140%] of AD
        const min_hit = this.ad * 0.8
        const max_hit = this.ad * 1.4
        // Calc damage between the range
        const damage = parseInt((Math.floor(Math.random() * (max_hit - min_hit + 1)) + min_hit).toFixed(0))
        // Calc the chances. 10% critic, 10% misses
        const chances = Math.random()
        const critic = chances > 0.9
        const misses = chances < 0.1
        // return the correct damage done
        if (misses) return 0
        if (critic) return damage * 2
        return damage
    }

    magic() {
        // Range of damage, [30% to 200%] of AP
        const min_hit = this.ad * 0.3
        const max_hit = this.ad * 2
        // Calc damage between the range
        const damage = parseInt((Math.floor(Math.random() * (max_hit - min_hit + 1)) + min_hit).toFixed(0))
        // Calc the chances. 40% critic, 30% misses
        const chances = Math.random()
        const critic = chances > 0.6
        const misses = chances < 0.3
        // return the correct damage done
        if (misses) return 0
        if (critic) return damage * 2
        return damage
    }

    heal() {
        // Range of heal, [20% to 40%] of dmgRecieved
        const min_heal = this.dmgRecieved * 0.2
        const max_heal = this.dmgRecieved * 0.4
        // Calc heal between the range
        const heal = parseInt((Math.floor(Math.random() * (max_heal - min_heal + 1)) + min_heal).toFixed(0))
        this.dmgRecieved -= heal
        if (this.dmgRecieved < 0) {
            this.dmgRecieved = 0
        }
		return heal
    }
}