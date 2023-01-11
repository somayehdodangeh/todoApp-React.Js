import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';


function App() {
  return (
    <div className="App">

      <Header/>
      <TodoList/>

    </div>
  );
}

export default App;
