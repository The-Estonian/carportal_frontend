import { Outlet } from 'react-router-dom';
import Navigation from "../Navigation/Navigation"

import styles from "./Root.module.css"

const Root = () => {
  return (
    <div className={styles.root}>
      <Navigation
      />
      <main className={styles.root_outlet}>
        <Outlet/>
      </main>
    </div>  
  )
}

export default Root