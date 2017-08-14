import React from 'react'
import {
  NavLink
} from 'react-router-dom'

const Navbar = (props) => {
	if(props.mode !== 'auth'){
		return (
			<ul className="message-board">
				<li className="message-board-link"><NavLink to='/home'>MESSAGE BOARD</NavLink></li>
			</ul>
		);
	} else {
		return (
			<div>

			</div>
		);
	}
}

export default Navbar;