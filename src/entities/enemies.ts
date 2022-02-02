import { Base_Entity } from './base.js'
import { config } from '../config.js'

const base = config.base

export class Slime extends Base_Entity {
	// easy to kill, but good AP
    constructor(level: number = 1, name: string = 'SLIME', ) {
        super(level, name)
    }

    _levelUp() {
        this.level++
        this.health += base.health - 80
        this.ad += base.ad
        this.ap += base.ap + 25
        this.armor += base.armor - 3
        this.mr += base.mr
        this.speed += base.speed - 1
    }
}

export class Eagle extends Base_Entity {
	// easy to kill, but good AD
	constructor(level: number = 1, name: string = 'EAGLE') {
		super(level, name)
	}

    _levelUp() {
        this.level++
        this.health += base.health - 60
        this.ad += base.ad + 15
        this.ap += base.ap - 5
        this.armor += base.armor - 3
        this.mr += base.mr - 4
        this.speed += base.speed + 4
    }
}

export class Knight extends Base_Entity {
	// hard to kill, but low AP/MR
	constructor(level: number = 1, name: string = 'KNIGHT') {
		super(level, name)
		this.armor = level * 8 // buff
		this.ap = level * 8 // nerf
		this.mr = level * 3 // nerf
		this.mr = level * 2 // nerf
	}

    _levelUp() {
        this.level++
        this.health += base.health + 100
        this.ad += base.ad + 5
        this.ap += base.ap - 12
        this.armor += base.armor + 5
        this.mr += base.mr
        this.speed += base.speed - 3
    }
}

