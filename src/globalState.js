import { action, observable, toJS } from "mobx";

export const globalState = observable({
  user: {
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "",
    id: "",
  },
  token: "",
  search: "",
  plus: false,
  buyArray: [],
  malochniArray: [],
  sotibOlish: [],
  qaytaribOlish: [],
  clientSearchText: "",
  tasdiqlangan: []
});

export const setUser = action((data) => {
  sessionStorage.setItem("role", data.data.user.role);
  sessionStorage.setItem("token", data.data.token);

  globalState.user = data.data.user;
  globalState.token = data.data.token;
});

export const getToken = () => {
  return toJS(globalState.token);
};

export const getRoles = () => {
  return toJS(globalState.user.role);
};

export const setSearch = (text) => {
  globalState.search = text;
};

export const setPlus = (text) => {
  globalState.plus = text;
};

export const getPlus = action(() => {
  return globalState.plus;
});



//omborchini uzi sotganda
export const setBuyArray = action((productId,clientId,narx,quantity) => {

  let elem = {
    quantity: +quantity,
    status: "delivered",
    client: clientId,
    product: productId,
    price: narx
  }

  let t = true;
  let ind = -1;

  for (let index = 0; index < globalState.buyArray.length; index++) {
    const element = globalState.buyArray[index];
    if(element.product == elem.product){
      t = false;
      ind = index;
    }
  }

  if(t){
    globalState.buyArray.push(elem);
  }else{
    delete globalState.buyArray[ind];
    if(elem.quantity != ""){
      globalState.buyArray[ind] = elem;
    }else{
      delete globalState.buyArray[ind];
      globalState.buyArray.splice(ind,1);
    }
  }

});

export const clearBuyArray = action(() => {
  delete globalState.buyArray.splice(0,globalState.buyArray.length);
})

export const getBuyArray = action(() => {

  let summa = 0;
  globalState.buyArray.forEach(elem => {
    console.log((+elem.quantity),(+elem.price))
    summa = summa + (+elem.quantity)*(+elem.price);
  });
  let elem = {
    soni: globalState.buyArray.length,
    summa: summa
  }
  return elem;
})

export const oneQuantity = action((_id) => {
  let qiymat = 0;
  globalState.buyArray.forEach(elem => {
    if(elem.product == _id){
      qiymat = elem.quantity;
    }
  })
  return qiymat;
})

export const getSumBuyArray = action(() => {
  return toJS(globalState.buyArray);
});

export const setClientForBuyProduct = action((_id) => {
  for (let index = 0; index < globalState.buyArray.length; index++) {
    globalState.buyArray[index].client = _id;
  }
});


//select qulvola uchun
export const getClientSearchText = action(() => {
  return globalState.clientSearchText;
});

export const setClientSearchText = action((arg) => {
  globalState.clientSearchText = arg;
});

// tasdiqlanayotganda ishlatiladi
export const setTasdiqlashArray = action((elemId,productId,clientId,narx,quantity,_given_quantity) => {

  let elem = {
    id: elemId,
    given_quantity: _given_quantity,
    quantity: +quantity,
    status: "delivered",
    client: clientId,
    product: productId,
    price: narx
  }

  let t = true;
  let ind = -1;

  for (let index = 0; index < globalState.tasdiqlangan.length; index++) {
    const element = globalState.tasdiqlangan[index];
    if(element.id == elem.id){
      t = false;
      ind = index;
    }
  }

  if(t){
    globalState.tasdiqlangan.push(elem);
  }else{
    delete globalState.tasdiqlangan[ind];
    if(elem.given_quantity != ""){
      globalState.tasdiqlangan[ind] = elem;
    }else{
      delete globalState.tasdiqlangan[ind];
      globalState.tasdiqlangan.splice(ind,1);
    }
  }

});

export const getTasdiqlashArray = action(() => {
  return toJS(globalState.tasdiqlangan);
});

export const clearTasdiqlashArray = action(() => {
  delete globalState.tasdiqlangan.splice(0,globalState.tasdiqlangan.length);
});

export const getOneTasdiqlashMiqdori = action((_id) => {
  let qiymat = 0;
  globalState.tasdiqlangan.forEach(elem => {
    if(elem.id == _id){
      qiymat = elem.given_quantity;
    }
  });
  return qiymat;
})

