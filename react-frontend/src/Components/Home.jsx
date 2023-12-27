import { useState, useEffect } from 'react'
import axios from 'axios'


function HelloWorld() {
    const [text, setText] = useState();

    const handleHelloWorld = async (e) => {
        try {
          const response = await axios.get('http://localhost:8000/api/hello-world');
            setText(response.data.test);
        } catch (error) {
          console.error('HelloWorld failed:', error);
        }
      };

    useEffect(() => {
        handleHelloWorld();
    })
  return (
    <>    
    {text}
    </>
  )
}

export default HelloWorld
