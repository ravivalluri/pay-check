import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import { Button } from 'react-bootstrap';

class PayBenefits extends Component {
  state = {
    employees: [],
    showPopup: false
  };

  //add a new employee to the state
  addEmployee = e => {
    this.setState(prevState => ({
      employees: [
        ...prevState.employees,
        { first: '', last: '', dependents: [] }
      ]
    }));
  };

  //open a modal to display dependents
  openPopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  //save the dependents on an employee
  saveDependents = (d, idx) => {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.state.employees[idx].dependents = d;
  };

  //handle the imput changes
  handleChange = e => {
    if (['first', 'last'].includes(e.target.className)) {
      let employees = [...this.state.employees];
      employees[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ employees });
    }
  };

  //calculate the employee data to send it to the app
  onCalculate = e => {
    this.props.onCalculate(this.state.employees);
    this.setState({
      employees: []
    });
  };

  //preventing submit for all the buttons
  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <h4>Click the button below to add employee information</h4>
              <Button
                type="button"
                className="btn btn-primary"
                variant="outline-primary"
                onClick={this.addEmployee}
              >
                Add New Employee
              </Button>
            </div>
          </div>
        </div>
        <br></br>
        {this.state.employees.map((val, idx) => {
          let firstId = `first-${idx}`;
          let lastId = `last-${idx}`;
          let dependentId = `dependent-${idx}`;
          return (
            <section>
              <div>
                <input
                  name={firstId}
                  data-id={idx}
                  id={firstId}
                  className="first"
                  placeholder="First Name"
                />
                <input
                  name={lastId}
                  data-id={idx}
                  id={lastId}
                  className="last"
                  placeholder="Last Name"
                />
                <Button
                  type="button"
                  className="btn btn-secondary"
                  variant="outline-secondary"
                  onClick={this.openPopup.bind(this)}
                >
                  Add Dependents
                </Button>
                {this.state.showPopup ? (
                  <ModalContainer
                    addDependents={d => this.saveDependents(d, idx)}
                    name={dependentId}
                    data-id={idx}
                    id={dependentId}
                    className="dependents"
                  />
                ) : null}
              </div>
            </section>
          );
        })}
        <br></br>
        <Button
          type="button"
          className="btn btn-secondary"
          variant="outline-success"
          onClick={e => this.onCalculate(e)}
        >
          Calculate
        </Button>
      </form>
    );
  }
}

export default PayBenefits;
