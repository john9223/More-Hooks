import React, { useReducer, useState, useRef } from 'react';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'add_task':
      return [...state, { text: action.text, hidden: false }];
    case 'change_task':
      return state.map((task, index) =>
        index === action.index ? { ...task, hidden: !task.hidden } : task
      );
    default:
      return state;
  }
};

const UseRef = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [taskText, setTaskText] = useState('');
  const Ref = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (taskText.trim()) {
        dispatch({ type: 'add_task', text: taskText });
        setTaskText('');
      }
    }
  };

  const toggleTask = (index) => {
    dispatch({ type: 'change_task', index });
  };

  const focusInput = () => {
    Ref.current.focus();
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter new task"
        ref={Ref}
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task.hidden ? 'This content is hidden' : task.text}</span>
            <button onClick={() => toggleTask(index)}>Toggle</button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button onClick={focusInput}>Get Back to Writing</button>
      )}
    </div>
  );
};

export default UseRef;
