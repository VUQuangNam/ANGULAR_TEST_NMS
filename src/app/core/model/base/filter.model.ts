export class FilterModel {
    text: string | undefined;
    type: string | undefined;
    condition?: string;
    value?: string;
    data?: ArrayModel | [];
}
export class ArrayModel {
    value: any;
    name: string | undefined;
}