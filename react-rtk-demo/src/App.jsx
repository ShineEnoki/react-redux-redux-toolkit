
import './App.css'
import CakeView from './features/cake/CakeView'
import IcecreamView from './features/icecream/IcecreamView'
import { UserView } from './features/user/UserView'

function App() {

    return (
        <div className='main'>
            <div className='container'>
                <CakeView />
                <IcecreamView />
                <UserView />
            </div>
        </div>
    )
}

export default App
