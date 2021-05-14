import React, {useState, useEffect} from 'react';
import {Converter, enUS, bnBD, hiIN} from 'any-number-to-words';
function App() {
  const converter = new Converter();
  const [localeString, setLocaleString] = useState('en-us');
  const [locale, setLocale] = useState(enUS);
  const [numString, setNumString] = useState('');
  const [words, setWords] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (numString != '') {
      try {
        switch(localeString) {
          case 'en-us':
            setLocale(enUS);
            setWords(converter.toWords(numString, enUS));
            break;
          case 'bn-bd':
            setLocale(bnBD);
            setWords(converter.toWords(numString, bnBD));
            break;
          case 'hi-in':
            setLocale(hiIN);
            setWords(converter.toWords(numString, hiIN));
            break;
        }
        setError('');
      } catch(error) {
        if (error.message == 'Invalid number') {
          setWords('')
          setError('Invalid number');
        } else {
          console.log(error.message);
        }
      }
    }
  }, [localeString])

  const handleLocale = locale => {
    setLocaleString(locale);
  }

  const handleChange = event => {
    const value = event.target.value.trim();
    setNumString(value);

    if (value == '') {
      setWords('');
      return;
    }
    try {
      setWords(converter.toWords(value, locale))
      setError('');
    } catch(error) {
      if (error.message == 'Invalid number') {
        setWords('')
        setError('Invalid number');
      } else {
        console.log(error.message);
      }
    }
  }
  
  return (
    <div className='flex flex-col justify-between max-w-2xl min-h-screen px-3 pt-3 mx-auto bg-white'>
      <div>
        <h1 className='py-3 font-serif text-4xl font-bold text-center text-gray-700 capitalize bg-gray-200'>any number to words</h1>
        <p className='my-3'>This is the live demo the npm package <span className='font-bold'>any-number-to-words</span>. To use it in your own application see the documentation on <a className="font-bold text-pink-600 hover:underline" href="https://github.com/ashutoshbw314/any-number-to-words#readme" target="_blank">Github</a> or <a className="font-bold text-pink-600 hover:underline" href='https://www.npmjs.com/package/any-number-to-words' target='_blank'>npm</a>. Have fun!</p>
        <input placeholder="Enter a number" className={`text-xl ${error ? 'text-red-600' : 'text-gray-700'}`} type="text" onChange={handleChange}/>
        <div className='flex flex-wrap mt-1'>
          <div 
            className={`px-4 py-2 mx-1 my-1 text-white font-bold cursor-pointer rounded-sm ${localeString == 'en-us' ? 'bg-yellow-500' : 'bg-blue-400'}`}
            onClick={() => handleLocale('en-us')}
          >English</div> 
          <div 
            className={`px-4 py-2 mx-1 my-1 text-white font-bold cursor-pointer rounded-sm ${localeString == 'bn-bd' ? 'bg-yellow-500' : 'bg-blue-400'}`}
            onClick={() => handleLocale('bn-bd')}
          >Bengali</div> 
          <div
            className={`px-4 py-2 mx-1 my-1 text-white font-bold cursor-pointer rounded-sm ${localeString == 'hi-in' ? 'bg-yellow-500' : 'bg-blue-400'}`}
            onClick={() => handleLocale('hi-in')}
          >Hindi</div> 
        </div>
        <p className='p-1 text-xl text-gray-700'>
          {words}
        </p>
      </div>
      <footer className='py-2 text-sm text-center'>
        Hand crafted with ❤️ by <a className='text-indigo-700 hover:underline' href="https://ashutoshbiswas.netlify.app/">Ashutosh Biswas</a>
      </footer>
    </div>
  )
}

export default App;
