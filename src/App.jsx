
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ToDoList from './Components/ToDoList/ToDoList.jsx';
import Add_Task from './Components/Add/Add_Task.jsx'; 
import Edit_Task from './Components/Edit/Edit_Task.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ToDoList />,
  },
  {
    path: "/Add_Task",
    element: <Add_Task />,
  },
  {
   
  },
  {
    path: "/Edit_Task/:id",
    element: <Edit_Task />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
