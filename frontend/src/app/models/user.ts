import { propertyMap } from '../_helpers/model-mapper';
import { Group } from './group';

export class User {
    @propertyMap('user_id')
    id: number;
    username: string;
    name: string;
    token: string;
    groups: Set<Group>;

    constructor(id?: number) {
        this.id = id ? id : undefined;
        this.groups = new Set();
    }
}
