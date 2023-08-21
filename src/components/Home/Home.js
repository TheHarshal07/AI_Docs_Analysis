import React from 'react'
import {Link} from "react-router-dom";


export default function Home(props) {
  return (
    <>
    <div>
      <div>
        <h1>
            <Link to="/login">Login</Link>
        </h1>
      </div>
      <br />
      <br />
      <div>
        <h1>
            <Link to="/signup">Signup</Link>
        </h1>
      </div>
      <h2>Welcome {props.name}</h2>
    </div>
    </>
  )
}
