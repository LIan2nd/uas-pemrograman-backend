// import database
const db = require("../config/database")

// membuat class Employee
class Employee {

  // Method untuk menampilkan semua data
  static all() {
    return new Promise((resolve, reject) => {
      // Lakukan query ke db untuk ambil data
      const sql = "SELECT * FROM employees";
      db.query(sql, (sql, result) => {
        resolve(result);
      });
    });
  }

  // Method untuk membuat data
  static create(Employee) {
    return new Promise((resolve, reject) => {
      // Student.created_at = new Date();
      // Student.updated_at = new Date();

      const sql = "INSERT INTO employees SET ?";
      db.query(sql, Employee, (err, result) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          // Handle the error as needed
        } else {
          resolve(this.show(result.insertId));
        }
      });
    });
  }

  // Method untuk menampilkan salah satu data student
  static show(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ${id} `;
      db.query(sql, (err, results) => {
        const [employee] = results;
        resolve(employee);
      });
    });
  }

  // Method untuk memperbarui salah satu data
  static async update(id, employee) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE employees SET ? WHERE id = ?";
      db.query(sql, [employee, id], (err, results) => {
        resolve(results);
      });
    });

    const employeeData = await this.show(id);
    return employeeData;
  }

  // Method untuk menghapus salah satu data
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM employees WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Method untuk mencari salah satu data berdasarkan name
  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE name = ? `;
      db.query(sql, [name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const [employee] = results;
            resolve(employee);
          } else {
            resolve(null); // Tidak ada hasil yang ditemukan
          }
        }
      });
    });
  }

  // Method untuk mencari data yang statusnya active
  static status(status) {
    return new Promise((resolve, reject) => {
      // Lakukan query ke db untuk ambil data
      const sql = "SELECT * FROM employees WHERE status = ?";
      db.query(sql, status, (sql, result) => {
        resolve(result);
      });
    });
  }
  // buat fungsi
}

// export class Employee
module.exports = Employee;
