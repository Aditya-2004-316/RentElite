router.post("/add", async (req, res) => {
    try {
        const newVehicle = {
            name: "Mercedes S-Class",
            type: "Luxury",
            price: 200,
            image: "/vehicles/mercedes-benz.jpeg",
            specifications: {
                year: 2023,
                transmission: "Automatic",
                fuel: "Petrol",
                seats: 5,
            },
        };

        const vehicle = new Vehicle(newVehicle);
        await vehicle.save();

        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
