import React from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { setSearch, setPlus, globalState } from "./../../globalState";
// import { globalState } from './../../globalState'
import {
  TopHeader,
  TopHeaderText,
  SearchKomponents,
  TopHeaderTel,
  MenuBar,
  LeftSideBarHeader,
  SearchButton,
  LeftSideBarImg,
  SearchHeader,
  TopHeaderAdd,
  SearchButtonIconc,
  Scret,
  SearchMeadia,
  SearchButtonIconcClose
} from "./styles";
import logo from "./../../img/Logo-lider.svg";

const _Header = (props)  => {
  const history = useHistory();
  let changeText = "";
  const [plusLocal, setPlusLocal] = React.useState(true);
  const [searchLocal, setSearchLocal] = React.useState(false);

  return (
    <TopHeader>
      <LeftSideBarHeader>
        <LeftSideBarImg src={logo} />
      </LeftSideBarHeader>
      <TopHeaderText>{props.rolName}</TopHeaderText>
      {props.search == true ? (
        <div>
          <SearchMeadia style={searchLocal?{display: "block"}:{}}>
            <SearchKomponents>
              <SearchHeader
                className="header-search"
                placeholder="Izlash"
                onChange={(event) => {
                  changeText = event.target.value;
                }}
              />
              {/* <SearchButton
                onClick={() => {
                  setSearch(changeText);
                }}
              /> */}
            </SearchKomponents>
          </SearchMeadia>
        </div>
      ) : (
        <></>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContenet: "center",
        }}
      >
        {/* <Scret
          onClick={()=>{
            setSearchLocal(!searchLocal);
          }}>
          {
            searchLocal?
            <SearchButtonIconcClose>
              <i class="fas fa-times"></i>
            </SearchButtonIconcClose>:
            <SearchButtonIconc
              
            />
          }
             */}
            
        {/* </Scret> */}
        {props.plus == true ? (
          <TopHeaderAdd
            onClick={() => {
              setPlus(!globalState.plus);
              setPlusLocal(!plusLocal);
            }}
            style={{ marginRight: "20px" }}
          >
            {
              globalState.plus?
              <i class="fas fa-minus"></i>:
                <i class="fas fa-plus"></i>
            }
          </TopHeaderAdd>
        ) : (
          <></>
        )}
        <TopHeaderTel
          href="/"
        >
          <i class="fas fa-sign-out-alt"></i>
        </TopHeaderTel>
      </div>
    </TopHeader>
  );
}

export default observer(_Header);