import React from "react";
import "./App.css";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "",
      destination: "",
      email: "",
      time: "",
    };
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    const {source,destination,email,time}=this.state;
    console.log(source+" "+" "+destination+" "+time+" "+" "+email);
    if(source==="" || destination==="" || time==="" || email===""){
      toast.error(`All field are mandatory`);
      return;
    }
    axios.post('http://localhost:5000/api/location',{
      slatlong:source,
      dlatlong:destination,
      email:email,
      time:time
    }).then(res=>{
      console.log(res);
      toast.success(res.data.message);
      this.setState({
        source:"",
        destination:"",
        time:"",
        email:""
      })
    }).catch(err=>{
      console.log(`something went wrong`);
      toast.error(`something went wrong`);
    })
  }
   handleChange=(e)=>{
     this.setState({
       [e.target.name]:e.target.value
     })
   }
  render() {
    return (
      <div className="App ">
        
        <form className="form">
        <ToastContainer />
          <h1 className=" h1 ">Reminder</h1>
          <div className="div">
            {" "}
            Source <span style={{ marginLeft: "63px" }}>:</span>{" "}
            <input
              className="input"
              type="text"
              name="source"
              value={this.state.source}
              onChange={this.handleChange}
              placeholder="enter source in lat/long"
            ></input>
          </div>
          <br></br>
          <div className="div">
            {" "}
            Destination<span style={{ marginLeft: "10px" }}>:</span>{" "}
            <input
              className="input"
              type="text"
              name="destination"
              value={this.state.destination}
              onChange={this.handleChange}
              placeholder="enter destination in lat/long"
            ></input>
          </div>
          <br></br>
          <div className="div">
            {" "}
            Time<span style={{ marginLeft: "96px" }}>:</span>{" "}
            <input
              className="input"
              type="text"
              name="time"
              value={this.state.time}
              onChange={this.handleChange}
              placeholder="enter time"
            ></input>
          </div>
          <br></br>
          <div className="div">
            {" "}
            E-mail <span style={{ marginLeft: "67px" }}>:</span>{" "}
            <input
              className="input"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              type="text"
              placeholder="enter your mail"
            ></input>
          </div>
          <br></br>
          <div className="button2">
            {" "}
            <button className="button" onClick={this.handleSubmit}>Remind Me !!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
