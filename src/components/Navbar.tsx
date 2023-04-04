import React from 'react'
import Logo from '../assets/images/logo.svg'; 



export function Font(){ 
	return (
		<p>Serif</p>
	)
}

export default function Navbar() {
  return (
	<div className='bg-blue-500'>
		<img src={Logo} />
		<Font /> 
	</div>
  )
}
