//import Main from './components/Main';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

const galleryData = {
    numberOfItems : 6,
    pathImage : "./IMG_2231.jpg"
}

function App(){
    return (
        <>
        <NavBar/>
        <ItemDetailContainer/>
        {
        //<Main galleryData={galleryData}/>
        }
        </>
    );
}

export default App;