import React from "react";
import axios from "axios";
import { baseUrl } from "../constants";

const DataContext = React.createContext({});

class  DataProvider extends React.Component {
  
  constructor(){
    super();
    this.state = {
      messages:[],
      name:"",
      participants:[],
      tracks:[],
    }
  }
    fetchData = async() => {
      let {data} = await axios.get(baseUrl+'/room/'+localStorage.getItem('roomId'));
      this.setState({
        messages: data.messages,
        name: data.name,
        participants: data.participants,
        tracks:data.tracks,
      })
     
    }
    componentDidMount(){
      this.fetchData();
    }
    updateMessage = () => {

    }
    updateParticipant = () => {

    }
    updateTrack = () => {

    }
  
   render(){
     const value = {
       state: {
         messages: this.state.messages,
         name: this.state.name,
         participants: this.state.participants,
         tracks: this.state.tracks,
       },
       actions: {
        updateMessage: this.updateMessage,
        updateParticipant: this.updateParticipant,
        updateTrack: this.updateTrack,
       }
     }
    return (
      <DataContext.Provider value={value}>
        {this.props.children}
      </DataContext.Provider>
    );
   }
 
  }


export { DataContext, DataProvider };
