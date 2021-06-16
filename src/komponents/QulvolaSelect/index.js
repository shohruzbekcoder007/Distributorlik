import React from 'react'
import { SelectInput, SelectWrapper, SelectList, SelectListItem, SelectSearch } from './styles'
import { setClientSearchText, globalState } from './../../globalState';
import logo from "./../../img/search.svg";

export default function QulvolaSelect(props) {

    const [list, setList] = React.useState(false);
    const [selectValue, setSelectValue] = React.useState("");

    return (
        <div>
            <SelectWrapper>
                <SelectSearch onClick = {()=>{
                    console.log("search bosildi")
                    props.searchInputUchun();
                    console.log(globalState.clientSearchText, "select search")
                }}>
                    <img src={logo}/>
                </SelectSearch>
                <SelectInput
                    placeholder={props.placeholder}
                    value={selectValue}
                    onChange={(event) => {
                        setSelectValue(event.target.value);
                        setClientSearchText(event.target.value);
                        console.log(globalState.clientSearchText)
                    }}
                    
                    onClick={()=>{
                        if(list){
                            setList(false);
                        } else {
                            setList(true);
                        }
                    }}
                />
                {
                    list?
                        <SelectList>
                            {
                                props.options.map(elem => {
                                    return <SelectListItem
                                                onClick={() => {
                                                    setSelectValue(elem.label)
                                                    setList(false);
                                                    props.funcValue(elem.value);
                                                }}
                                            >
                                                {elem.label}
                                            </SelectListItem>
                                })
                            }
                        </SelectList>:
                        <></>
                }
            </SelectWrapper>
        </div>
    )
}