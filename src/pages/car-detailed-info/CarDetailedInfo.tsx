const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CarType } from '../../types/Car';
import Car from '../../components/Car/Car';

import styles from "./CarDetailedInfo.module.css"

const CarDetailedInfo = () => {
    const { id } = useParams();
    const [car, setCar] = useState<CarType>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/")
        }
        fetch(`${API_URL}/api/v1/car/detailed-info/${id}`)
            .then(res => res.json())
            .then(data => setCar(data))
            .catch(() => navigate("/"));
        }, []);
    if (!car) return <div>Car with that ID does not exist!</div>;
  return (
      <div>
          <Car carData={car} />
          <div className={styles.back}>
            <span onClick={() =>  navigate("/")}>BACK</span>  
          </div>
    </div>
  )
}

export default CarDetailedInfo