const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
import { useState, useEffect } from 'react';
import './App.css';
import { Suspense } from "react"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

import Root from "./components/Root/Root"
import AllCars from "./pages/all-cars/AllCars"
import Spinner from "./components/Spinner/Spinner"

import { CarType } from './types/Car';
import { AddCar } from './pages/add-car/AddCar';
import SearchCars from './pages/search-car/SearchCars';

function App() {
  const [fetchedCars, setFetchedCars] = useState<CarType[]>([]);
  const [loadCars, setLoadCars] = useState<boolean>(false);

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

  useEffect(() => {
    fetchCar()
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <Root/>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <AllCars fetchedCars={fetchedCars} loadCars={loadCars} />
            </Suspense>
          }
        />        
        <Route
          path='/add'
          element={
            <Suspense fallback={<Spinner />}>
              <AddCar/>
            </Suspense>
          }
        />        
        <Route
          path='/search'
          element={
            <Suspense fallback={<Spinner />}>
              <SearchCars/>
            </Suspense>
          }
        />        
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
