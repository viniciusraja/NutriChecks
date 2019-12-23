import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Container } from './styles';
import Logo from '../../../assets/images/logo.png'
 

 export default class UserForm extends Component {
  state={
    name:'',
    email:'',
    password:''

  }

  handleChange= input => e =>{
    this.setState({[input]:e.target.value})
  }


  render() {
      const {name,email,password}=this.state; 

    return (
        <MuiThemeProvider>
          <React.Fragment>
            <Container>
            <img src={Logo}/>
            <TextField 
              hintText="Digite seu Nome"
              floatingLabelText="Nome"
              onChange={this.handleChange('name')}
              />
            <TextField 
              hintText="Digite seu E-mail"
              floatingLabelText="E-mail"
              onChange={this.handleChange('email')}
              />
            <TextField 
              hintText="Digite sua Senha"
              floatingLabelText="Senha"
              onChange={this.handleChange('password')}
              />

              <RaisedButton 
                label= 'LOGIN'
                primary={true}
                onClick={this.submit}
              />
              
            </Container>
          </React.Fragment>
        </MuiThemeProvider>
    )
}
}
