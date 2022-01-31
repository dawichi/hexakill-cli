import { Base_Entity } from './base.js'

export class Character extends Base_Entity {
    constructor(name, level = 3) {
        super(name, level)
    }
}
