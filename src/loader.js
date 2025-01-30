const mongoose = require('mongoose');

(async () => {
    console.log("loading dependencies...");
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to db!");
})();