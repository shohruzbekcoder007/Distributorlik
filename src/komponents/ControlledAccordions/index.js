import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from './../../baseUrl';
import KeyBoard from './../KeyBoard';
import { LoginInput } from './styles';
import { setTasdiqlashArray, getTasdiqlashArray, getOneTasdiqlashMiqdori, clearTasdiqlashArray } from './../../globalState';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: 30
  },
  accordion:{
    backgrounfColor: "#000",
    color: "red"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {

  const [clients, setClients] = React.useState([]);
    
    const getClient = () => {
        axios.get(`/order/get-order/${props._id}`)
        .then( response => {
            console.log(response.data,"<-----");
            setClients(response.data);
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    React.useEffect(() => {
        getClient();
        console.log(props._id) 
    },[props._id])

  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      {
        clients.map(elem => {
          return <AccordionItem setTasdiqlanganlar={(arg)=>{props.setTasdiqlanganlar(arg)}} surovlar={elem.sell_orders} name={elem.name} soni={elem.count} key={elem.id}/>
        })
      }
    </div>
  );
}

const AccordionItem = (props) => {

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === ('panel'+props.key)} onChange={handleChange('panel'+ props.key)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{props.name}</Typography>
        <Typography className={classes.secondaryHeading}>So'rovlar soni {props.soni} ta</Typography>
      </AccordionSummary>
      <AccordionDetails style={{padding: "0 5px 5px 5px"}}>
        <OrderList setTasdiqlanganlar={props.setTasdiqlanganlar} orders={props.surovlar} getOrderId={(arg) => {props.getOrderId(arg)}}/>
      </AccordionDetails>
    </Accordion>
  );
}

const OrderList = (props) => {

  return (
      <div className="table-responsive">
          <table class="table table-striped table-hover text-center  mb-0">
              <thead>
                  <tr>
                      <td>T/R</td>
                      <td>Nomi</td>
                      <td>Suralgan miqdori</td>
                      <td>Berilgan miqdori</td>
                      <td>Narxi</td>
                  </tr>
              </thead>
              <tbody>
                  {
                      props.orders.map((elem, index)=>{
                          return (
                              <OrderListItem setTasdiqlanganlar={props.setTasdiqlanganlar} elem={elem} tr={index} getOrderId={(arg) => {props.getOrderId(arg)}}/>
                          )
                      })
                  }
              </tbody>
          </table>
      </div>
  )

}

const OrderListItem = (props) => {
  console.log(props)
  const [narx,setNarx] = React.useState(0);
  const [inputValue, setInputValue] = React.useState(0);
  const [keybord, setKeybord] = React.useState(0);
  React.useState(()=>{setInputValue(0);console.log("salom")},[props.elem]);
  return (
      <tr>
          <td>{props.tr+1}</td>
          <td>{props.elem.product.name}</td>
          <td>{props.elem.quantity}</td>
          <td>
              <div style={{position: "relative"}}>
                <input
                  value="salom"
                  onFocus={(event)=>{setKeybord(1)}}
                  value={inputValue}
                />
                {
                  (keybord == 1)?
                  <KeyBoard
                      setInputQiymati={
                          (arg)=>{
                              setNarx((+arg)*props.elem.price.price);
                              setInputValue(arg);
                              let elemId = props.elem.id;
                              let productId = props.elem.product.id;
                              let clientId = props.elem.client.id;
                              let narx = props.elem.price.id;
                              let quantity = props.elem.quantity;
                              let _given_quantity = arg;
                              setTasdiqlashArray(elemId,productId,clientId,narx,quantity,_given_quantity);
                              console.log(getTasdiqlashArray());
                              props.setTasdiqlanganlar(getTasdiqlashArray());
                          }}
                      closeKeyboard={()=>{setKeybord(0)}}
                  />:
                  <></>
                }
              </div>
          </td>
          <td>{narx}</td>
      </tr>
  )
}
