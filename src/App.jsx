import React from "react";
import { Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

 
 

  render() {
   
    return (
      <div className="App">
    <Link to="/login">Login</Link><br></br>
    <Link to="/reg"> Register</Link>
      </div>
    );
  }
}


export default App;