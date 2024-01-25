import React from "react";
import herobus from "../images/herobus.jpg";

function Herosection() {
  return (
    <div className="container mt-5 herosection">
      <div>
        <p>
          Manage You Fleet Like a Pro with <br />{" "}
          <span className="fleetsense">FleetSense!</span>
        </p>
        <p>The best solution that allows you to manage your vehicles</p>

        <button className="sign-in-button">Sign in</button>
      </div>
      <div>
        <img className="herobus-image" src={herobus} alt="One Of Our Buses" />
      </div>
    </div>
  );
}

export default Herosection;
