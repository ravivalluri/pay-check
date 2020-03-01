import React, { Component } from 'react';
import './App.scss';
import PayBenefits from './PayBenefits';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  setV = {
    checksPerYear: 26,
    monthlyPay: 2000,
    yearlyBenefit: 1000,
    dependentYearlyBenefit: 500,
    discount: 0.1,
    employeeContribution: 0.7
  };

  state = {
    input: {},
    totalCost: 0,
    employees: []
  };
  onSubmit = input => {
    var calculated = this._calculateCost(input);
    this.setState(this.state);
    this.setState({ employees: calculated });
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="/">
            Benefits
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <PayBenefits onCalculate={fields => this.onSubmit(fields)} />
        <div className="row">
          <div className="col-sm-12">
            <br />
            <h4>
              Total Cost Per Year: ${this.state.totalCost.toLocaleString()}
            </h4>
            <br />
          </div>
        </div>
        {this.state.employees.map(emp => {
          return (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>
                    {emp.first} {emp.last}
                  </th>
                  <th>With Discount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Salary</th>
                  <td>${emp.yearlySalary}</td>
                </tr>
                <tr>
                  <th>Benefits Cost </th>
                  <td>{emp.hasDiscount === true ? '(-10%)' : ''}</td>
                  <td>${emp.benefitsCost}</td>
                </tr>
                <tr>
                  <th>Dependents:</th>
                </tr>
                {emp.dependents.map(d => {
                  return (
                    <tr>
                      <td>
                        {d.first} {d.last}{' '}
                        <span>{d.hasDiscount === true ? '(-10%)' : ''}</span>
                      </td>
                      <td>${d.benefitsCost}</td>
                    </tr>
                  );
                })}
                <tr>
                  <th>Yearly Cost:</th>
                  <td>${emp.costToEmployer}</td>
                </tr>
              </tbody>
            </Table>
          );
        })}
      </div>
    );
  }

  _calculateCost(employees) {
    var calculatedEmployees = [];
    employees.forEach(employee => {
      var employeeObj = {
        first: employee.first,
        last: employee.last,
        costToEmployer: 0,
        yearlySalary: this.setV.monthlyPay * this.setV.checksPerYear,
        benefitsCost: 0,
        hasDiscount: false,
        dependents: employee.dependents
      };
      var benefitCost = this._calculateEmployee(employeeObj);
      var dependentCost = this._calculateDependents(employeeObj);
      employeeObj.costToEmployer =
        employeeObj.yearlySalary + benefitCost + dependentCost;
      this.setState(state => {
        state.totalCost += employeeObj.costToEmployer;
      });
      calculatedEmployees.push(employeeObj);
    });
    return calculatedEmployees;
  }

  _calculateEmployee(employee) {
    var costToEmployer = 0;
    if (employee.first[0].toUpperCase() === 'A') {
      costToEmployer = parseFloat(
        (
          this.setV.yearlyBenefit -
          this.setV.yearlyBenefit *
            this.setV.employeeContribution *
            (1 - this.setV.discount)
        ).toFixed(2)
      );
      employee.benefitsCost = costToEmployer;
      employee.hasDiscount = true;
    } else {
      costToEmployer = parseFloat(
        (
          this.setV.yearlyBenefit -
          this.setV.yearlyBenefit * this.setV.employeeContribution
        ).toFixed(2)
      );
      employee.benefitsCost = costToEmployer;
    }
    return costToEmployer;
  }

  _calculateDependents(employee) {
    var cost = 0;
    var newDeps = [];
    let dependentCost;
    let newDep;
    employee.dependents.forEach(d => {
      if (d.dfirst[0].toUpperCase() === 'A') {
        dependentCost = parseFloat(
          (
            this.setV.dependentYearlyBenefit -
            this.setV.dependentYearlyBenefit *
              this.setV.employeeContribution *
              (1 - this.setV.discount)
          ).toFixed(2)
        );
        cost += dependentCost;
        newDep = {
          first: d.dfirst,
          last: d.dlast,
          benefitsCost: dependentCost,
          hasDiscount: true
        };
        newDeps.push(newDep);
      } else {
        dependentCost = parseFloat(
          (
            this.setV.dependentYearlyBenefit -
            this.setV.dependentYearlyBenefit * this.setV.employeeContribution
          ).toFixed(2)
        );
        cost += dependentCost;
        newDep = {
          first: d.dfirst,
          last: d.dlast,
          benefitsCost: dependentCost,
          hasDiscount: false
        };
        newDeps.push(newDep);
      }
    });
    employee.dependents = newDeps;
    return cost;
  }
}

export default App;
