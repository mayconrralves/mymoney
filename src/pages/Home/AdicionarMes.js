import React, { useState, useRef } from 'react'
import { Redirect} from 'react-router-dom'
const minAno = 2019
const maxAno = 2022

 const AdicionarMes = () => {
    const anos = []
    const meses = []
    const refAno = useRef()
    const refMes = useRef()
    const [redir, setRedir] = useState('')
    for(let i=minAno; i <=maxAno; i++){
        anos.push(i)
    }
    for(let i=1; i <=12; i++){
        meses.push(i)
    }
    const zeroPad = num => {
        if(num < 10){
            return '0'+num
        }
        return num
    }
    const verMes = () => {
     setRedir(refAno.current.value + '-' + refMes.current.value)
    }
    if(redir !==''){
        return <Redirect to={'/movimentacoes/'+ redir} />
    }
     return (
         //fragment
         <div className='input-group mb-3'>
             <h4>Adicionar Mês: </h4>
            <select ref={refAno} className='custom-select'>
                {anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
            </select>
            <select ref={refMes} className='custom-select'>
                {meses.map(zeroPad).map( mes => <option key={mes} value={mes}>{mes}</option>)}
            </select>
            <div className='input-group-append'>
                 <button onClick={verMes} className='btn btn-success'>Adicionar mês</button>
            </div>
           
        </div>
     )
 }
 export default AdicionarMes