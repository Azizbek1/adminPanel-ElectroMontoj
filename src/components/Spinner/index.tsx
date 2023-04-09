import React from "react";
import SpinnerStyled from "./Style";
 const Spinner = () => {
  return (
    <SpinnerStyled>
      <div className="lds-hourglass"></div>
    </SpinnerStyled>
  );
}
export default Spinner