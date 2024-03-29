import React from "react";
import herobus from "../images/herobus.jpg";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const navigate = useNavigate()
  function handelogin(){
    navigate("/login")
  }
  return (
    <div className="container mt-5 herosection">
      <div>
        <p>
          Manage Your Fleet Like a Pro with <br />{" "}
          <span className="fleetsense">FleetSense!</span>
        </p>
        <p>The ultimate solution that allows you to manage your vehicles</p>

        <button className="sign-in-button" onClick={handelogin}>Get started</button>
      </div>
      <div>
        <img className="herobus-image" src={herobus} alt="One Of Our Buses" />
      </div>
    </div>
  );
}

export default Herosection;
