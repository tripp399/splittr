import { propertyMap } from '../_helpers/model-mapper';

export class Payment {
    @propertyMap('payment_id')
    id: number;
    note: string;
    amount: number;
    payer: number;
    payee: number;
    @propertyMap('group_id')
    groupId: number;
    timestamp: string;

    constructor(id?: number, groupId?: number) {
        this.id = id;
        this.groupId = groupId;
    }
}
