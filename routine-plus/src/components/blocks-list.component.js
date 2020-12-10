import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Block extends Component {
  render() {
    var image = this.props.block.image;
    var image_url = "http://localhost:5000/images/" + image;
    console.log(image);
    return(
      <tr>
        <td><img id="img" style={{display: "block"}} alt="" src={image_url}/></td>
        <td>{this.props.block.task}</td>
        <td>{this.props.block.routine}</td>
        <td>{this.props.block.date.substring(0,10)}</td>
        <td>
          <Link to = {"/edit/"+this.props.block._id}>edit</Link> 
          <p> </p>
          <a href="#top" onClick={() => {this.props.deleteBlock(this.props.block._id)}}>delete</a>          
        </td>
      </tr>
    )
  }
}

export default class BlocksList extends Component {
  constructor(props) {
    super(props);
    this.deleteBlock = this.deleteBlock.bind(this)
    this.state = {blocks: []};
  }
  componentDidMount() {
    axios.get('http://localhost:5000/blocks/')
      .then(response => {
        this.setState({blocks: response.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }
  deleteBlock(id) {
    axios.delete('http://localhost:5000/blocks/'+id)
      .then(response => {console.log(response.data)});
    this.setState({
      blocks: this.state.blocks.filter(el => el._id !== id)
    })
  }
  blockList() {
    return this.state.blocks.map(currentblock => {
      return <Block block={currentblock} deleteBlock={this.deleteBlock} key={currentblock._id} />;
    })
  }
  render() {
    return (
      <div>
        <Link to = {"/create"}>create</Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Image</th>
              <th>Task</th>
              <th>Routine</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.blockList()}
          </tbody>
        </table>
      </div>
    )
  }
}