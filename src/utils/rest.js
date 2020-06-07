import {useReducer, useEffect} from 'react'
import axios from 'axios'
//axios não dará exception
axios.defaults.validateStatus = code => code < 500

const INITIAL_STATE = {
    loading: false,
    data: {},
    error: ''
}

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
    if(action.type === 'FAILURE'){
      return {
        ...state,
        loading: false,
        error: action.error
      }  
    }
    return state
  }

const getAuth = () => {
  const token = localStorage.getItem('token')
  if(token){
    return '?auth='+token
  }
  return ''
}

const init = baseUrl => {
    const useGet = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        const carregar = async()  => {
          try{
              dispatch({type: 'REQUEST'})
              const res = await axios.get(baseUrl + resource +'.json' + getAuth())
              //console.log(res.data)
              if(res.data.error && Object.keys(res.data.error).length > 0){
                dispatch({
                  type: 'FAILURE',
                  error: res.data.error
                }) 
              }else{
                dispatch({
                    type: 'SUCCESS',
                    data: res.data
                }) 
              }
          }catch(err){
            dispatch({type: 'FAILURE', error: 'unknown error'})
          }
          
        }
        useEffect(() => {
          carregar()
            
        },[resource])
        return {
          ...data,
          refetch: carregar
        }
    }
    const usePost = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        const post = async(data) => {
            dispatch({type: 'REQUEST'})
            const res = await axios.post(baseUrl + resource +'.json'+getAuth() + getAuth())
            dispatch({type: 'SUCCESS',
                data: res.data
            })            
          }
          return [data, post]
    }
    const useDelete = () => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        const remove = async (resource) => {
            dispatch({type: 'REQUEST'})
            const res = await axios.delete(baseUrl + resource +'.json' + getAuth())
            dispatch({
              type: 'SUCCESS'
          })
          }
          return [data, remove]
    }
    const usePatch = (resource) => {
      const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
      const patch = async (data) => {
          dispatch({type: 'REQUEST'})
          const res = await axios.patch(baseUrl + resource +'.json' + getAuth(), data)
          dispatch({
            type: 'SUCCESS'
        })
        }
        return [data, patch]
  }
    return {
        useGet, 
        usePost,
        useDelete,
        usePatch
    }
}
  export const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const post = async(data) => {
        dispatch({type: 'REQUEST'})
        try {
          const res = await axios.post(resource, data)
          
          if(res.data.error && Object.keys(res.data.error).length > 0){
            dispatch({
              type: 'FAILURE',
              error: res.data.error.message,
              code: res.data.error.code
            }) 
          }
          else{
             dispatch({
                type: 'SUCCESS',
                data: res.data
            }) 
            return res.data 
          }
         
        }catch(err){
          dispatch({
            type: 'FAILURE',
            error: 'unknown error'
          }) 
        }
        
                 
      }
      return [data, post]
}
  export default init