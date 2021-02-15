
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Userslist() {
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const url = "http://localhost:3001/get"
    
   
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setUsers(res.data);
        console.log(res.data)
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true)
      })
  }, []);
 
    return (
       

        <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th> email</th>
                            <th>Mot de passe</th>
                           
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                    {users.map((usr,index) =>
                        <tr key={usr.id} key={index}>
                        <td>  {usr.nom} </td>
                        <td>  {usr.prenom} </td>
                        <td>{usr.email}</td>
                        <td>{usr.password}</td>
                        
                        <td><button>Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>



        
             
            
    )
        }
          
    



