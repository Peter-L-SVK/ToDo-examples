import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="app">
      <TaskList />
    </div>
  );
}

export default App;
