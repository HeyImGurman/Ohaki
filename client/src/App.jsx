import './App.css'
import SideBar from './components/sidebar'
import TopBar from './components/topbar';

function App() {
  return (
    <div className='bg-[#0b0e15] min-h-screen'>
    <TopBar />
    <SideBar />
    </div>
  )
}

export default App;
