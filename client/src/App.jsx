import './App.css'
import LoginForm from './components/loginForm';
import SideBar from './components/sidebar'
import TopBar from './components/topbar';
import LoginPage from './pages/login';

function App() {
  return (
    <div className='bg-[#0b0e15] min-h-screen'>
    {/* <TopBar />
    <SideBar /> */}
    <LoginPage />
    </div>
  )
}

export default App;
