import {useEffect, useReducer} from 'react'
import axios from 'axios'
const reducer = (state, action) => {
    //manipular meu estado
    if(action.type === 'REQUEST'){
      return {
        ...state,
        loading: true
      }
    }
    if(action.type === 'SUCCESS'){
      return {
        ...state,
        loading: false,
        data: action.data
      }  
    }
    return state
  }
const useGet = url => {
    const [data, dispatch] = useReducer(reducer, {
      loading: true,
      data: {}
    })
    //const [loading, setLoading] = useState(true)
    //const [data, setData] = useState({})
    useEffect(() => {
      dispatch({type: 'REQUEST'})
      axios
        .get(url)
        .then(res => {
          dispatch({type: 'SUCCESS', data: res.data})
        })
    },[])
    return data
  }

  export default useGet