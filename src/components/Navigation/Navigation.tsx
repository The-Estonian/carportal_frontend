import { NavLink } from 'react-router-dom';


import styles from "./Navigation.module.css"

const Navigation = () => {
  return (
    <div className={styles.menuButtons}>
        <NavLink to='/' end>
          All Cars
        </NavLink>
        <NavLink to='/add' end>
          Add Car
        </NavLink>
        <NavLink to='/search' end>
          Search
        </NavLink>
    </div>
  )
}

export default Navigation