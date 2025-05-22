import styles from './Car.module.css';
import { useState } from 'react';
import { CarType } from '../../types/Car';

import camry from '../../assets/Camry.jpg';
import civic from '../../assets/Civic.jpg';
import f150 from '../../assets/F-150.jpg';
import model3 from '../../assets/Model 3.jpg';
import prius from '../../assets/Prius.jpg';
import default_car from '../../assets/default.jpg';
import Spinner from '../Spinner/Spinner';

interface CarProps {
  carData: CarType;
}

const Car: React.FC<CarProps> = ({ carData }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  let carImage;
  if (carData.carModel === 'Camry') {
    carImage = camry;
  } else if (carData.carModel === 'Civic') {
    carImage = civic;
  } else if (carData.carModel === 'F-150') {
    carImage = f150;
  } else if (carData.carModel === 'Model 3') {
    carImage = model3;
  } else if (carData.carModel === 'Prius') {
    carImage = prius;
  } else {
    carImage = default_car;
  }
  return (
    <div className={styles.carContainer}>
      <div className={styles.carInformation}>
        <div className={styles.titleContainer}>
          {/* <span>ID</span> */}
          <span>Model</span>
          <span>Manufacturer</span>
          <span>Year</span>
          <span>Fuel Type</span>
          <span>Emission</span>
          <span>Price</span>
        </div>
        <div className={styles.dataContainer}>
          {/* <span>{carData.id}</span> */}
          <span>{carData.carModel}</span>
          <span>{carData.manufacturer}</span>
          <span>{carData.modelYear}</span>
          <span>{carData.fuelType[0]+carData.fuelType.slice(1).toLowerCase()}</span>
          <span>{carData.emissions}</span>
          <span>{carData.price}</span>
        </div>
      </div>
      <div className={styles.imgContainer}>
        {imageLoading && <Spinner />}
        <img
          onLoad={() => setImageLoading(false)}
          src={carImage}
          alt='car image'
        />
      </div>
    </div>
  );
};

export default Car;
