import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uuid from "uuid/v4";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { render } from '@testing-library/react';
import { userContext } from '../userContext';
import { Row, Col, Button, Container } from 'react-bootstrap';
import ReactLoading from 'react-loading'
class Block extends Component {
  render() {
    var image = this.props.block.image;
    var image_url = "http://localhost:5000/images/" + image;
    console.log(image);
    return (
      <Fragment>
        <Col sm={3}>
          <div className="routine-image-container">
            <td><img className="routine-image" style={{ display: "block" }} alt="" src={image_url} /></td>
          </div>
        </Col>

        <Col className="px-4" sm={9}>
          <h4 className="task-text">{this.props.block.task}</h4>
          <p>{this.props.block.routine}</p>
          <p style={{ color: "rgba(255, 110, 255, 0.5)" }}>{this.props.block.date.substring(0, 10)}</p>
          {/*<p style={{ color: "rgba(255, 110, 255, 0.5)" }}>{this.props.block.lastUpdateDate.substring(0, 10)}</p>*/}
          <Link to={"/edit/" + this.props.block._id} className="link">edit</Link>
            |
          <a href="#top" className="link" onClick={() => { this.props.deleteBlock(this.props.block._id) }}>delete</a>
        </Col>
      </Fragment>
    )
  }
}
class DragItem extends Component {
  render() {
    return (
      <Draggable
        key={this.props.item._id}
        draggableId={this.props.item._id}
        index={this.props.index}
      >
        {(provided, snapshot) => {
          return (
            <div
              className="row"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                color: "white",
                borderRadius: "5px",
                userSelect: "none",
                padding: 16,
                margin: "8px",
                minHeight: "50px",
                borderStyle: "solid",
                borderWidth: "5px",
                boxShadow: snapshot.isDragging
                  ? "0px 0px 2px rgb(8, 58, 30), 0px 0px 10px #08a9c2"
                  : "none",
                borderColor: snapshot.isDragging
                  ? "#08deff"
                  : "rgb(143, 105, 218)",
                backgroundColor: "#333851",// light gray
                ...provided.draggableProps.style
              }}
            >
              <Block block={this.props.item} deleteBlock={this.props.deleteBlock} key={this.props.item._id} />
            </div>
          );
        }}
      </Draggable>
    )
  }
}
class DragColumn extends Component {
  render() {
    return (
      <Droppable droppableId={this.props.columnId} key={this.props.columnId}>
        {(provided, snapshot) => {
          return (
            <div
              className="column"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? "#515b7d" // lightest gray
                  : "#2a2f41", // column gray
                padding: 4,
                width: 350,
                height: 600,
                overflowY: "scroll",
                borderRadius: "5px"
              }}
            >
              {this.props.column.items.map((item, index) => {
                return (
                  <DragItem index={index} item={item} deleteBlock={this.props.deleteBlock} />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    )
  }
}
export default class BlocksList extends Component {
  constructor(props) {
    super(props);
    this.deleteBlock = this.deleteBlock.bind(this);

    this.state = { blocks: [], columns: [] };
  }
  componentDidMount() {
    setTimeout(() => {
    const today = new Date().getTime()/ (1000 * 60 * 60 * 24); // by junfeng
    axios.get('http://localhost:5000/blocks/', { headers: { "x-auth-token": localStorage.getItem("auth-token") } }) //by junfeng
      .then(response => {
        const bks = response.data
        const todo = bks.filter((b) => b.status === 'Todo' && this.checkDate(b))
        const doing = bks.filter((b) => !this.checkDate(b) || b.status === 'Doing')
        const done = bks.filter((b) => b.status === 'Done')
        // console.log('todo: ', todo)
        // console.log('doing: ', doing)
        // console.log('done: ', done)
          this.setState({
            blocks: bks,
            columns: {
              [uuid()]: {
                name: "Todo",
                items: todo
              },
              [uuid()]: {
                name: "Doing",
                items: doing
              },
              [uuid()]: {
                name: "Done",
                items: done
              }
            },
            done: true
          })
          console.log(this.state.columns)
        })
        .catch((error) => {
          console.log(error);
        })
    }, 300)
  }
  // false when from todo to doing, true when do nothing
  checkDate(element){
    const today = new Date().getTime()/ (1000 * 60 * 60 * 24);
    let period = element.routine;
    let startDay = new Date(element.date).getTime()/ (1000 * 60 * 60 * 24);
    let lastUpdateDay = new Date(element.lastUpdateDate).getTime()/ (1000 * 60 * 60 * 24);
    if (element.status === "Todo" &&
    today - startDay> 0 &&
    (Math.floor(today-startDay, period) > Math.floor(lastUpdateDay-startDay, period))){
      console.log('false');
      this.updateStatus(element._id, 'Doing');
      return false;
    }else{
      console.log('true');
      return true;
    }
  }
  deleteBlock(id) {
    axios.delete('http://localhost:5000/blocks/' + id)
      .then(response => {
        this.setState({
          blocks: this.state.blocks.filter(el => el._id !== id),
        })
      })
      .then(
        window.location.reload()
      )
  }
  updateStatus(id, newStatus) {
    axios.get('http://localhost:5000/blocks/' + id)
      .then(response => {
        const temp = {
          ...response.data,
          status: newStatus, // update status
          lastUpdateDate: new Date(), // update lastUpdateDate
        }
        console.log(temp)
        axios.patch('http://localhost:5000/blocks/update/' + id, temp)
          .then(response => { console.log(response.data) });
      })
  }
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }
  onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destColumn = columns[destination.droppableId];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      // console.log(source.index)
      // console.log(destination.index)
      // console.log(this.state.blocks)
      // console.log(destItems)
      // let tempItems = [...this.state.blocks];
      // let temp = this.state.blocks[source.index]
      // console.log(temp)
      // let temp = {...this.state.blocks.filter((b) => b._id === destItems[source.index]._id)};
      // temp[source.index] = {
      //   ...temp[source.index],
      //   status: destColumn.name
      // }
      // tempItems[destination.index] = temp[source.index]
      // console.log(tempItems)
      this.setState({
        blocks: this.state.blocks,

        columns: {
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        }
      })
      console.log(this.state.blocks)
      this.updateStatus(destItems[destination.index]._id, destColumn.name);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      this.setState({
        blocks: this.state.blocks,

        columns: {
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        }
      })
      console.log(this.state.blocks)
    }
  };
  render() {
    return (
      <Fragment>
        {!this.state.done ? (
          <ReactLoading className="spinner" type={"cylon"} color={"white"} />
        ) : (
            <Row style={{ display: "flex", justifyContent: "center", height: "100%" }} >
              <DragDropContext onDragEnd={result => this.onDragEnd(result, this.state.columns)}>
                {Object.entries(this.state.columns).map(([columnId, column], index) => {
                  return (
                    <div
                      className="columns-container"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontFamily: "\"Courier New\", cursive"
                      }}
                      key={columnId}
                    >
                      <h3 className="column-title">{column.name}</h3>
                      <div style={{ margin: "8px" }}>
                        <DragColumn columnId={columnId} column={column} deleteBlock={this.deleteBlock} />
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
              <Link to={"/create"}><button className="create-button">+</button></Link>
            </Row>
          )}
      </Fragment>
    )
  }
}
