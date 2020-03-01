import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ModalContainer extends React.Component {
  state = {
    dependents: []
  };

  addDependent = e => {
    this.setState(prevState => ({
      dependents: [...prevState.dependents, { dfirst: '', dlast: '' }]
    }));
  };

  handleChange = e => {
    if (['dfirst', 'dlast'].includes(e.target.className)) {
      let dependents = [...this.state.dependents];
      dependents[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ dependents });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  cancelModal = e => {
    this.setState({
      dependents: []
    });
    this.props.addDependents(this.state.dependents);
  };

  submitDependents = e => {
    this.props.addDependents(this.state.dependents);
    this.setState({
      dependents: []
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div
        className="popup"
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      >
        <div className="popup-inner">
          <br />
          <div className="row">
            <div className="col-sm-12">
              <Button
                type="button"
                className="btn btn-primary"
                variant="outline-primary"
                onClick={this.addDependent}
              >
                New Dependent
              </Button>
            </div>
          </div>
          <br />
          {this.state.dependents.map((val, idx) => {
            let firstId = `first-${idx}`;
            let lastId = `last-${idx}`;
            return (
              <section key={idx}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Enter Dependent's First Name</label>
                      <input
                        type="text"
                        name={firstId}
                        data-id={idx}
                        id={firstId}
                        className="dfirst"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Enter Dependent's Last Name</label>
                      <input
                        type="text"
                        name={lastId}
                        data-id={idx}
                        id={lastId}
                        className="dlast"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
          <br></br>
          <div className="row">
            <div className="col-sm-6">
              <Button
                type="button"
                className="btn btn-primary"
                variant="outline-success"
                onClick={this.submitDependents}
              >
                Save Dependents
              </Button>
            </div>
            <div className="col-sm-6">
              <Button
                type="button"
                className="btn btn-secondary"
                variant="outline-dark"
                onClick={this.cancelModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalContainer;
