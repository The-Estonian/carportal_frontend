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

  const fetchCar = async () => {
    setLoadCars(true);
    try {
      const response = await fetch('https://api.saarcodes.dev/api/v1/cars/all', {});

      if (!response.ok) {
        console.log("Can't connect to backend");
      }
      const data = await response.json();
      console.log(data);
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
  };

  const fetchCarHandler = () => {
    fetchCar();
  };
  return (
    <div className='container'>
      <div className='menuButtons'>
        <button onClick={fetchCarHandler}>Fetch Cars</button>
        <button onClick={clearCarsHandler}>Clear</button>
      </div>
      <div className='dataContainer'>
        {loadCars ? (
          <Spinner />
        ) : (
          shuffleArray(fetchedCars).map((eachCar) => (
            <Car key={eachCar.id} carData={eachCar} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
