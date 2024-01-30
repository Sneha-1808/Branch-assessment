
// const fs = require('fs').promises;
// const csv = require('csv-parser');

// async function readCSV(filePath) {
//   const data = [];

//   try {
//     const fileContent = await fs.readFile(filePath, 'utf-8');

//     return new Promise((resolve) => {
//       const readableStream = require('stream').Readable.from(fileContent);

//       readableStream
//         .pipe(csv())
//         .on('data', (row) => {
//           data.push(row);
//         })
//         .on('end', () => {
//           resolve(data);
//         });
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = readCSV;
// utils/csvParser.js
// const fs = require('fs').promises;
// const csv = require('csv-parser');

// async function readCSV(filePath) {
//   try {
//     const fileContent = await fs.readFile(filePath, 'utf-8');
//     return csv.parse(fileContent, { columns: true });
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = readCSV;

// utils/csvReader.js
// utils/csvReader.js
// const fs = require('fs');
// const { promisify } = require('util');
// const csv = require('csv-parser');

// const readFileAsync = promisify(fs.readFile);

// async function readCSV(filePath) {
//   try {
//     const fileContent = await readFileAsync(filePath, 'utf-8');
//     return csv.parse(fileContent, { columns: true });
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = readCSV;
// utils/csvReader.js
// const fs = require('fs').promises;
// const csv = require('csv-parser');

// async function readCSV(filePath) {
//   try {
//     const fileContent = await fs.readFile(filePath, 'utf-8');
//     return csv.parse(fileContent, { columns: true });
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = readCSV;
// utils/csvReader.js
// import csv from 'csv-parser';

// export async function readCSV(filePath) {
//   try {
//     const response = await fetch(filePath);
//     const fileContent = await response.text();
//     return csv.parse(fileContent, { columns: true });
//   } catch (error) {
//     throw error;
//   }
// }

// utils/csvReader.js
// import csv from 'csv-parser';

// export async function readCSV(filePath) {
//   try {
//     const response = await fetch(filePath);
//     const fileContent = await response.text();
//     return csv.parse(fileContent, { columns: true });
//   } catch (error) {
//     throw error;
//   }
// }

// utils/csvReader.js
// import fs from 'fs';
import csvParser from 'csv-parser';

export async function readCSV(filePath) {
  const data = [];

  
  try {
    const response = await fetch(filePath);
    const fileContent = await response.text();

    return new Promise((resolve) => {
      require('stream').Readable.from(fileContent)
        .pipe(csvParser())
        .on('data', (row) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(data);
        });
    });
  } catch (error) {
    throw error;
  }
}






