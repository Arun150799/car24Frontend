import React from 'react'
import "../components/Header.css"
import image from "../assets/Logo.png.png"

const Header = () => {
  return (
    <>
        <div className="navbar">
        <img src={image} className='image'  alt=''/>
        </div>
    </>
  )
}

export default Header
