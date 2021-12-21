//import Main from './components/Main';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

const galleryData = {
    numberOfItems : 6,
    pathImage : "./IMG_2231.jpg"
}

function App(){
    return (
        <>
        <NavBar/>
        <ItemListContainer/>
        {
        //<Main galleryData={galleryData}/>
        }
        </>
    );
}

export default App;