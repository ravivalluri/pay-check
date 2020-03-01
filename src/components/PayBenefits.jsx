import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import { Button } from 'react-bootstrap';

class PayBenefits extends Component {
  state = {
    employees: [],
    showModal: false
  };

  addEmployee = e => {
    this.setState(prevState => ({
      employees: [
        ...prevState.employees,
        { first: '', last: '', dependents: [] }
      ]
    }));
  };

  openModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  saveDependents = (d, idx) => {
    this.setState({
      showModal: !this.state.showModal
    });
    this.setState(state => {
      state.employees[idx].dependents = d;
    });
  };

  handleChange = e => {
    if (['first', 'last'].includes(e.target.className)) {
      let employees = [...this.state.employees];
      employees[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ employees });
    }
  };

  onCalculate = e => {
    this.props.onCalculate(this.state.employees);
    this.setState({
      employees: []
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div className="row">
          <div className="col-sm-12">
            <br />
            <h3>Add employee details below</h3>
            <br />
            <Button
              type="button"
              className="btn btn-primary"
              variant="outline-primary"
              onClick={this.addEmployee}
            >
              Add New Employee
            </Button>
            <br />
          </div>
        </div>
        <br></br>
        {this.state.employees.map((val, idx) => {
          let firstId = `first-${idx}`;
          let lastId = `last-${idx}`;
          let dependentId = `dependent-${idx}`;
          return (
            <section key={idx}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Enter First Name</label>
                    <input
                      type="text"
                      name={firstId}
                      data-id={idx}
                      id={firstId}
                      className="first"
                      placeholder="First Name"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Enter Last Name</label>
                    <input
                      type="text"
                      name={lastId}
                      data-id={idx}
                      id={lastId}
                      className="last"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    variant="outline-secondary"
                    onClick={this.openModal.bind(this)}
                  >
                    Add Dependents
                  </Button>
                </div>
              </div>
              <div>
                {this.state.showModal ? (
                  <ModalContainer
                    addDependents={d => this.saveDependents(d, idx)}
                    name={dependentId}
                    data-id={idx}
                    id={dependentId}
                    className="dependents"
                  ></ModalContainer>
                ) : null}
              </div>
            </section>
          );
        })}
        <br></br>
        <div className="row">
          <div className="col-sm-12">
            <br />
            <Button
              type="button"
              className="btn btn-primary"
              variant="outline"
              onClick={e => this.onCalculate(e)}
            >
              Calculate the Benefits!
            </Button>
            <br />
          </div>
        </div>
      </form>
    );
  }
}

export default PayBenefits;
