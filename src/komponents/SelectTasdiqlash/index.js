import React from 'react'
import {
    Selected,
    Selects,
    SelectList,
    SelectItem
} from './styles'

export default function SelectTasdiqlash() {
    const [selected, setSelected] = React.useState("Suralmoqda")
    const changeItem = (event) => setSelected(event.target.textContent)

    return (
        <Selects>
            <Selected>{selected}</Selected>
            <SelectList>
                <SelectItem value="10" onClick={changeItem}>Berilsin</SelectItem>
                <SelectItem value="20" onClick={changeItem}>Berilmasin</SelectItem>
                {/* <SelectItem value="30" onClick={changeItem}>Xujalik mollari va maishiy texnika</SelectItem>
                <SelectItem value="40" onClick={changeItem}>Siport anjomlari</SelectItem>
                <SelectItem value="50" onClick={changeItem}>O'quv qurollari</SelectItem>
                <SelectItem value="60" onClick={changeItem}>Kiyim-kechaklar</SelectItem> */}
            </SelectList>
        </Selects>
    )
}
