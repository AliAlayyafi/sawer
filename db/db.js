const mysql = require('mysql');


class sql{


    constructor(){
        this.db = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'sawer'
          });
    }


    async addUser(username,password){

        const query = `INSERT INTO users (ID, USERNAME, PASSWORD) VALUES (NULL, ?, ?)`;
        return new Promise((resolve, reject) => {
          this.db.query(query, [username,password], (error) => {
            if (error) {
              reject(false);
            } else {
              resolve(true);
            }
          });
        });

    }


    async findUser(find,data){
      const query = 'SELECT * FROM users WHERE ?? = ?'; // ?? to ensure that the input is column name "MySql Syntax"
      return new Promise((resolve, reject) => {
        this.db.query(query, [find, data], (error, results, fields) => {
          if (error) {
            reject(false);
          } else {
            resolve(results);
          }
        });
      });

  }


  async login(username,password){
      const query = 'SELECT ID FROM users WHERE  USERNAME = ?  AND PASSWORD = ?';
      return new Promise((resolve, reject) => {
        this.db.query(query, [username, password], (error, results, fields) => {
          if (error) {
            reject(false);
          } else {
            resolve(results);
          }
        });
      });
   }

  

   async addHistory(id,link){
    
      const query = `INSERT INTO history (ID, USER, LINK, HISTORY, CREATED_AT) VALUES (NULL, ?, ?, '[]', current_timestamp())`;
      return new Promise((resolve, reject) => {
        this.db.query(query, [id,link], (error) => {
          if (error) {
            reject(false);
          } else {
            resolve(true);
          }
        });
      });

    }

    async getHestories(id){
      const query = `SELECT * FROM HISTORY WHERE  USER = '?'`;
      return new Promise((resolve, reject) => {
        this.db.query(query, [id], (error, results, fields) => {
          if (error) {
            reject(false);
          } else {
            resolve(results);
          }
        });
      });
   }


   async checkLink(link){
      const query = `SELECT * FROM history WHERE LINK = ?`;
      return new Promise((resolve, reject) => {
        this.db.query(query, [link], (error, results, fields) => {
          if (error) {
            reject(false);
          } else {
            resolve(results);
          }
        });
      });
   }

   async updateHistory(link, history) {
    const query = 'UPDATE `history` SET `HISTORY` = ? WHERE `history`.`LINK` = ?';
  
    return new Promise((resolve, reject) => {
      this.db.query(query, [history, link], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }





    end(){
        this.db.end();
    }


}


module.exports = sql;