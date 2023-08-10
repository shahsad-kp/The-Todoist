import './App.scss';
import {SideBar} from "./components/SideBar/SideBar.tsx";
import {Calendar} from "./components/Calendar/Calendar.tsx";

function App() {
    return (<div className={'body'}>
        <SideBar/>
        <Calendar/>
        </div>)
}

export default App
