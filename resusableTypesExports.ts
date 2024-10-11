// a utils to help fetch json
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

// export {Ride} // Re-exporting a type when 'isolatedModules' is enabled requires using 'export type'.ts
// The error you're encountering relates to the TypeScript isolatedModules setting, which is often used in projects configured for transpilation with tools like Babel. When isolatedModules is enabled, TypeScript requires a specific syntax for re-exporting types.
export type { Ride }; // Use export type for re-exporting
