const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
import { useState } from 'react';
import './App.css';
import { CarType } from './types/Car';
import Car from './components/Car/Car';
import Spinner from './components/Spinner/Spinner';

function shuffleArray<CarType>(array: CarType[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function App() {
  const [fetchedCars, setFetchedCars] = useState<CarType[]>([]);
  const [loadCars, setLoadCars] = useState<boolean>(false);
  const [showNewCarInput, setShowNewCarInput] = useState<boolean>(false);
  
  
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [emission, setEmission] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const fetchCar = async () => {
    setLoadCars(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/cars/all`, {
        method: "GET"
      });

      if (!response.ok) {
        console.log("Can't connect to backend");
      }
      const data = await response.json();
      setLoadCars(false);
      setFetchedCars(data);
    } catch (error) {
      console.log(error);
      setFetchedCars([]);
      setLoadCars(false);
    }
  };

  const clearCarsHandler = () => {
    setFetchedCars([]);
    setShowNewCarInput(false)
  };

  const fetchCarHandler = () => {
    fetchCar();
    setShowNewCarInput(false)
  };
  
  const addCarsHandler = () => {
    clearCarsHandler()
    setShowNewCarInput(true)
  }

  const submitNewCarHandler = async () => {
    setLoadCars(true);
    const response = await fetch(`${API_URL}/api/v1/cars/all`, {
        method: "POST"
    });
    if (!response.ok) {
      console.log("Can't connect to backend");
    }
    const data = await response.json();
    if (data.newCar == "success") {
      setShowNewCarInput(false)
      setManufacturer("")
      setModel("")
      setFuelType("")
      setYear("")
      setEmission("")
      setPrice("")
      setLoadCars(false);
    } else {
      setLoadCars(false);
    }
  }

  return (
    <div className='container'>
      <div className='menuButtons'>
        <button onClick={fetchCarHandler}>Fetch Cars</button>
        <button onClick={clearCarsHandler}>Clear</button>
        <button onClick={addCarsHandler}>Add Car</button>
      </div>
      <div className='dataContainer'>
        {loadCars && < Spinner />}
        {!loadCars && !showNewCarInput && shuffleArray(fetchedCars).map((eachCar) => (
            <Car key={eachCar.id} carData={eachCar} />
          ))
        }
        {!loadCars && showNewCarInput &&
          <div className='input_container'>
            <input className="car_input" type="text" value={manufacturer} placeholder="Manufacturer" onChange={(e)=> setManufacturer(e.target.value)} />
            <input className="car_input" type="text" value={model} placeholder="Model" onChange={(e)=> setModel(e.target.value)} />
            <input className="car_input" type="text" value={fuelType} placeholder="Fuel Type" onChange={(e)=> setFuelType(e.target.value)} />
            <input className="car_input" type="text" value={year} placeholder="Year" onChange={(e)=> setYear(e.target.value)} />
            <input className="car_input" type="text" value={emission} placeholder="Emission" onChange={(e)=> setEmission(e.target.value)} />
            <input className="car_input" type="text" value={price} placeholder="Price" onChange={(e)=> setPrice(e.target.value)} />
            <input className="car_input_submit" type="submit" value="Submit" onClick={submitNewCarHandler} />
        </div>}
      </div>
    </div>
  );
}

export default App;
