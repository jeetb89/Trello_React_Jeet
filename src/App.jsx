import Nav from './component/Nav'
import Content from './component/HomePage/Content'
import {Routes,Route} from 'react-router-dom';
import BoardInfo from './component/BoardView/BoardInfo';
import { Navigate } from 'react-router-dom';

function App() {
 

  return (
    <>

    <Nav/>
    <Routes>
    <Route path="/" element={<Navigate to="/boards" />} />
      <Route path="/boards" element={<Content/>}/> 

      <Route path="/boards/:id"element={<BoardInfo/>}></Route>
    </Routes>

    </>
  )
}

export default App
