import React from 'react'
import SpinnerCSS from './Spinner.module.css'

type Props = {}

const Spinner = (props: Props) => {
  return (
    <div className={SpinnerCSS.loader}></div>
  )
}

export default Spinner