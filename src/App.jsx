import { useState , useCallback , useEffect , useRef } from 'react'
import bgGif from './assets/bg1.jpg';

function App() {
  const [length , setLength] = useState(8);
  const [numberallowed , setNumberAllowed] = useState(false);
  const [charallowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");

  const passwordGenerator = useCallback( () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberallowed) str+= "0123456789"
    if(charallowed) str+= "₹`~!@#$%^&*()-_+=[]{}\|,./<>? "

    for(let i = 1 ; i <= length ; i++)
    {
      let char = Math.floor(Math.random()*str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  } , [length, numberallowed , charallowed , setPassword])

  useEffect( () => { passwordGenerator() } , [length, numberallowed , charallowed , passwordGenerator])

  const Passwordref = useRef(null)

  const CopyToClipboard = useCallback(() => {
    Passwordref.current?.select()

    window.navigator.clipboard.writeText(password)
  } , [password])
  return (
    <div>
      <div
      style={{backgroundImage: `url(${bgGif}` }} 
      className='flex justify-center items-center 
      h-screen w-screen bg-cover bg-no-repeat bg-center'
      >
      <div className='w-full max-w-lvh mx-auto shadow-md rounded-lg px-4 text-black
      bg-gray-600 py-3 text-lg '>
        <h1 className='text-white text-center my-0.5 text-2xl mb-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden bg-white my-2 mb-7'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={Passwordref} 
          />
          <button
          onClick={CopyToClipboard}
          className=' bg-blue-700 text-white outline-none px-1.5 py-0.5 shrink-0'
          >COPY</button>
        </div>
        <div className='flex gap-x-2 text-white'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={1}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={ (e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 ml-11'>
          <input 
            type="checkbox"
            defaultChecked={numberallowed}
            id='numberInput'
            onChange={ () => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          </div>
          <label htmlFor="numberInput">Numbers</label>
          <div className='flex items-center gap-x-1 ml-11'>
          <input 
            type="checkbox"
            defaultChecked={charallowed}
            id='charInput'
            onChange={ () => {
              setCharAllowed((prev) => !prev)
            }}
            />
          </div>
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default App
