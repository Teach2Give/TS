// a utils to help fetchg json
interface Ride {
    id: number;
    status: "CANCELED" | "COMPLETED" | "PENDING"; 
    request_date: string; 
    pickup_lat: number;
    pickup_lng: number;
    pickup_location: string;
    dropoff_lat: number;
    dropoff_lng: number;
    dropoff_location: string;
    pickup_date: string; 
    dropoff_date: string | null; 
    type: "HavaXL" | "OtherType"; 
    driver_id: number;
    driver_name: string;
    driver_rating: number;
    driver_pic: string;
    car_make: string;
    car_model: string;
    car_number: string;
    car_year: number;
    car_pic: string; 
    duration: number;
    duration_unit: "min" | "hr";
    distance: number;
    distance_unit: "km" | "miles"; 
    cost: number;
    cost_unit: "KES" | "USD";
}


const fetchTripsUtils = async(api:string):Promise<Ride[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response:Response = await fetch(api)
            if(!response.ok) {
                throw new Error(`Error fetching trips data: ${response.statusText}`)
            }

            const data:Ride[] = await response.json()
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
export {fetchTripsUtils}



//usage 
// You cannot directly use an async function as the argument to useEffect because useEffect expects a cleanup function or void, and returning a Promise does not satisfy that requirement. However, you can create an async function inside the useEffect and call it.

// 1. Use try-catch Inside the fetchData Function
// You already have this, which is great! It's a good practice to handle errors inside the asynchronous function.

// 2. Simplify Error Handling
// If the error handling is straightforward, you can simplify it a bit. Instead of concatenating strings, you could just set the error directly if it's an instance of an error.

// 3. Optional Chaining for Safety
// When mapping through the tripsData, you can use optional chaining to avoid errors if any property is undefined (not necessary if you're sure about your data structure).

// 4. Clear State on Component Unmount
// If your component unmounts while the fetch is still in progress, you might want to avoid setting state on an unmounted component. You can use a flag to manage this.


import React, { useEffect, useState } from 'react';
import { fetchTripsUtils } from '../../utils/customFetch';

type Props = {}

const SearchResultsComponent = (props: Props) => {
    const [tripsData, setTripsData] = useState<Ride[]>([]);
    const [error, setError] = useState<string | null>(null); // To handle errors

    useEffect(() => {
        let isMounted = true; // Track whether the component is mounted

        const fetchData = async () => {
            try {
                const data = await fetchTripsUtils("http://localhost:3000/api/v1/trips");
                if (isMounted) { // Only update state if mounted
                    setTripsData(data);
                    console.log(data, "Fetched trips data");
                }
            } catch (error) {
                if (isMounted) { // Only update state if mounted
                    setError(error instanceof Error ? error.message : 'Error fetching data');
                    console.error(error);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup function to set flag false on unmount
        };
    }, []); // Dependency array remains empty to run on mount

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}
            {tripsData.length > 0 ? (
                <ul>
                    {tripsData.map((trip) => (
                        <li key={trip.id}>
                            {trip.pickup_location} to {trip.dropoff_location} - Status: {trip.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No trips found.</p>
            )}
        </div>
    );
}

export default SearchResultsComponent;



// Yes, you can use React refs to check if a component is mounted, and it’s a common pattern to avoid updating the state after a component has unmounted.

// How to Use Refs for Component Mounting
// You can create a ref using useRef and set its current property to track the mounted state of the component. Here’s how it works:

// Initialization: When the component mounts, you set ref.current to true.
// Cleanup: When the component unmounts, you set ref.current to false.
// Usage: Inside your async function, you can check ref.current to determine if the component is still mounted before updating the state.
import React, { useEffect, useState, useRef } from 'react';
import { fetchTripsUtils } from '../../utils/customFetch';

type Props = {}

const SearchResultsComponent = (props: Props) => {
    const [tripsData, setTripsData] = useState<Ride[]>([]);
    const [error, setError] = useState<string | null>(null); // To handle errors
    const isMountedRef = useRef<boolean>(false); // Create a ref

    useEffect(() => {
        isMountedRef.current = true; // Set to true when mounted

        const fetchData = async () => {
            try {
                const data = await fetchTripsUtils("http://localhost:3000/api/v1/trips");
                if (isMountedRef.current) { // Only update state if mounted
                    setTripsData(data);
                    console.log(data, "Fetched trips data");
                }
            } catch (error) {
                if (isMountedRef.current) { // Only update state if mounted
                    setError(error instanceof Error ? error.message : 'Error fetching data');
                    console.error(error);
                }
            }
        };

        fetchData();

        return () => {
            isMountedRef.current = false; // Cleanup function sets it to false on unmount
        };
    }, []); // Dependency array remains empty to run on mount

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}
            {tripsData.length > 0 ? (
                <ul>
                    {tripsData.map((trip) => (
                        <li key={trip.id}>
                            {trip.pickup_location} to {trip.dropoff_location} - Status: {trip.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No trips found.</p>
            )}
        </div>
    );
}

export default SearchResultsComponent;


//MY take aways is that, setISmOUNTED() state works better than ref current because the acually state is being changes with truth of component mount