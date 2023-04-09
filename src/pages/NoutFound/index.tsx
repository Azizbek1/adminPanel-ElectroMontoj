import React from 'react'
import { NotFoundImag } from '../../assets'
import NoutStyled from "./Style"
type Props = {}

 const NoutFound = () => {
  return (
    <NoutStyled>
        <img src={NotFoundImag} alt="jpg" />
    </NoutStyled>
  )
}
export default NoutFound