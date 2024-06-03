import Nav from './component/Nav'
import Content from './component/HomePage/Content'
import {Routes,Route} from 'react-router-dom';
import BoardInfo from './component/BoardView/BoardInfo';


function App() {
 

  return (
    <>

    <Nav/>
    {/* <Sidebar/> */}
    <Routes>
  
      <Route path="/boards" element={<Content/>}/> 

      <Route path="/boards/:id"element={<BoardInfo/>}></Route>
    </Routes>

    </>
  )
}

export default App
