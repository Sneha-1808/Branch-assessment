import connectDB from '../../utils/db';
import Message from '../../models/messageModel';
import fs from 'fs';
import csv from 'csv-parser';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  await connectDB();

  const data = [];

  fs.createReadStream(req.body.file.path)
    .pipe(csv())
    .on('data', (row) => {
      data.push({
        userID: row.userID,
        timestamp: new Date(row.timestamp),
        message: row.message,
      });
    })
    .on('end', async () => {
      try {
        const result = await Message.insertMany(data);
        res.status(200).json({ success: true, result });
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
}

