import { Base_Entity } from './base.js'

export class Character extends Base_Entity {
    constructor(name, level = 1) {
        super(name, level)
        this.health = 200
        this.ad = 60
        this.ap = 20
        this.armor = 10
        this.mr = 10
        this.exp = 0
    }

    passive() {}

    attack() {
        console.log('defend')
    }

    defend() {
        console.log('defend')
    }

    skillshot() {
        console.log('skillshot')
    }

    ultimate() {
        console.log('ultimate')
    }
}
