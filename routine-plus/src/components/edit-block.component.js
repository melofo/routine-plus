import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


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
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/blocks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          task: response.data.task,
          routine: response.data.routine,
          date: new Date(response.data.date)
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
      date: this.state.date
    }
    console.log(block);
    axios.patch('http://localhost:5000/blocks/update/' + this.props.match.params.id, block)
      .then(res => console.log(res.data));
    window.location = '/blocks';
  }
  render() {
    return (
    <div>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Task: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.task}
              onChange={this.onChangeTask}
              />
        </div>
        <div className="form-group"> 
          <label>Routine: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.routine}
              onChange={this.onChangeRoutine}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Block Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}