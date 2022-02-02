import { Base_Entity } from './base.js'
import { config } from '../config.js'

const base = config.base

export class Character extends Base_Entity {
    exp: number

    constructor(level: number, name: string) {
        super(level, name)
        this.exp = 0
    }

    _levelUp() {
        this.level++
        this.health += base.health
        this.ad += base.ad
        this.ap += base.ap
        this.armor += base.armor
        this.mr += base.mr
        this.speed += base.speed
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
    }

    _levelUp() {
        this.level++
        this.health += base.health - 80
        this.ad += base.ad - 5
        this.ap += base.ap + 20
        this.armor += base.armor
        this.mr += base.mr
        this.speed += base.speed
    }
}

// Sick AD, low MR
export class Thieve extends Character {
    constructor(level: number, name: string) {
        super(level, `${name} (Thieve)`)
    }

    _levelUp() {
        this.level++
        this.health += base.health - 50
        this.ad += base.ad + 20
        this.ap += base.ap - 5
        this.armor += base.armor
        this.mr += base.mr
        this.speed += base.speed + 3
    }
}

// Sick resists and HP
export class Barbarian extends Character {
    constructor(level: number, name: string) {
        super(level, `${name} (Barbarian)`)
    }

    _levelUp() {
        this.level++
        this.health += base.health + 80
        this.ad += base.ad - 5
        this.ap += base.ap - 8
        this.armor += base.armor + 5
        this.mr += base.mr + 5
        this.speed += base.speed - 3
    }
}
