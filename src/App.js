import React, {Component} from 'react'
import './App.css';
import Modal from './components/Modal'
import axios from 'axios';

// const tasks = [
//   {
//     id: 1,
//     title: "Breakfast",
//     description: "Preparing the meal for breakfast.",
//     completed: false
//   }, 
//   {
//     id: 2,
//     title: "Lunch",
//     description: "Preparing the meal for lunch.",
//     completed: false
//   },
//   {
//     id: 3,
//     title: "Dinner",
//     description: "Preparing the meal for dinner.",
//     completed: true
//   },
// ]

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal: false, // Don't open the modal always after you open the application.
      viewCompleted: false,
      //taskList: tasks, This is commented to use the data in the API.
      activeItem: {
        title: "",
        description: "",
        completed: false,
      }, 
      // taskList: tasks, # This is commented to use the data in the API.
      todoList : [],
    };
  }

  componentDidMount() {
    this.refreshList();
  };

  refreshList = () => {
    axios
    .get('http://localhost:8000/api/tasks')
    .then(res => this.setState({todoList : res.data}))
    .catch(err => console.log(err)) 
  };

  // Create the toggle property.
  toggle = () => {
    this.setState({modal: !this.state.modal});
  };
  handleSubmit = item => {
    this.toggle();
    // alert('Saved!' + JSON.stringify(item)); 
    // The code above is used to check if the frontend is working properly.
    if (item.id){
      // Editing old post
      axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item).then(res => this.refreshList());
      return;
    }
    // Creating new post
    axios.post('http://localhost:8000/api/tasks/', item).then(res => this.refreshList());
  };
  handleDelete = item => {
    // alert('Deleted!' + JSON.stringify(item));
    // The code above is used to check if the frontend is working properly.
    axios.delete(`http://localhost:8000/api/tasks/${item.id}/`).then(res => this.refreshList())
  };
  createItem = () => {
    const item = {title: "", description: "", completed: false};
    this.setState({activeItem: item, modal: !this.state.modal});
  };
  editItem = item => {
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  displayCompleted = status => {
    if (status){
      return this.setState({viewCompleted:true})
    }
    return this.setState({viewCompleted:false})
  }

  renderTabList = () => {
    return (
      <div className='my-5 tab-list'>
        <span 
        onClick={() => this.displayCompleted(true)}
        className={this.state.viewCompleted ? "active" : ""}>
          Completed
        </span> 
        <span 
        onClick={() => this.displayCompleted(false)}
        className={this.state.viewCompleted ? "" : "active"}>
          Incomplete
        </span> 
      </div>
    )
  }

  // Rendering items in the list. Completed or incomplete.
  renderItems = () => {
    const{viewCompleted} = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    // Return new items and map them.
    return newItems.map(item =>(
      <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
        <span className={`todo-title me-2 ${this.state.viewCompleted ? "completed-todo": 
      ""}`} title={item.title}>
          {item.title}
        </span>
        <span>
        <button className='btn btn-info me-2' onClick={() => this.editItem(item)}>Edit</button>
        <button className='btn btn-danger me-2' onClick={() => this.handleDelete(item)}>Delete</button>
        </span>
      </li>
    ))
  };


  render(){
    return (
      <main className='content p-3 mb-2 bg-info'>
        <h1 className='text-white text-uppercase text-center my-4'>
            Task Manager
        </h1>
        <div className='row'>
            <div className='col-md-6 col-sma-10 mx-auto p-0'>
                <div className='card p-3'>
                    <div>
                    <button className='btn btn-warning' onClick={this.createItem}>Add task</button>
                    </div>
                    {this.renderTabList()}
                    <ul className='list-group list-group-flush'>
                      {this.renderItems()}
                    </ul>
                </div>
            </div>
        </div>
        <footer className='my-3 mb-2 bg-info text-white text-center'>Copyright 2023 &copy; All rights reserved.</footer>
        {this.state.modal ? (
          <Modal activeItem = {this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit}>

          </Modal>
        ): null}
      </main>
    )
  }
}

export default App;
