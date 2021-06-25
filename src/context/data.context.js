import React from "react";
import { SocketService } from "../services/socket.service";
import mockup from "../assets/mockup.mp3";
import axios from "axios";
import { baseUrl } from "../constants";
import { useQuery } from 'react-query'
const DataContext = React.createContext({});

function DataProvider({children}) {
    const [data, setData] = React.useState(null);
    const fetchData = async( ) => {
      let data = await axios.get(baseUrl+'/room/'+localStorage.getItem('roomId'));
      setData(data);
    }
 
    const isMounted = React.useRef(false);
    React.useEffect(() => {
      isMounted.current = true;
      fetchData();
      return () => { isMounted.current = false };
    },[])
  
    return (
      <DataContext.Provider value={data}>
        {children}
      </DataContext.Provider>
    );
  }


export { DataContext, DataProvider };
