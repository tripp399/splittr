import { User } from './user';
import { propertyMap } from '../_helpers/model-mapper';

export class Group {
    @propertyMap('group_id')
    id: number;
    name: string;
    members: Set<User>;

    // constructor();
    // constructor(id?: number);
    constructor(id?: number, name?: string) {
        this.id = id ? id : undefined;
        this.name = name ? name : undefined;
        this.members = new Set<User>();
    }
}
