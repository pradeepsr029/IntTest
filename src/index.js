import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import GridImage from "./GridImage";

import "./styles.css";

/*
  Instructions:
    part1:
    You're given the UI for a basic form. Your task is to 
    hook it all up using refs. 

    The `Focus X Input` buttons should focus that specific input
    field.

    The `Submit` button should log `name`, `email`, and `password`
    to the console.

    The `Reset` button should result all of the input fields to 
    empty strings.

    part2: 
    Develop a search tag with debounce functionality.
    Debouncing means that a function will not be called again until
    a certain amount of time has passed. So here the setsearch method
    is called repeatedly for every key stroke, instead it should
    be delayed by the time peroid mentioned in the debounce method (add some 
    console log to validate this no need to use any api mock). 
    It should avoid memory leaks and the solution provided should be scalable.
    
    For api integration create an account in https://developers.giphy.com/dashboard/
    Once you have got your API token refer the search api docs page

    eg: api endpoint
    https://api.giphy.com/v1/gifs/search?api_key=< your api token >&q=<search value>

    Display the result images below in a 4x4 grid box, you can choose any size of your preference

    NOTE: 
    do not use any external library like lodash

*/

function ReactForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [searchResult, setSearchResult] = useState([]);
  // const [name, setName]=useState("");
  // const [email, setEmail]=useState("");
  // const [password, setPassword]=useState("");

  // const nameChangeHandle=(e)=>{
  //   console.log(nameRef,"==")
  //   setName(e.target.value)
  // }
  // const emailChangeHandle=(e)=>{
  //   setEmail(e.target.value)
  // }
  // const passwordChangeHandle=(e)=>{
  //   setPassword(e.target.value)
  // }

  const handleSubmit = (e) => {
    const [name, email, password] = [
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    ];
    //Send
    alert(`Name: ${name}, Email: ${email}, Passwrod: ${password}`);
    //Reset
    handleReset();
  };

  const handleReset = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const inputFocusHandelar = (type) => {
    switch (type) {
      case "NAME":
        nameRef.current.focus();
        break;
      case "EMAIL":
        emailRef.current.focus();
        break;
      case "PASSWORD":
        passwordRef.current.focus();
        break;
      default:
        throw "Unknown Type";
    }
  };

  const handleSearch = (value) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=MfwZLqWeh1YPrvrlULOqgzZfOlRkIR7r&q=${value}`;
    //Http Request
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setSearchResult(result.data);
      })
      .catch((err) => {
        alert("Somthing Went wrong. Try Again");
      });
    // add your api logic here
  };

  const debounce = (callback, delay = 600) => {
    let endTimer;
    // add your debounce logic here
    return function (...argu) {
      clearTimeout(endTimer);
      endTimer = setTimeout(() => {
        callback.call(null, ...argu);
      }, delay);
    };
  };

  // do not modify this line
  const debouncedSearch = debounce(handleSearch, 1000);

  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input placeholder="name" ref={nameRef} defaultValue="" type="text" />
        </label>
        <label>
          Email:
          <input
            placeholder="email"
            ref={emailRef}
            defaultValue=""
            type="text"
          />
        </label>
        <label>
          Password:
          <input
            placeholder="password"
            ref={passwordRef}
            defaultValue=""
            type="password"
          />
        </label>
        <hr />
        <button
          type="button"
          onClick={() => {
            inputFocusHandelar("NAME");
          }}
        >
          Focus Name Input
        </button>
        <button
          type="button"
          onClick={() => {
            inputFocusHandelar("EMAIL");
          }}
        >
          Focus Email Input
        </button>
        <button
          type="button"
          onClick={() => {
            inputFocusHandelar("PASSWORD");
          }}
        >
          Focus Password Input
        </button>
        <hr />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            // do not modify this line
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        {searchResult.map((data) => {
          return <GridImage key={data.id} data={data} />;
        })}
      </div>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<ReactForm />, rootElement);
