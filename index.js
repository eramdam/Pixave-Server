const path = require('path')
const config = require('config')

if (config.path === '**REQUIRED**') {
  console.log('Please config the path of the Pixave.pxvlibrary in your config file first');
  process.exit(1);
}

const dbPath = path.resolve(config.path, 'Pixave.pxvlibrary/');

const pixave = require('./pixave.js');
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/:filename', (req, res) => {
  const filename = req.params.filename.replace(/\.[a-z0-9]+$/,'').replace(/[\"\'\;\/]/g, '');
  console.log(filename);
  
  pixave(filename).then(rows => {
    console.log(rows);
    if (rows.length === 0)
      return res.sendStatus(404);

    const finalPath = rows[0].ZMEDIAPATH;
    const opts = {
      root: path.resolve(dbPath, 'Masters'),
      headers: {
        'x-sent': true,
        'x-timestamp': Date.now()
      }
    }
    
    res.sendFile(finalPath, opts, (err) => {
      if (err) {
        console.log(err);
      }
      
      console.log(`Served ${finalPath}`);
    })
  }).catch(err => {
    console.log(err);
  })
})

app.listen(4242, () => {
  console.log('listening on 4242');
})