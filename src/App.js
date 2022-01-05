import NavBar from './components/NavBar';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

const galleryData = {
    numberOfItems : 6,
    pathImage : "./IMG_2231.jpg"
}

function App(){
    return (
        <BrowserRouter>
            <NavBar/>
            <Main/>
        </BrowserRouter>
    );
}

export default App;