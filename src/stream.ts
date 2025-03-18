/**
 * @author: linhhuynhcoding
 * @version: 1.0.0
 * @description: This is a simple example for learning Stream
 * @file: stream.ts
 */

import fs from 'fs';
import path from 'path';
import { createServer } from 'http';

// Create a big file
// export function createBigFileJSON() {
//      console.log('Creating big file...');
//      const array = [];
//      const result = [];
//      for (let i = 0; i < 1000000; i++) {
//           array.push({
//                id: i,
//                name: `Name ${i}`
//           });
//      }
//      for (let i = 0; i < 10; i++) {
//           fs.appendFileSync(path.join(__dirname, '..', '/files/bigFile.json'), JSON.stringify(array));
//      }
//      console.log('Big file created!');
// }
// createBigFileJSON()


// Configure the server
const server = createServer();

server.on('request', (req, res) => {
     // Read file withuot stream
     fs.readFile(path.join(__dirname, '..', '/files/bigFile.json'), (err, data) => {
          if (err) {
               res.end('Error');
          }
          else {
               fs.writeFile(path.join(__dirname, '..', '/files/bigFileCopy.json'), data, (err) => { 
                    if (err) {
                         res.end('Error');
                    }
                    else {
                         res.end('Success');
                    }
               });
          }
     });

     // Read file with stream
     const readable = fs.createReadStream(path.join(__dirname, '..', '/files/bigFile.json'));
     const writable = fs.createWriteStream(path.join(__dirname, '..', '/files/bigFileCopyStream.json'));

     readable.pipe(writable);

     writable.on('finish', () => {
          res.end('Success');
     });
});

server.listen(8000);
process.title = 'Server without Stream';