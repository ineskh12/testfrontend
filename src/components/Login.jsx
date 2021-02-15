import React from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
export class Login extends React.Component {
  constructor(props) {

    super(props);
  this.state={redirect: null,email:null,pwd:null,login:false,store:null}
  this.seconnecter = this.seconnecter.bind(this);}

 
  seconnecter = () => {

    axios.post('http://localhost:3001/login', {
   
      email:this.state.email,
      password:this.state.pwd,
      
    })
      .then((response) => {
        
       console.log('hi ines')
       this.setState({ login: true });
        setTimeout(() => {
          this.setState({ redirect: "/updateprofil"});
        }, 1);

      }).catch(error => {
        alert('erreur : ' + error)
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={(val) => this.setState({ email: val.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
             
              <input type="password" name="password" placeholder="mot de passe"  onChange={(val) => this.setState({ pwd: val.target.value })} />
            </div>
         
          </div>

        
     
        <button type="button" className="btn"   onClick={()=>{this.seconnecter()}} >
          se connecter
          </button>
       
      </div>
    );
  }
}