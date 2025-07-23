

import Car from '../../components/Car/Car';
import Spinner from '../../components/Spinner/Spinner';

import { CarInfoType } from '../../types/CarInfo';
import styles from "./AllCars.module.css"

const AllCars = ({ fetchedCars, loadCars }: { fetchedCars: CarInfoType[], loadCars: boolean; }) => {
  return (
    <div className={styles.cars_container}>
      {loadCars && < Spinner />}
      {!loadCars && fetchedCars.map((eachCar, index) => (
        <Car key={index} carData={eachCar}/>
        ))
      }
    </div>
  );
}

export default AllCars