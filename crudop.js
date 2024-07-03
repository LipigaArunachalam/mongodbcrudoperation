const http = require('http');
const { MongoClient, ObjectId } = require('mongodb');
const { parse } = require('querystring');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'herbs_management';

const server = http.createServer(async (req, res) => {
  
    if (req.url == '/insert' ) {
        if (req.method === 'POST') {
            let body = '';
        
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
        
            req.on('end', async () => {
                try {
                    const { item , price } = parse(body);
        
                    // Connect to MongoDB
                    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
                    const db = client.db(dbName);
        
                    // Insert the new item into the herbs collection
                    const collection = db.collection('herbs');
                    const newdata = { item, price };
                    const result = await collection.insertOne(newdata);
        
                    // Close MongoDB connection
                    client.close();
        
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Item inserted successfully!');
                } catch (err) {
                    console.error('Error:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    } else if (req.url == '/update' ) {
        if (req.method === 'POST') {
            let body = '';
        
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
        
            req.on('end', async () => {
                try {
                    const { oldItem, newItem, newprice } = parse(body);
        
                    // Connect to MongoDB
                    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
                    const db = client.db(dbName);
        
                    // Update the item in the herbs collection
                    const collection = db.collection('herbs');
                    const result = await collection.updateOne({ item: oldItem }, { $set: { item: newItem , price : newprice} });
        
                    // Close MongoDB connection
                    client.close();
        
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Item updated successfully!');
                } catch (err) {
                    console.error('Error:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    } else if (req.url == '/delete' ) {
        if (req.method === 'POST') {
            let body = '';
        
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
        
            req.on('end', async () => {
                try {
                    const { item } = parse(body);
        
                    // Connect to MongoDB
                    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
                    const db = client.db(dbName);
        
                    // Delete the item from the herbs collection
                    const collection = db.collection('herbs');
                    const result = await collection.deleteOne({ item });
        
                    // Close MongoDB connection
                    client.close();
        
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Item deleted successfully!');
                } catch (err) {
                    console.error('Error:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 2520;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
