// import Model Employee
const { request } = require("express");
const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
  async index(req, res) {

    const employee = await Employee.all();
    if (employee.length > 0) {
      const data = {
        message: "Menampilkan data employee",
        data: employee
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employee is empty",
      };

      res.status(404).json(data);
    }

  }

  // Store Method
  async store(req, res) {
    const { name, gender, phone, address, email, status, hired_on } = req.body;

    if (!name || !gender || !phone || !address || !email || !status || !hired_on) {
      const data = {
        message: "Semua data harus dikirim",
      };

      return res.status(422).json(data);
    }

    const employees = await Employee.create(req.body);
    const data = {
      message: `Menambahkan data Student`,
      data: employees
    };
    res.status(201).json(data);
  }

  // Show Method
  async find(req, res) {
    const { id } = req.params;
    const employee = await Employee.show(id);

    if (employee) {
      const data = {
        message: `Show ${employee.name}'s data`,
        data: employee
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Employee not found`
      };
      res.status(404).json(data);
    }
  }

  // Method Update
  async update(req, res) {
    const { id } = req.params;
    const employee = await Employee.show(id);
    if (employee) {
      const employee = await Employee.update(id, req.body);
      const data = {
        message: `Mengedit data student dengan id ${id}`,
        data: employee
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Employee not found`,
      };
      res.status(404).json(data);
    }
  }

  // Method Destroy
  async destroy(req, res) {
    const { id } = req.params;
    const employee = await Employee.show(id);

    if (employee) {
      await Employee.delete(id);
      const data = {
        message: `Menghapus data employees dengan id ${id}`,
        data: employee
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Employee not found",
      };
      res.status(404).json(data);
    }
  }

  // Search Method
  async search(req, res) {
    const { name } = req.params;
    const employee = await Employee.search(name);

    if (employee) {
      const data = {
        message: `Show ${name}'s data`,
        data: employee
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Employee not found`
      };
      res.status(404).json(data);
    }
  }

  // Active Status Method
  async active(req, res) {
    const employee = await Employee.status('active');
    if (employee) {
      const data = {
        message: `Show active status data`,
        data: employee
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Employee not found`,
        data: null
      };
      res.status(404).json(data);
    }
  }

  // Inactive Status Method
  async inactive(req, res) {
    const employee = await Employee.status('inactive');
    if (employee) {
      const data = {
        message: `Show inactive status data`,
        data: employee
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Employee not found`
      };
      res.status(404).json(data);
    }
  }

  // Terminated Status Method
  async terminated(req, res) {
    const employee = await Employee.status('terminated');
    if (employee) {
      const data = {
        message: `Show terminated status data`,
        data: employee
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Employee not found`
      };
      res.status(404).json(data);
    }
  }
  // buat fungsi
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
