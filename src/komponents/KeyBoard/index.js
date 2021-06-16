import React from 'react'
import { KeyBoardWrapper, KeyboardRow, KeyBox, KeyBoxTxt } from './styles.js'

export default function Button(props) {
    const [keyValue, setKeyValue] = React.useState("");

    return (
        <KeyBoardWrapper>
            <KeyboardRow>
                <KeyBoardButton asosiy={1} value={"<-"} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton asosiy={1} value={"X"}  func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg); props.closeKeyboard()}} prevValue={keyValue}/>
            </KeyboardRow>
            <KeyboardRow>
                <KeyBoardButton value={1} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={2} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={3} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
            </KeyboardRow>
            <KeyboardRow>
                <KeyBoardButton value={4} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={5} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={6} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
            </KeyboardRow>
            <KeyboardRow>
                <KeyBoardButton value={7} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={8} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={9} func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
            </KeyboardRow>
            <KeyboardRow>
                <KeyBoardButton value={"."}  func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={0}    func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
                <KeyBoardButton value={"C"}  func={(arg)=>{setKeyValue(arg); props.setInputQiymati(arg)}} prevValue={keyValue}/>
            </KeyboardRow>
        </KeyBoardWrapper>
    )
}

const KeyBoardButton = (props) => {

    const keyPressFunc = (prevValue, qiymat) => {
        if(qiymat == "C") return "";
        if(qiymat == "X") return prevValue;
        if(qiymat == "<-") return prevValue.slice(0, prevValue.length-1);
        return prevValue + '' + qiymat;
    }

    return (
        <KeyBox
        style={props.asosiy?{width: "120px", color: "red"}:{}}
            onClick={(event)=>{props.func(keyPressFunc(props.prevValue,props.value))}}
        >
            <KeyBoxTxt>{props.value}</KeyBoxTxt>
        </KeyBox>
    )
}
