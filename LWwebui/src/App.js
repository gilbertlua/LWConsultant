import './App.css';
import { Main } from './Component/Main/Main';
import ControlPanel from './Component/ControlPanel/ControlPanel';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableList from './Component/ControlPanel/TableList';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Main/>
  },
  {
    path:"/control-panel",
    element:<ControlPanel/>
  },
  {
    path:"/table-list",
    element:<TableList/>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
