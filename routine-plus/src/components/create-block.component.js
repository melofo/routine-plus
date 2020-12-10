import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class CreateBlock extends Component {
  constructor(props) {
    super(props);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeRoutine = this.onChangeRoutine.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      image: null,
      task: '',
      routine: '',
      date: new Date(),
    }
  }
  onChangeImage(e) {
    e.preventDefault();
    const file = document.getElementById("inputGroupFile01").files;
    const formData = new FormData();
       if (file.length !== 0) {
      formData.append("img", file[0]);
      fetch("http://localhost:5000/images", {
        method: "POST",
        body: formData
      }).then(r => {
        console.log(r);
        document.getElementById("img").setAttribute("src", `http://localhost:5000/images/${file[0].name}`);
      }); 
      this.setState({
        image: file[0].name
      })
    }
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
      image: this.state.image,
      task: this.state.task,
      routine: this.state.routine,
      date: this.state.date
    }
    if (block.image === null) {
      alert("Must have image!")
      return
    }
    axios.post('http://localhost:5000/blocks/add', block, { headers: { "x-auth-token": localStorage.getItem("auth-token") } }) // by junfeng
      .then(res => console.log(res.data));
    window.location = '/blocks';
  }
  onButtonCancel(e){
    window.location = '/blocks';
  }
  render() {
    return (
    <div>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Image: </label>
          <div className="container">
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.onChangeImage}>
              Upload
            </button>
            <img id="img" style={{display: "block"}} alt=""></img>
          </div>
        </div>
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
          <input type="submit" value="Create Block Log" className="btn btn-primary" />
        </div>
      </form>
      <button onClick={this.onButtonCancel}>Cancel</button>
    </div>
    )
  }
}