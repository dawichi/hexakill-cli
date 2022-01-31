import { Base_Entity } from './base.js'

export class Character extends Base_Entity {
    constructor(name: string, level: number = 5) {
        super(name, level)
    }
}
