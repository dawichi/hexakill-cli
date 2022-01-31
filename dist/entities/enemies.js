import { Base_Entity, init_stat } from './base.js';
export class Slime extends Base_Entity {
    constructor(name = 'Slime', level = 1) {
        super(name, level);
        this.armor = init_stat(8, level);
        this.ap = init_stat(15, level);
    }
}
//# sourceMappingURL=enemies.js.map