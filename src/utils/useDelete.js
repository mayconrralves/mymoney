import axios from 'axios'
import {useReducer} from 'react'

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

const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, {
        loading: false,
        data: {}
      })
    const remove = url => {
        dispatch({type: 'REQUEST'})
        axios
          .delete(url, data)
          .then(res => {
              dispatch({type: 'SUCCESS',
                 data: res.data
              })
          })
      }
      return [data, remove]
}

export default useDelete