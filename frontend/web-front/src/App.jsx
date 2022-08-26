import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const App = () => {
  const [styleList, setStyleList] = useState([])
  useEffect(() => {
    (async () => {
      try {
        await axios.get('http://localhost:8080/api/').then((res) => {
          const data = res?.data
          setStyleList(data)
        })
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])
  return (
    <div className="App">
      {styleList.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
