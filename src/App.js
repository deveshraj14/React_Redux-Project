// import logo from './logo.svg';
// import './App.css';
import Homepage from './Components/Homepage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Postdetails from './Components/Postdetails';
import Commentdata from './Components/Commentdata';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/postdetails/:postId" element={<Postdetails />} />
      <Route path="/commentsdata" element={<Commentdata />} />
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
