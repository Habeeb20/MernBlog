import React from 'react'
import classes from './navbar.module.css'
import { Link } from 'react-router-dom'
import womanImg from '../../assets/woman.jpg'
import { useState } from 'react'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/'>UniqueBlog</Link>
        </div>
        <ul className={classes.center}>
          <Link to='/'><li className={classes.listItem}>Home</li></Link>
          
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Contacts</li>
          <Link to='/categories'><li className={classes.listItem}>Categories</li></Link>
         
        </ul>
        <div className={classes.right}>
          <img onClick={() => setShowModal(prev => !prev)} src={womanImg} className={classes.img} />
          {showModal &&
            <div className={classes.modal}>
              <Link to='/create'>Create</Link>
              <Link to='/login'><span>Logout</span></Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar