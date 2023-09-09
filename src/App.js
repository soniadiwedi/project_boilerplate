import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RootNavigation from './navigation/PrivateRoute';
import Navbars from './dashboard/AdminDashboard/Navbar';
import UserNavbars from './pages/Home/Navbars';




function App() {
  return (
    <div className="App">
      {/* <Navbars/> */}
      <UserNavbars/>
      <RootNavigation/>
    </div>
  );
}

export default App;
