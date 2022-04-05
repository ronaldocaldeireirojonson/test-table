import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";

function App() {
  const[data, setData] = useState();
  const[filter, setFilter] = useState();

  useEffect(() => {
    console.log("USE EFFECT");
    GetTable();
  }, []);

  async function GetTable () {
    console.log("GetTable");
    axios.get("https://randomuser.me/api?results=5").then((response) => {
      setData(response.data.results);
    }).catch((err) => {
      console.log(err);
    })
  }

  function RenderTableHeads(){
    if(data.length == 0)
      return <td></td>

    console.log("RENDER TABLE");
    console.log(Object.keys(data[0]));
    console.log(data[0])

    return <tr>
      <td>name</td>
      <td>Street name</td>
      <td>Street number</td>
      <td>City</td>
      <td>State</td>
      <td>Country</td>
      <td>Photo</td>
    </tr>
  }

  function RenderTableBody(){
    console.log("RENDER TABLE");
    console.log(data);

    return data.map((element) => {
      return <tr key={element.login.uuid}>
        <td>{element.name.first + " " + element.name.last}</td>
        <td>{element.location.street.name}</td>
        <td>{element.location.street.number}</td>
        <td>{element.location.city}</td>
        <td>{element.location.state}</td>
        <td>{element.location.country}</td>
        <td><img src={element.picture.medium} alt={element.name}></img></td>
      </tr>
    })
  }

  function FilterList(filter){
    setFilter(filter);
  }

  return (
    <div className="App">
      {data && <table>
        <thead>
            {RenderTableHeads()}
        </thead>
        <tbody>
            {RenderTableBody()}
        </tbody>
      </table>}
    </div>
  );
}

export default App;
