import React from 'react'
import {
    ChekTitle,
    ChekWrapper,
    Malumot,
    ChekThem,
    ChekText,
    ChekTasdiq,
    ChekCard
} from './styles';

class ChekAll extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.maxsulot,"<----maxsulot--->")
        return (
            <ChekWrapper>
                {
                    this.props.maxsulot.map(element => {
                        console.log(element);
                        if(element != undefined)
                        return <ChekCard>
                            <ChekTitle style={{color: "#000"}}>Omborxonadan chiqadigan maxsulot</ChekTitle>
                            <Malumot>
                                <ChekThem>Agent:</ChekThem>
                                <ChekText>{element.client.responsible_agent}</ChekText>
                            </Malumot>
                            <Malumot>
                                <ChekThem>Maxsulot nomi:</ChekThem>
                                <ChekText>{element.product.name}</ChekText>
                            </Malumot>
                            <Malumot>
                                <ChekThem>O'lchami:</ChekThem>
                                <ChekText>{element.quantity+" "+element.product.unit}</ChekText>
                            </Malumot>
                            <Malumot>
                                <ChekThem>Xaridor:</ChekThem>
                                <ChekText>{element.client.name}</ChekText>
                            </Malumot>
                            <ChekTasdiq>
                                Omborchi tomonidan tasdiqlandi
                            </ChekTasdiq>
                        </ChekCard>
                        else 
                        return <></>
                    })
                }
            </ChekWrapper>
        )
    }
}

export default ChekAll;