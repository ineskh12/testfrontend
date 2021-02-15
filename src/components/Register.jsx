import React from "react";
import axios from 'axios';

import { Redirect } from "react-router-dom";
export class Register extends React.Component{
  

  constructor(props) {

    super(props);
  this.state={redirect: null,nom:null,prenom:null,email:null,pwd:null,direction:null,login:false,store:null}
  this.seconnecter = this.seconnecter.bind(this);}
  
  seconnecter = () => {

    axios.post('http://localhost:3001/register', {
     nom:this.state.nom,
    prenom:this.state.prenom,
      email:this.state.email,
      password:this.state.pwd,
      direction:this.state.direction,
      
    })
      .then((response) => {
        
       console.log('hi ines')
       this.setState({ login: true });
        setTimeout(() => {
          this.setState({ redirect: "/userslist"});
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
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
           
            <input type="nom" name="nom" placeholder="nom"  onChange={(val) => this.setState({ nom: val.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prenom</label>
           
            <input type="prenom" name="prenom" placeholder="prenom"  onChange={(val) => this.setState({ prenom: val.target.value })} />
          </div>

      

            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" onChange={(val) => this.setState({ email: val.target.value })}  required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
           
            <input type="password" name="password" placeholder="mot de passe"  onChange={(val) => this.setState({ pwd: val.target.value })} />
          </div>
       
          <select name="direction" id="direction"  onChange={(val) => this.setState({ direction: val.target.value })}>
   
    <option value="dre">Dre</option>
    <option value="drs">Drs</option>
    <option value="dsi">Dsi</option>
    
</select>
        </div>

      
   
      <button type="button" className="btn"   onClick={()=>{this.seconnecter()}} >
      registration
        </button>
     
    </div>
    );
  }}