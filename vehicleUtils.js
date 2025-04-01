import {
    getFeaturedVehicles,
    getNewArrivals,
    getOtherVehicles,
} from "./vehicleUtils";

export const getFeaturedVehicles = (vehicles) => {
    // Logic to filter and return featured vehicles
    return vehicles.filter((vehicle) => vehicle.isFeatured);
};

export const getNewArrivals = (vehicles) => {
    // Logic to filter and return new arrivals
    return vehicles.filter((vehicle) => vehicle.isNewArrival);
};

export const getOtherVehicles = (vehicles) => {
    // Logic to filter and return other vehicles
    return vehicles.filter(
        (vehicle) => !vehicle.isFeatured && !vehicle.isNewArrival
    );
};
