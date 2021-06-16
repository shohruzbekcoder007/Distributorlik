import React, { useState } from 'react'
import {
    MenuLeft,
    LeftMenuHeader,
    LeftMenuHeaderText,
    LeftMenuHeaderClose,
    LeftMenuList,
    LeftMenuListItem
  } from "./styles";

export default function LeftMenu(props) {    
    return (
        <MenuLeft
          animate={props.close ? "true" : "false"}
        >
            <LeftMenuHeader>
              <LeftMenuHeaderText>Feruz Savdo</LeftMenuHeaderText>
              <LeftMenuHeaderClose
                onClick={() => {
                  props.functionClose(true);
                }}
              >
                <i className="fas fa-window-close"></i>
            </LeftMenuHeaderClose>
          </LeftMenuHeader>
          <LeftMenuList>
              {props.lists.map(elem => {
                return <LeftMenuItem key = {elem.value} name={elem.name} value={elem.value} func={(arg)=>{props.getSelectItem(arg); props.functionClose(true);}}/>
              })}
          </LeftMenuList>
        </MenuLeft>
    )
}

const LeftMenuItem = (props) => {
  return (
    <LeftMenuListItem onClick={() => {props.func(props.value);}}>
      {props.name}
    </LeftMenuListItem>
  )
}
