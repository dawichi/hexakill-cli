export class Character {
    constructor(name, level = 1) {
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

    gainExp() {}

    upLevel() {
        if (this.level < 18) {
            this.level++
            this.health += (40 * level) / 5
            this.ad += (5 * level) / 5
            this.ap += (25 * level) / 5
            this.armor += (5 * level) / 5
            this.mr += (5 * level) / 5
        }
    }

    getDamage(damage) {
        if (this.dmgRecieved + damage >= this.health) {
            this.dmgRecieved = this.health
        } else {
            this.dmgRecieved += damage
        }
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
