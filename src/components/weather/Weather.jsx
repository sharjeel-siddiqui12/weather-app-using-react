import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState({});

  const validationSchema = yup.object({
    cityName: yup
      .string('Enter your city name')
      .required('City name is required')
      .min(3, 'City Name should be of minimum 3 characters length')
      .max(20, 'City Name should be of maximum 20 characters length'),
  });

  const formik = useFormik({
    initialValues: {
      cityName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${values.cityName}&units=metric&appid=e0f99c494c2ce394a18cc2fd3f100543`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
    >
      <label
        htmlFor="cityName"
        className="block text-lg font-bold text-gray-700 mb-2"
      >
        Enter City Name:
      </label>
      <input
        id="cityName"
        name="cityName"
        label="City Name"
        value={formik.values.cityName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {formik.touched.cityName && formik.errors.cityName ? (
        <span className="text-red-600 text-sm mt-1 block">
          {formik.errors.cityName}
        </span>
      ) : null}
  
      <button
        className="bg-blue-500 text-white font-semibold rounded-lg w-full py-2 mt-4 hover:bg-blue-600 transition-colors duration-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  
    <div className="mt-8 text-gray-700 font-serif font-bold text-center p-4 rounded-lg shadow-md bg-white max-w-md w-full">
      {weatherData.main && (
        <>
          <p className="text-xl">City: {weatherData?.name}</p>
          <p className="text-xl">Temperature: {weatherData?.main?.temp}°C</p>
          <p className="text-lg">Max Temperature: {weatherData?.main?.temp_max}°C</p>
          <p className="text-lg">Min Temperature: {weatherData?.main?.temp_min}°C</p>
          <p className="text-lg capitalize">Description: {weatherData?.weather[0].description}</p>
        </>
      )}
    </div>
  </div>
  
  );
}

export default Weather;
