import { action, observable } from 'mobx';

export const globalState = observable({
    user: {
        first_name: "",
        last_name: "",
        phone_number: "",
        role: ""
    },
    token: ""
});

export const setUser = action(({first_name, last_name, phone_number,
token}) => {
    globalState.user.first_name = first_name;
    globalState.user.last_name = last_name;
    globalState.user.phone_number = phone_number;
    globalState.token = token;
});

export const getToken = () => {return globalState.token}
export const getRoles = () => {return globalState.user.role}