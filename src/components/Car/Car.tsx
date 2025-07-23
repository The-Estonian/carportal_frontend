import { useNavigate } from 'react-router-dom';
import styles from './Car.module.css';
import { useState } from 'react';
import { CarType } from '../../types/Car';
import { CarInfoType } from '../../types/CarInfo';

import camry from '../../assets/Camry.jpg';
import civic from '../../assets/Civic.jpg';
import f150 from '../../assets/F-150.jpg';
import model3 from '../../assets/Model 3.jpg';
import prius from '../../assets/Prius.jpg';
import default_car from '../../assets/default.jpg';
import Spinner from '../Spinner/Spinner';

interface CarProps {
  carData: CarType | CarInfoType;
}

const Car: React.FC<CarProps> = ({ carData }) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  let carImage;
  if (carData.modelName === 'Camry') {
    carImage = camry;
  } else if (carData.modelName === 'Civic') {
    carImage = civic;
  } else if (carData.modelName === 'F-150') {
    carImage = f150;
  } else if (carData.modelName === 'Model 3') {
    carImage = model3;
  } else if (carData.modelName === 'Prius') {
    carImage = prius;
  } else {
    carImage = default_car;
  }
  return (
    <div className={styles.carContainer} onClick={()=>  navigate(`/cars/${carData.id}`)}>
      <div className={styles.carInformation}>
        <div className={styles.titleContainer}>
          {/* <span>ID</span> */}
          <span>Model</span>
          <span>Manufacturer</span>
          <span>Year</span>
          {'fuelType' in carData && <span>Fuel Type</span>}
          {'emissions' in carData && <span>Emission</span>}
          {'price' in carData && <span>Price</span>}
        </div>
        <div className={styles.dataContainer}>
          {/* <span>{carData.id}</span> */}
          <span>{carData.modelName}</span>
          <span>{carData.make}</span>
          <span>{carData.releaseYear}</span>
          {'fuelType' in carData && carData.fuelType && <span>{carData.fuelType[0] + carData.fuelType.slice(1).toLowerCase()}</span>}
          {'emissions' in carData && <span>{carData.emissions}</span>}
          {'price' in carData && <span>{carData.price}</span>}
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
