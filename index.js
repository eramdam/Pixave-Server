const pixave = require('./pixave.js');
const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
  console.log(path.resolve(__dirname, '../Pixave.pxvlibrary/Masters'));
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
      root: path.resolve(__dirname, '../Pixave.pxvlibrary/Masters'),
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