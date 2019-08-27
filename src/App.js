import React from 'react'
import axios from 'axios'
import useGet from './useGet'
import usePost from './usePost';

  const url = "https://mymoney-99b37.firebaseio.com/movimentacoes/2019-08.json"
  
  

function App() {

  const data = useGet(url)
  const data2 = useGet('http://httpbin.org/ip')

  const [postData, post] = usePost(url)

  const saveNew = () => {
      post({valor: 10, descricao: 'ola'})
  }
  
  if(data.loading) {
    return <p>Loading...</p>
  }
  return (
    <div className="App">
        <h1>My Money</h1>
        {JSON.stringify(data.data)}
        {JSON.stringify(data2)}
        <button onClick={saveNew}>Save</button>
        <pre>{JSON.stringify(postData)}</pre>
    </div>
  );
}

export default App

