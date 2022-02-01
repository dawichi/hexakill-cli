import { Base_Entity } from './base.js'

export class Character extends Base_Entity {
    exp: number

    constructor(level: number, name: string) {
        super(level, name)
        this.exp = 0
    }

    _levelUp() {
		this.level++
		this.health += 100
		this.ad += 10
		this.ap += 15
		this.armor += 5
		this.mr += 5
    }

    gainExp(exp: number) {
        let exp_total = this.exp + exp
        if (exp_total > 100) {
            while (true) {
                this._levelUp()
                exp_total -= 100
                if (exp_total < 100) break
            }
            this.exp = exp_total
            return true
        } else {
            this.exp += exp
            return false
        }
    }
}

// Sick AP
class Wizard extends Character {
	constructor(level: number, name: string) {
		super(level, name)
		this.ap = level * 25
	}
}

// Sick AD
class Thieve extends Character {
	constructor(level: number, name: string) {
		super(level, name)
		this.ad = level * 20
	}
}

// Sick resists and HP
class Barbarian extends Character {
	constructor(level: number, name: string) {
		super(level, name)
		this.health = level * 150
		this.armor = level * 10
		this.mr = level * 12
	}
}