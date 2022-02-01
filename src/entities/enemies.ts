import { Base_Entity } from './base.js'

export class Slime extends Base_Entity {
	// easy to kill, but good AP
    constructor(level: number = 1, name: string = 'Slime', ) {
        super(level, name)
        this.health = level * 80 // nerf
        this.ap = level * 18 // buff
		this.armor = level * 3 // nerf
    }
}

export class Eagle extends Base_Entity {
	// easy to kill, but good AD
	constructor(level: number = 1, name: string = 'Eagle') {
		super(level, name)
        this.health = level * 70 // nerf
        this.ad = level * 22 // super buff
		this.mr = level * 3 // nerf
	}
}

export class Knight extends Base_Entity {
	// hard to kill, but low AP/MR
	constructor(level: number = 1, name: string = 'Knife') {
		super(level, name)
		this.health = level * 120 // buff
		this.armor = level * 8 // buff
		this.ap = level * 8 // nerf
		this.mr = level * 3 // nerf
	}
}

