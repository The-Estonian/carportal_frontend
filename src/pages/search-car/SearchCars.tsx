const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

import {useState} from "react"
import Spinner from '../../components/Spinner/Spinner';
import styles from "./SearchCars.module.css"
import { CarType } from "../../types/Car";
import Car from "../../components/Car/Car";

const SearchCars = () => {
    const [carData, setCarData] = useState<CarType[]>([]);
    const [loadCars, setLoadCars] = useState<boolean>(false);
    const [error, setError] = useState<string>("")

    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    // const [baseYear, setBaseYear] = useState<string>("")

  // const searchCarByRegistrationTax = async () => {
  //     if (from.length < 1) {
  //       setError("Please provide Annual tax <FROM> value")
  //       return
  //     }
  //     if (to.length < 1) {
  //       setError("Please provide Annual tax <TO> value")
  //       return
  //     }
  //     if (baseYear.length < 4) {
  //       setError("Please provide Annual tax <Base Year> value")
  //       return
  //     }
  //     setError("")
  //     setLoadCars(true);
  //     try {
  //       const response = await fetch(`${API_URL}/api/v1/cars/registration-tax-range?from=${from}&to=${to}&baseYear=${baseYear}`, {
  //         method: "GET"
  //       });

  //       if (!response.ok) {
  //         console.log("Can't connect to backend");
  //       }
  //       const data = await response.json();     
  //       setLoadCars(false);
  //       setCarData(data);
  //       setFrom("")
  //       setTo("")
  //       setBaseYear("")
  //     } catch (error) {
  //       console.log(error);
  //       setCarData([])
  //       setLoadCars(false);
  //     }
  // };
  
  // const searchCarByAnnualTax = async () => {
  //     if (from.length < 1) {
  //       setError("Please provide Annual tax <FROM> value")
  //       return
  //     }
  //     if (to.length < 1) {
  //       setError("Please provide Annual tax <TO> value")
  //       return
  //     }
  //     if (baseYear.length < 4) {
  //       setError("Please provide Annual tax <Base Year> value")
  //       return
  //     }
  //     setError("")
  //     setLoadCars(true);
  //     try {
  //       const response = await fetch(`${API_URL}/api/v1/cars/annual-tax-range?from=${from}&to=${to}&baseYear=${baseYear}`, {
  //         method: "GET"
  //       });

  //       if (!response.ok) {
  //         console.log("Can't connect to backend");
  //       }
  //       const data = await response.json();
  //       setLoadCars(false);
  //       setCarData(data);
  //       setFrom("")
  //       setTo("")
  //       setBaseYear("")
  //     } catch (error) {
  //       console.log(error);
  //       setCarData([])
  //       setLoadCars(false);
  //     }
  // };
  
  const searchCarPriceRange = async () => {
      if (from.length < 1) {
        setError("Please provide Annual tax <FROM> value")
        return
      }
      if (to.length < 1) {
        setError("Please provide Annual tax <TO> value")
        return
    }
    setError("")
      setLoadCars(true);
      try {
        const response = await fetch(`${API_URL}/api/v1/cars/price-range?from=${from}&to=${to}`, {
          method: "GET"
        });

        if (!response.ok) {
          console.log("Can't connect to backend");
        }
        const data = await response.json();
        setLoadCars(false);
        setCarData(data);
        setFrom("")
        setTo("")
        // setBaseYear("")
      } catch (error) {
        console.log(error);
        setCarData([])
        setLoadCars(false);
      }
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search_input_container}>
        <input className={styles.search_input} type="text" value={from} placeholder="From" onChange={(e)=> setFrom(e.target.value)} />
        <input className={styles.search_input} type="text" value={to} placeholder="To" onChange={(e)=> setTo(e.target.value)} />
        {/* <input className={styles.search_input} type="text" value={baseYear} placeholder="Base Year" onChange={(e)=> setBaseYear(e.target.value)} /> */}
      </div>
      {!loadCars && <div className={styles.searchButton}>
        {/* <span onClick={searchCarByRegistrationTax}>By Registration Tax</span>
        <span onClick={searchCarByAnnualTax}>By Annual Tax</span> */}
        <span onClick={searchCarPriceRange}>By Price Range</span>
      </div>}
      {loadCars && < Spinner />}
      {error && error}
      {!loadCars &&
        <div className={styles.searchResult}>
            {carData.map((eachCar, index) => (
          <Car key={index} carData={eachCar} />
        ))}
        </div>
      }
    </div>
  );
}

export default SearchCars