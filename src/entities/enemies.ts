import { Base_Entity } from './base.js'
import { config } from '../config.js'

const base = config.base

export class Slime extends Base_Entity {
    // good AP  =>  but weak vs AD
    constructor(level: number = 1, name: string = 'SLIME') {
        super(level, name)
        // + buff
        this.ap = level * (base.ap * 1.75)
        // - nerf
        this.health = level * (base.health * 0.75)
        this.armor = level * (base.armor * 0.75)
    }
}

export class Eagle extends Base_Entity {
    // fast and AD  =>  but low HP
    constructor(level: number = 1, name: string = 'EAGLE') {
        super(level, name)
        // + buff
        this.ad = level * (base.ad * 2)
        this.speed = level * (base.speed * 2)
        // - nerf
        this.health = level * (base.health * 0.5)
    }
}

export class Knight extends Base_Entity {
    // AD, HP and armor  =>  but low AP, MR and speed
    constructor(level: number = 1, name: string = 'KNIGHT') {
        super(level, name)
        // + buff
        this.health = level * (base.health * 2)
        this.ad = level * (base.ad * 1.25)
        this.armor = level * (base.armor * 1.5)
        // - nerf
        this.ap = level * (base.ap * 0.5)
        this.mr = level * (base.mr * 0.5)
        this.speed = level * (base.speed * 0.5)
    }
}
