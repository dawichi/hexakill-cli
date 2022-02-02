import { Base_Entity } from './base.js'
import { config } from '../config.js'

const base = config.base

export class Slime extends Base_Entity {
	// easy to kill, but good AP
    constructor(level: number = 1, name: string = 'SLIME', ) {
        super(level, name)
		// buff
        this.ap = level * base.ap + 25
		// nerf
        this.health = level * base.health - 80
        this.armor = level * base.armor - 3
        this.speed = level * base.speed - 1
    }
}

export class Eagle extends Base_Entity {
	// easy to kill, but good AD
	constructor(level: number = 1, name: string = 'EAGLE') {
		super(level, name)
		// buff
        this.ad = level *  base.ad + 15
        this.speed = level *  base.speed + 4
		// nerf
        this.health = level *  base.health - 60
        this.ap = level *  base.ap - 5
        this.armor = level *  base.armor - 3
        this.mr = level *  base.mr - 4
	}
}

export class Knight extends Base_Entity {
	// hard to kill, but low AP/MR
	constructor(level: number = 1, name: string = 'KNIGHT') {
		super(level, name)
		// buff
        this.health = level * base.health + 100
        this.ad = level * base.ad + 5
        this.armor = level * base.armor + 5
		// nerf
        this.ap = level * base.ap - 12
        this.speed = level * base.speed - 3
	}
}

