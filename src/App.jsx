import { IoIosSearch } from "react-icons/io";
import './App.css';

function App() {



  const handleChange=(e)=>{
    let input=e.target.value
  }
  return (
    <div className="md: container bg-blue-500 mx-auto rounded-xl p-5 my-5 md:w-1/2 min-h-[80vh]"><div className='addCity my-3 flex justify-center'><input type="text" 
    className='rounded-md w-1/2 p-2'
    onChange={handleChange}/>
    <IoIosSearch  className="text-4xl ms-2 text-white" /></div>
       
    </div>
  );
}

export default App;
