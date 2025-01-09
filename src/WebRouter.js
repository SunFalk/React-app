import {BrowserRouter as Router, Routes, Route as R} from 'react-router-dom'
import {Test, Home, About, Calculator, Notepad, TodoList, Stopwatch, Chess} from './ui/components/index.js'

function WebRouter() {
  return (
    <Router>
      <Routes>
        <R path='/dev-test' element={<Test />} />
        <R path="/" element={<Home />} />
        <R path="/about" element={<About />} />
        <R path='/calculator' element={<Calculator />} />
        <R path='/notepad' element={<Notepad />} />
        <R path='/todo-list' element={<TodoList />} />
        <R path='/stopwatch' element={<Stopwatch />} />
        <R path='/chess' element={<Chess />} />
        <R path='/*' element={<h2>Page not found</h2>}/>
      </Routes>
    </Router>
  );
}

export default WebRouter;