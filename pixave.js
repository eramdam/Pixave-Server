const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('../Pixave.pxvlibrary/Pixave');

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