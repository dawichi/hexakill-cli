class Base_Enemy {
    constructor(name, level) {
        this.name = name
        this.level = level
        this.dmgRecieved = 0
        this.health = 200
        this.ad = 60
        this.ap = 20
        this.armor = 10
        this.mr = 10
        this.exp = 0
    }
}

export class Slime extends Base_Enemy {
    constructor(name, level = 1) {
        super(name, level)
    }
}
