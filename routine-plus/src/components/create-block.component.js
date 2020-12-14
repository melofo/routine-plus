import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//front end
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './styling/create.css';
import "bootstrap/dist/css/bootstrap.min.css";

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
      routine: 'daily',
      date: new Date(),
      status: 'Backlog',
    }
  }
  //event listener to change name of span
  onChangeFileInputName(e) {
    // console.log("We are here");
    const file = document.getElementById("inputGroupFile01").files;
    const fileChosen = document.getElementById("file-chosen");
    if (file[0].name.length > 12) {
      fileChosen.textContent = file[0].name.slice(0, 13) + "...";
    }
    else {
      fileChosen.textContent = file[0].name;
    }
  }
  onChangeImage() {
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
    alert("Image Uploaded!");
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
      date: this.state.date,
      status: this.state.status,
    }
    if (block.image === null) {
      alert("Upload The Image!")
      return
    }
    axios.post('http://localhost:5000/blocks/add', block, { headers: { "x-auth-token": localStorage.getItem("auth-token") } }) // by junfeng
      .then(res => console.log(res.data));
    window.location = '/blocks';
  }
  onButtonCancel(e) {
    window.location = '/blocks';
  }
  render() {
    const routines = ["daily", "weekly", "monthly"]
    return (
      <div className="create-container d-flex justify-content-center align-items-center" >
        <div className="test">
          <form className="create-form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <h2> New Routine </h2>
              <div className="mb-3">
                <Form.File id="formcheck-api-regular">
                  <Form.File.Label className="psuedo-upload btn btn-neon" htmlFor="inputGroupFile01">Select an Image</Form.File.Label> {/* custom upload button, actually a label*/}
                  
                  <span id="file-chosen" style={{ paddingLeft: "10px", color: "grey" }}> No file chosen</span> {/* file-chosen*/}
                  <button type="button" className="btn btn-secondary btn-sm" onClick={this.onChangeImage}>Upload</button>

                  <Form.File.Input id="inputGroupFile01" className="input-field" onChange={this.onChangeFileInputName} hidden /> {/* actual-btn*/}
                </Form.File>
              </div>
              <img id="img" style={{ display: "none" }} alt=""></img>
            </div>
            <div className="form-group">
              <input type="text"
                required
                className="input-field"
                placeholder="Task"
                value={this.state.task}
                onChange={this.onChangeTask}
              />
            </div>
            <div className="form-group">
              <label>Routine: </label>
              <select required className="form-control" value={this.state.routine} onChange={this.onChangeRoutine}> {
                routines.map(function (routine) {
                  return <option key={routine} value={routine}>{routine}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="date-label">Date: </label>
              <div>
                <DatePicker className="input-date-create"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="Create Routine" className="btn btn-neon" />
            </div>
            <button class="btn btn-cancel" onClick={this.onButtonCancel}>Cancel</button>

          </form>
        </div>
      </div>
    )
  }
}