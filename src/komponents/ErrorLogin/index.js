import React, { useState } from "react";
import {
  LoginContainer,
  LoginWrapper,
  LoginInput,
  LoginTitle,
  SubmitWrapper,
  SubmitButton,
  ErrorMessage,
} from "./styles";
import { observer } from "mobx-react";

import axios from "./../../baseUrl";
import { getToken, setUser } from "./../../globalState";

export default function ErrorLogin() {
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    user: {
      first_name: "",
      last_name: "",
      phone_number: "",
      role: "",
      id: 0,
    },
    token: "",
  });

  let username = "";
  let password = "";

  const loginFunc = () => {
    axios
      .post(
        `/user/login/`,
        {
          username: username,
          password: password,
        },
        {
          // headers: {
          //   Authorization: `Basic ${getToken()}`,
          // },
        }
      )
      .then((response) => {
        setData(response.data);
        setError(false);
        setUser(response);
        // props.roleDetermine(response.data.user.role);
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
        setError(true);
      });
  };

  return (
    <LoginWrapper>
      <LoginContainer style={{ width: "300px" }}>
        <LoginTitle>Kirish</LoginTitle>
        {error == true ? (
          <ErrorMessage>Qaytadan tekshirib kiriting</ErrorMessage>
        ) : (
          <></>
        )}
        <LoginInput
          onChange={(event) => {
            username = event.target.value;
          }}
          placeholder="Telefon nomeri"
        />
        <LoginInput
          onChange={(event) => {
            password = event.target.value;
          }}
          placeholder="Parol"
          type="password"
        />
        <SubmitWrapper>
          <SubmitButton
            onClick={() => {
              loginFunc();
            }}
          >
            Tasdiqlash
          </SubmitButton>
        </SubmitWrapper>
      </LoginContainer>
    </LoginWrapper>
  );
}

// export default observer(_Login)
