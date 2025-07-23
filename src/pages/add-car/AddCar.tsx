const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
import { useState } from 'react'

import styles from "./AddCar.module.css"

type AddCarProps = {
  refreshList: () => void;
};

export const AddCar: React.FC<AddCarProps> = ({refreshList}) => {
    const [manufacturerId, setManufacturerId] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [fuelTypeId, setFuelTypeId] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [emissions, setEmissions] = useState<string>("");
    const [price, setPrice] = useState<string>("");


  const submitNewCarHandler = async () => {
    const response = await fetch(`${API_URL}/api/v1/car`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        manufacturerId,
        year,
        fuelTypeId,
        emissions,
        price,
      }),
    });
    if (!response.ok) {
      console.log("Can't connect to backend");
      return
    }
      setManufacturerId("")
      setModel("")
      setFuelTypeId("")
      setYear("")
      setEmissions("")
      setPrice("")
      refreshList()
  }
  return (
        <div className={styles.input_container}>
        <input className={styles.car_input} type="text" value={manufacturerId} placeholder="Manufacturer ID 1-4" onChange={(e)=> setManufacturerId(e.target.value)} />
        <input className={styles.car_input} type="text" value={model} placeholder="Model" onChange={(e)=> setModel(e.target.value)} />
        <input className={styles.car_input} type="text" value={fuelTypeId} placeholder="Fuel Type ID 1-3" onChange={(e)=> setFuelTypeId(e.target.value)} />
        <input className={styles.car_input} type="text" value={year} placeholder="Year" onChange={(e)=> setYear(e.target.value)} />
        <input className={styles.car_input} type="text" value={emissions} placeholder="Emission" onChange={(e)=> setEmissions(e.target.value)} />
        <input className={styles.car_input} type="text" value={price} placeholder="Price" onChange={(e)=> setPrice(e.target.value)} />
        <input className={styles.car_input_submit} type="submit" value="Submit" onClick={submitNewCarHandler} />
    </div>)
  
}
