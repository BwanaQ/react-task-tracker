import {useState} from 'react'
import Header from './components/Header';
import './App.css';
import Tasks from './components/Tasks';

function App() {
  const [tasks, setTasks]= useState(
    [
      {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
      },
      {
        id: 2,
        text: 'School Meeting',
        day: 'Feb 5th at 4:30pm',
        reminder: true,
      },
      {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 7:30pm',
        reminder: false,
      },
    ]
  )  
  return (
    <div className="container">
      <Header/>
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
