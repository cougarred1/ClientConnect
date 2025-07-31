const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');   

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/clientDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected!"))
.catch(error => console.log(error))

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    notes: String,
    followUpDate: String,
});

const Client = mongoose.model('Client', clientSchema);


app.get('/api/clients', async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/api/clients", async (req, res) => {

    try {
        const client = await Client.create(req.body);
        res.status(201).json({
            message: "Client successfully created!",
            client: client
        })
    } catch(error) {
        res.status(500).json({ 
            message: "Error creating client!"
        })
    }
      
})

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!'});
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});