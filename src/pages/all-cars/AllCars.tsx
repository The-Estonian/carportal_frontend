import { useNavigate } from 'react-router-dom';

import Car from '../../components/Car/Car';
import Spinner from '../../components/Spinner/Spinner';

import { CarInfoType } from '../../types/CarInfo';
import styles from "./AllCars.module.css"

const AllCars = ({ fetchedCars, loadCars }: { fetchedCars: CarInfoType[], loadCars: boolean; }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.cars_container}>
      {loadCars && < Spinner />}
      {!loadCars && fetchedCars.map((eachCar, index) => (
        <Car key={index} carData={eachCar} onClick={() => navigate(`/cars/${index+1}`)} />
        ))
      }
    </div>
  );
}

export default AllCars