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
        if (exp_total >= 100) {
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

// Sick AP, low armor
export class Wizard extends Character {
	constructor(level: number, name: string) {
		super(level, `${name} (Wizard)`)
		this.ap = level * 25 // super buff
		this.armor = level * 2 // nerf
	}
}

// Sick AD, low MR
export class Thieve extends Character {
	constructor(level: number, name: string) {
		super(level, `${name} (Thieve)`)
		this.ad = level * 20 // super buff
		this.mr = level * 2 // nerf
		this.speed = level * 6 // buff
	}
}

// Sick resists and HP
export class Barbarian extends Character {
	constructor(level: number, name: string) {
		super(level, `${name} (Barbarian)`)
		this.ad = level * 7 // nerf
		this.ap = level * 9 // nerf
		this.health = level * 150  // super buff
		this.armor = level * 10  // super buff
		this.mr = level * 12 // super buff
		this.speed = level * 4 // nerf
	}
}