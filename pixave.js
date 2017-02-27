const path = require('path')
const config = require('config')

if (config.path === '**REQUIRED**') {
  console.log('Please config the path of the Pixave.pxvlibrary in your config file first');
  process.exit(1);
}

const dbPath = path.resolve(config.path, 'Pixave.pxvlibrary/Pixave');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(dbPath);

module.exports = (title) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`select ZMEDIAPATH from ZMEDIA where ZMEDIATITLE="${title}"`, (err, rows) => {
        if (err) {
          return reject(err);
        }
        
        return resolve(rows);
      });
    })
  });
}