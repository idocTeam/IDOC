// src/server.js

import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js"; // Import your helper function



const PORT = process.env.PORT || 5009;

// 1. Connect to the Database
connectDB().then(() => {
    // 2. Only start the server if the connection is successful
    app.listen(PORT, () => {
        console.log(`Appointment service running on port ${PORT}`);
    });
});