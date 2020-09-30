import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { FunctionComponent, useState } from "react";
import ComboBox from "src/interfaces/FilterComboBox";

type ModalComboboxProps = {
    comboBox: ComboBox | undefined,
    onValueChanged: Function,
}

const ModalCombobox: FunctionComponent<ModalComboboxProps>  = ({ comboBox, onValueChanged }) => {
    const [value, setValue] = useState(comboBox === undefined? null : comboBox.selectedValue);

    const OnChangeHandler = (e, newValue) => {
        setValue(newValue);
        onValueChanged(comboBox === undefined? null : comboBox.name, newValue);
    }

    return (
        <Autocomplete

            className="input-combobox"
            value={value}
            options={comboBox === undefined? [] : comboBox.list.map(n => n.name)}
            onChange={OnChangeHandler}
            renderInput={(params) => <TextField {...params} label={comboBox === undefined? null : comboBox.name} variant="outlined" />}
        />
    );
}

export default ModalCombobox;