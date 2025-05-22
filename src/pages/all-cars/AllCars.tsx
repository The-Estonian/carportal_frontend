
import Car from '../../components/Car/Car';
import Spinner from '../../components/Spinner/Spinner';
import shuffleArray from "../../helpers/shuffler"

import { CarType } from '../../types/Car';
import styles from "./AllCars.module.css"

const AllCars = ({ fetchedCars, loadCars }: { fetchedCars: CarType[], loadCars: boolean; }) => {
  return (
    <div className={styles.cars_container}>
      {loadCars && < Spinner />}
      {!loadCars && shuffleArray(fetchedCars).map((eachCar, index) => (
          <Car key={index} carData={eachCar} />
        ))
      }
    </div>
  );
}

export default AllCars