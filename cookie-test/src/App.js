import React from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [data, setData] = React.useState(null);
  const [time, setTime] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [resMsg, setResMsg] = React.useState(null);
  const [cookie, setCookie] = React.useState("");

  const tick = () => {
    setTimer(timer - 1)
  }

  const createCookie = () => {
    setTimer(time);
    const postData = {
      seconds: time,
      cookie_id: cookie.split("=")[0],
      cookie_value: cookie.split("=")[1]
    }
    axios.post("http://localhost:3001/api", postData, { withCredentials: true })
    .then((res) => {
      console.log(res);
      return res.data})
    .then((body) => {
      setData(body.message);
      // setCookie(document.cookie);
    });
  }

  const sendReqWithCookie = () => {
    axios.get("http://localhost:3001/send", { withCredentials: true })
    .then((res) => {
      return res.data;
    }).then(body => {
      setResMsg(body.message);
    });
  }

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(tick, 1000);
      return () => {
        clearInterval(interval);
      }
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Handling Cookies with ReactJS and NodeJS</p>
        {!data ?
          <p>"Loading..."</p> :
          timer > 0 ? <p>{data}. It will expire in {timer} seconds.</p> :
          <p>Cookie Expired!</p>
        }
        <label>Set Cookie Name and Value</label>
        <input type='text' onChange={(e) => setCookie(e.target.value)} value={cookie} />
        <label>Set Time to Expire (in seconds)</label>
        <input type='text' onChange={(e) => setTime(e.target.value)} value={time}/>
        <br></br>
        
        <button className="button green" onClick={() => createCookie()}>Create Cookie</button>
        <button className="button yellow" onClick={() => sendReqWithCookie()}>Send Request with Cookie</button>
        {resMsg}
      </header>
    </div>
  );
}

export default App;