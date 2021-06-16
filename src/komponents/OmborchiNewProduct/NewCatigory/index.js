import React, { useEffect } from 'react'
import {
    Catigory,
    CatigoryWrapper,
    CatigoryList,
    CatigoryItem,
    CatigoryItemInput,
    EditDeleteSave,
    CatigoryEdit,
    CatigoryDelete,
    CatigorySave,
    AddCatigory,
    CatigoryClose,
    Addbutton
} from './styles'
import ProgresBar from './../../ProgresBar'
import axios from "./../../../baseUrl";
import { getToken } from "./../../../globalState"
import TasdiqlashOynasi from '../../TasdiqlashOynasi';

export default function NewCatigory() {

    const [catigorys, setCatigoriys] = React.useState([]);
    const [newCatgName, setNewCatgName] = React.useState("");
    const [newCatg, setNewCatg] = React.useState({});
    const [create, setCreate] = React.useState(true);

    useEffect(() => {
        axios.get('product/category-list/', {
            // headers: {
            //     'Authorization': `token ${getToken()}`
            // }
        })
        .then((res) => {
            setCatigoriys(res.data);
        })
        .catch((error) => {
            setCatigoriys([]);
            console.error(error)
        })
    }, [newCatg]);

    const createCatigory = () => {
        setCreate(false)
        axios.post(`/product/category-list/`,{
            name: newCatgName,
        },{
            // headers: {
            //   'Authorization': `Basic ${getToken()}` 
            // }
        })
        .then( response => {
            if(response.data.id > 0){
                setCreate(true);
                setNewCatg(response.data);
                alert("Maxsuot sinfi yaratildi!")
            }
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }
    let tartibRaqami = 0;
    return (
        <CatigoryWrapper>
            <Catigory>
                {create?
                <AddCatigory>
                    <CatigoryItemInput onChange={(e)=>{setNewCatgName(e.target.value)}}/>
                    <Addbutton onClick  ={createCatigory}>Save</Addbutton>
                </AddCatigory>:
                <ProgresBar/>
                }
                <CatigoryList>
                    {catigorys.map((elem) => {
                        tartibRaqami ++;
                        return <OneCatigory key={elem.id} catg={elem} tartibRaqami={tartibRaqami}/>
                    })}
                </CatigoryList>
            </Catigory>
        </CatigoryWrapper>
    )
}

const OneCatigory = (props) => {
    const [catg, setCatg] = React.useState(props.catg);
    const [one, setOne] = React.useState(true);
    const [have, setHave] = React.useState(true);
    const [editName, setEditName] = React.useState(catg.name);
    const [tasdiq, setTasdiq] = React.useState(false);
    const [tartibRaqami, setTartibRaqami] = React.useState(props.tartibRaqami);

    const deleteCategory = (_id) => {
        axios.delete(`/product/category-detail/${_id}/`).then((res)=>{
            if(res.status == 204){
                setHave(false);
                alert("Maxsulot sinfi o'chirildi!")
            }
        }).catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    };

    const updateCategory = (_id) => {
        axios.put(`/product/category-detail/${_id}/`, {
            id: _id,
            name: editName
        }).then(res => {
            setCatg(res.data);
            setOne(true);
            alert("O'zgarishlar saqlandi!");
        }).catch((error) => {
            console.log({ errorMessage: error.toString()});
            console.error('There was an error!', error);
        });
    }
    if(have == true){
        return (
            <>
            <CatigoryItem>
                {
                    one?
                        <CatigoryItemInput disabled value={catg.name}/>:
                        <CatigoryItemInput value={editName} onChange={(event)=>{setEditName(event.target.value);console.log(event.target.value)}}/>
                }
                <EditDeleteSave>
                    {
                        one?
                        <>
                            <CatigoryEdit onClick={()=>{setOne(false)}}>
                                <i className="fas fa-edit"></i>
                            </CatigoryEdit>
                            <CatigoryDelete onClick={()=>{
                                    // deleteCategory(catg.id);
                                    setTasdiq(true);
                                }}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </CatigoryDelete>
                            {
                                tasdiq?
                                <TasdiqlashOynasi
                                    text="O'chirilgan malumotlar qayta tiklanmaydi. O'chirishni tasdiqlaysizmi?"
                                    closeFunc={() => {
                                        setTasdiq(false);
                                    }}
                                    submitFunc={() => {
                                        setTasdiq(false);
                                        deleteCategory(catg.id);
                                    }}
                                    buttunBirText="Tasdiqlamayman"
                                    buttunIkkiText="Tasdiqlayman"
                                />:<></>
                            }
                        </>:
                        <>
                            <CatigorySave onClick={()=>{updateCategory(catg.id)}}>
                                <i className="fas fa-save"></i>
                            </CatigorySave>
                            <CatigoryClose onClick={()=>{setOne(true)}}>
                                <i className="fas fa-times"></i>
                            </CatigoryClose>
                        </>
                    }
                    
                </EditDeleteSave>
            </CatigoryItem>
            </>
        )
    }else{
        return(
            <></>
        )
    }
}