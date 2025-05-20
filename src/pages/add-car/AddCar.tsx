const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
import { useState } from 'react'

import styles from "./AddCar.module.css"

export const AddCar = () => {
    const [manufacturer, setManufacturer] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [fuelType, setFuelType] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [emission, setEmission] = useState<string>("");
    const [price, setPrice] = useState<string>("");


  const submitNewCarHandler = async () => {
    const response = await fetch(`${API_URL}/api/v1/cars/add-car`, {
        method: "POST"
    });
    if (!response.ok) {
      console.log("Can't connect to backend");
    }
    const data = await response.json();
    if (data.newCar == "success") {
      setManufacturer("")
      setModel("")
      setFuelType("")
      setYear("")
      setEmission("")
      setPrice("")
    }
  }
  return (
        <div className={styles.input_container}>
        <input className={styles.car_input} type="text" value={manufacturer} placeholder="Manufacturer" onChange={(e)=> setManufacturer(e.target.value)} />
        <input className={styles.car_input} type="text" value={model} placeholder="Model" onChange={(e)=> setModel(e.target.value)} />
        <input className={styles.car_input} type="text" value={fuelType} placeholder="Fuel Type" onChange={(e)=> setFuelType(e.target.value)} />
        <input className={styles.car_input} type="text" value={year} placeholder="Year" onChange={(e)=> setYear(e.target.value)} />
        <input className={styles.car_input} type="text" value={emission} placeholder="Emission" onChange={(e)=> setEmission(e.target.value)} />
        <input className={styles.car_input} type="text" value={price} placeholder="Price" onChange={(e)=> setPrice(e.target.value)} />
        <input className={styles.car_input_submit} type="submit" value="Submit" onClick={submitNewCarHandler} />
    </div>)
  
}