// malochni ertalab sotish uchun
export const setMalochniArray = action((productId,clientId,quantity) => {
  let elem = {
    quantity: +quantity,
    agent: clientId,
    product: productId,
  }

  let t = true;
  let ind = -1;

  for (let index = 0; index < globalState.malochniArray.length; index++) {
    const element = globalState.malochniArray[index];
    if(element.product == elem.product){
      t = false;
      ind = index;
    }
  }

  if(t){
    globalState.malochniArray.push(elem);
  }else{
    delete globalState.malochniArray[ind];
    if(elem.quantity != ""){
      globalState.malochniArray[ind] = elem;
    }else{
      delete globalState.malochniArray[ind];
      globalState.malochniArray.splice(ind,1);
    }
  }

});

export const clearMalochniArray = action(() => {
  delete globalState.malochniArray.splice(0,globalState.malochniArray.length);
});

export const getMalochniProducts = action(() => {
  return toJS(globalState.malochniArray);
})

export const oneQuantityMalochni = action((_id) => {
  let qiymat = 0;
  globalState.malochniArray.forEach(elem => {
    if(elem.product == _id){
      qiymat = elem.quantity;
    }
  })
  return qiymat;
})

export const getSumBuyMalochni = action(() => {
  return toJS(globalState.malochniArray);
});

export const setClientForMalochniProduct = action((_id) => {
  for (let index = 0; index < globalState.malochniArray.length; index++) {
    globalState.malochniArray[index].client = _id;
  }
});

export const getSumMalochniArray = action(() => {
  return toJS(globalState.malochniArray);
});

// sotib olish uchun
export const setSotibOlishArray = action((productId,quantity) => {
  let elem = {
    quantity: +quantity,
    product: productId,
  }

  let t = true;
  let ind = -1;

  for (let index = 0; index < globalState.sotibOlish.length; index++) {
    const element = globalState.sotibOlish[index];
    if(element.product == elem.product){
      t = false;
      ind = index;
    }
  }

  if(t){
    globalState.sotibOlish.push(elem);
  }else{
    delete globalState.sotibOlish[ind];
    if(elem.quantity != ""){
      globalState.sotibOlish[ind] = elem;
    }else{
      delete globalState.sotibOlish[ind];
      globalState.sotibOlish.splice(ind,1);
    }
  }

});

export const clearSotibOlishArray = action(() => {
  delete globalState.sotibOlish.splice(0,globalState.sotibOlish.length);
});

export const getSotibOlish = action(() => {
  return toJS(globalState.sotibOlish);
})

export const oneQuantitySotibOlish = action((_id) => {
  let qiymat = 0;
  globalState.sotibOlish.forEach(elem => {
    if(elem.product == _id){
      qiymat = elem.quantity;
    }
  })
  return qiymat;
})

export const setClientForSotibOlish = action((_id) => {
  for (let index = 0; index < globalState.sotibOlish.length; index++) {
    globalState.sotibOlish[index].client = _id;
  }
});

// maxsulotni qatrarish uchun QaytaribOlish
export const setQaytaribOlishArray = action((productId,returned_quantity,agentId) => {
  let elem = {
    returned_quantity: +returned_quantity,
    sell_order: productId,
    status: "unsold",
    agent: agentId
  }

  let t = true;
  let ind = -1;

  for (let index = 0; index < globalState.qaytaribOlish.length; index++) {
    const element = globalState.qaytaribOlish[index];
    if(element.sell_order == elem.sell_order){
      t = false;
      ind = index;
    }
  }

  if(t){
    globalState.qaytaribOlish.push(elem);
  }else{
    delete globalState.qaytaribOlish[ind];
    if(elem.returned_quantity != ""){
      globalState.qaytaribOlish[ind] = elem;
    }else{
      delete globalState.qaytaribOlish[ind];
      globalState.qaytaribOlish.splice(ind,1);
    }
  }

});

export const clearQaytaribOlishArray = action(() => {
  delete globalState.qaytaribOlish.splice(0,globalState.qaytaribOlish.length);
});

export const getQaytaribOlish = action(() => {
  return toJS(globalState.qaytaribOlish);
})

export const oneQuantityQaytaribOlish = action((_id) => {
  let qiymat = 0;
  globalState.qaytaribOlish.forEach(elem => {
    if(elem.sell_order == _id){
      qiymat = elem.quantity;
    }
  })
  return qiymat;
})

export const setClientForQaytaribOlish = action((_id) => {
  for (let index = 0; index < globalState.sotibOlish.length; index++) {
    globalState.sotibOlish[index].client = _id;
  }
});