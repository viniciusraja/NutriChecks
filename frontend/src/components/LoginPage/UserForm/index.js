import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Container } from "./styles";
import Logo from "../../../assets/images/logo.png";
import { baseApiUrl } from "../../../global";
import axios from "axios";
import { Link } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  cadastro: true
};
export class UserForm extends Component {
  state = { ...initialState };

  login() {
    axios.post(`${baseApiUrl}/signin`, this.state)
      .then(res => {});
  }

  signUp=()=>{
    
    const { cadastro } = this.state;
    this.setState({ cadastro: !cadastro  })
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { name, email, password, cadastro } = this.state;
    switch (cadastro) {
      case false:
        return (
          <MuiThemeProvider>
            <React.Fragment>
              <Container>
                <img src={Logo} />
                <div>
                  <TextField
                    hintText="Digite seu E-mail"
                    floatingLabelText="E-mail"
                    onChange={this.handleChange("email")}
                  />
                  <TextField
                    hintText="Digite sua Senha"
                    floatingLabelText="Senha"
                    onChange={this.handleChange("password")}
                  />
                </div>
                <span>
                  <RaisedButton
                    label="LOGIN"
                    primary={true}
                    onClick={this.login}
                  />

                  <RaisedButton 
                   label="CADASTRE-SE" 
                   onClick={this.signUp} 
                  />
                </span>
              </Container>
            </React.Fragment>
          </MuiThemeProvider>
        );
      case true:
        return (
          <MuiThemeProvider>
            <React.Fragment>
              <Container>
                <img src={Logo} />
                <div>
                  <TextField
                    hintText="Digite seu Nome"
                    floatingLabelText="Nome"
                    onChange={this.handleChange("name")}
                  />
                  <TextField
                    hintText="Digite seu E-mail"
                    floatingLabelText="E-mail"
                    onChange={this.handleChange("email")}
                  />
                  <TextField
                    hintText="Digite sua Senha"
                    floatingLabelText="Senha"
                    onChange={this.handleChange("password")}
                  />
                </div>
                <span>
                    <RaisedButton 
                    label="CADASTRE-SE" 
                    onClick={this.signUp}
                    />
                </span>
              </Container>
            </React.Fragment>
          </MuiThemeProvider>
        );
    }
  }
}

export default UserForm;
