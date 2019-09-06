import React from 'react'
import Rest from '../../utils/rest'
import {Link} from 'react-router-dom'

const baseUrl = 'https://mymoney-99b37.firebaseio.com/'
const {useGet, usePost, useDelete} = Rest(baseUrl)

const Meses = () => {
    const data =  useGet('meses')
    if(data.loading){
        return <span>Carregando ...</span>
      }

      if(data.data){
        return (
            <table className='table'>
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Previsão Entrada</th>
                  <th>Entrada</th>
                  <th>Previsão Saida</th>
                  <th>Saida</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object
                    .keys(data.data)
                    .map(mes => {
                      return (
                        <tr key={mes}>
                        <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link> </td>
                        <td>{data.data[mes].previsao_entrada}</td>
                        <td>{data.data[mes].entradas}</td>
                        <td>{data.data[mes].previsao_saida}</td>
                        <td>{data.data[mes].saidas}</td>
                        
                      </tr>
                      )
                    })
                } 
              </tbody>
              
            </table>
          )
    }
       
}

export default Meses
