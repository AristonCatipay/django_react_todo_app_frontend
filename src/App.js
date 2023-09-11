import React, {Component} from 'react'
import './App.css';
import Modal from './components/Modal'

const tasks = [
  {
    id: 1,
    title: "Breakfast",
    description: "Preparing the meal for breakfast.",
    completed: false
  }, 
  {
    id: 2,
    title: "Lunch",
    description: "Preparing the meal for lunch.",
    completed: false
  },
  {
    id: 3,
    title: "Dinner",
    description: "Preparing the meal for dinner.",
    completed: true
  },
]

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      viewCompleted: false,
      taskList: tasks,
    };
  }

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
    const newItems = this.state.taskList.filter(
      item => item.completed == viewCompleted
    );
    // Return new items and map them.
    return newItems.map(item =>(
      <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
        <span className={`todo-title me-2 ${this.state.viewCompleted ? "completed-todo": 
      ""}`} title={item.title}>
          {item.title}
        </span>
        <span>
          <button className='btn btn-info me-2'>Edit</button>
          <button className='btn btn-danger me-2'>Delete</button>
        </span>
      </li>
    ))
  };


  render(){
    return (
      <main className='context'>
        <h1 className='text-black text-uppercase text-center my-4'>
            Task Manager
        </h1>
        <div className='row'>
            <div className='col-md-6 col-sma-10 mx-auto p-0'>
                <div className='card p-3'>
                    <div>
                      <button className='btn btn-warning'>Add task</button>
                    </div>
                    {this.renderTabList()}
                    <ul className='list-group list-group-flush'>
                      {this.renderItems()}
                    </ul>
                </div>
            </div>
        </div>
      </main>
    )
  }
}

export default App;
