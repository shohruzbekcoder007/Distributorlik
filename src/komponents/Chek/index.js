import React from 'react'
import {
    ChekTitle,
    ChekWrapper,
    Malumot,
    ChekThem,
    ChekText,
    ChekTasdiq
} from './styles';

class Chek extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ChekWrapper>
                <ChekTitle>Omborxonadan chiqadigan maxsulot</ChekTitle>
                <Malumot>
                    <ChekThem>Agent:</ChekThem>
                    <ChekText>{this.props.maxsulot.client.responsible_agent}</ChekText>
                </Malumot>
                <Malumot>
                    <ChekThem>Maxsulot nomi:</ChekThem>
                    <ChekText>{this.props.maxsulot.product.name}</ChekText>
                </Malumot>
                <Malumot>
                    <ChekThem>O'lchami:</ChekThem>
                    <ChekText>{this.props.maxsulot.quantity+" "+this.props.maxsulot.product.unit}</ChekText>
                </Malumot>
                <Malumot>
                    <ChekThem>Xaridor:</ChekThem>
                    <ChekText>{this.props.maxsulot.client.name}</ChekText>
                </Malumot>
                <ChekTasdiq>
                    Omborchi tomonidan tasdiqlandi
                </ChekTasdiq>
            </ChekWrapper>
        )
    }
}

export default Chek;