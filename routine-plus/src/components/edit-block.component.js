import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


//front end
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './styling/create.css';
import "bootstrap/dist/css/bootstrap.min.css";


export default class EditBlock extends Component {
  constructor(props) {
    super(props);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeRoutine = this.onChangeRoutine.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      task: '',
      routine: '',
      date: new Date(),
      status: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/blocks/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          task: response.data.task,
          routine: response.data.routine,
          date: new Date(response.data.date),
          status: response.data.status
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  onChangeTask(e) {
    this.setState({
      task: e.target.value
    })
  }
  onChangeRoutine(e) {
    this.setState({
      routine: e.target.value
    })
  }
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const block = {
      task: this.state.task,
      routine: this.state.routine,
      date: this.state.date,
      status: this.state.status
    }
    console.log(block);
    axios.patch('http://localhost:5000/blocks/update/' + this.props.match.params.id, block)
      .then(res => console.log(res.data));
    window.location = '/blocks';
  }
  onButtonCancel() {
    window.location = '/blocks';
  }
  render() {
    const routines = ["daily", "weekly", "monthly"]
    return (
      <div className="edit-container d-flex justify-content-center align-items-center">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <label className="task-label">Task:</label>
            <input type="text"
              required
              className="input-field"
              value={this.state.task}
              onChange={this.onChangeTask}
              placeholder="Task"
            />
          </div>
          <div className="form-group"> 
            <label>Routine: </label>
            <select required className="form-control" value={this.state.routine} onChange={this.onChangeRoutine}> {
              routines.map(function(routine) {
                return <option key={routine} value={routine}>{routine}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="date-label">Date: </label>
            <div>
              <DatePicker className="input-date"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Edit Block Log" className="btn btn-neon" />
          </div>
        </form>
        <button id="edit-cancel-btn" class="btn btn-cancel" onClick={this.onButtonCancel}>Cancel</button>
      </div>
    )
  }
}
