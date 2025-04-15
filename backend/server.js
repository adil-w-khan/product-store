import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoute from './routes/product.route.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

const __dirname = path.resolve();

app.use(express.json()); // to parse JSON data ADD THIS LINE WHEN WORKING WITH POSTMAN

app.use("/api/products", productRoute)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get('', (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Postman 
app.listen(port, () => {
    connectDB();
    console.log('Server is running on port', port);
});