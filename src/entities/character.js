import { Base_Entity } from './base.js'

export class Character extends Base_Entity {
    constructor(name, level = 5) {
        super(name, level)
    }

    // passive() {}

    // attack() {
    //     console.log('defend')
    // }

    // defend() {
    //     console.log('defend')
    // }

    // skillshot() {
    //     console.log('skillshot')
    // }

    // ultimate() {
    //     console.log('ultimate')
    // }
}
