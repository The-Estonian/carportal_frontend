const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
import { useState } from 'react'

import styles from "./AddCar.module.css"

type AddCarProps = {
  refreshList: () => void;
};

export const AddCar: React.FC<AddCarProps> = ({refreshList}) => {
    const [manufacturer, setManufacturer] = useState<string>("");
    const [carModel, setCarModel] = useState<string>("");
    const [fuelType, setFuelType] = useState<string>("");
    const [modelYear, setModelYear] = useState<string>("");
    const [emissions, setEmissions] = useState<string>("");
    const [price, setPrice] = useState<string>("");


  const submitNewCarHandler = async () => {
    const response = await fetch(`${API_URL}/api/v1/car`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carModel,
        manufacturer,
        modelYear,
        fuelType,
        emissions,
        price,
      }),
    });
    if (!response.ok) {
      console.log("Can't connect to backend");
      return
    }
      setManufacturer("")
      setCarModel("")
      setFuelType("")
      setModelYear("")
      setEmissions("")
      setPrice("")
      refreshList()
  }
  return (
        <div className={styles.input_container}>
        <input className={styles.car_input} type="text" value={manufacturer} placeholder="Manufacturer" onChange={(e)=> setManufacturer(e.target.value)} />
        <input className={styles.car_input} type="text" value={carModel} placeholder="Model" onChange={(e)=> setCarModel(e.target.value)} />
        <input className={styles.car_input} type="text" value={fuelType} placeholder="Fuel Type" onChange={(e)=> setFuelType(e.target.value)} />
        <input className={styles.car_input} type="text" value={modelYear} placeholder="Year" onChange={(e)=> setModelYear(e.target.value)} />
        <input className={styles.car_input} type="text" value={emissions} placeholder="Emission" onChange={(e)=> setEmissions(e.target.value)} />
        <input className={styles.car_input} type="text" value={price} placeholder="Price" onChange={(e)=> setPrice(e.target.value)} />
        <input className={styles.car_input_submit} type="submit" value="Submit" onClick={submitNewCarHandler} />
    </div>)
  
}
