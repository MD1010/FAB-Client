export default class FilterComboBox {
    name: string = "";
    list: Array<{id: string, name: string}>;
    selectedValue: string | null | undefined = null;

    constructor(name: string, list: Array<{id: string, name: string}>, selectedValue: string | null | undefined) {
        this.name = name;
        this.list = list;
        this.selectedValue = selectedValue;
    }
}