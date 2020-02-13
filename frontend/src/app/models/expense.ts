import { propertyMap } from '../_helpers/model-mapper';

export enum SplitType {
    EQUAL = 'equal',
    EXACT = 'exact',
    PERCENTAGE = 'percentage'
}

export class Expense {
    @propertyMap('expense_id')
    id: number;
    title: string;
    total: number;
    payer: number;
    @propertyMap('group_id')
    groupId: number;
    split: SplitType;
    timestamp: string;
    // TODO: user userid instead
    shareMap: Map<any, any>;

    constructor(id?: number, groupId?: number) {
        this.id = id;
        this.groupId = groupId;
        this.shareMap = new Map();
    }

    // TODO: convert to generic util function
    toCustomObj() {
        return {
            id: this.id,
            title: this.title,
            total: this.total,
            payer: this.payer,
            groupId: this.groupId,
            split: this.split,
            shareMap: this.mapToObject(this.shareMap)
        };
    }

    private mapToObject(inputMap) {
        const obj = {};
        inputMap.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    }
}
