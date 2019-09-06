import React from 'react'
import { useState } from 'react'
import Rest from '../utils/rest'

const baseUrl = 'https://mymoney-99b37.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

const Movimentacoes = ({match}) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMeses = useGet(`meses/${match.params.data}`)
    const [dataPatch, patch] = usePatch()
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, remover] = useDelete()
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const onChangeDescricao = evt => {
      setDescricao(evt.target.value)
    }
    const onChangeValor = evt => {
      setValor(evt.target.value)
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))

    const salvarMovimentacao = async () => {
      if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/)  >= 0){
        await salvar({
          descricao,
          valor: parseFloat(valor)
        })
        setDescricao('')
        setValor(0)
        data.refetch()
        await sleep(2000)
        dataMeses.refetch()
      }
      
    }
    const removerMovimentacao = async(id) => {
      await remover(`movimentacoes/${match.params.data}/${id}`)
      data.refetch()
      await sleep(2000)
      dataMeses.refetch()
      
    }
    const alterarPrevisaoEntrada = (evt) => {
        patch(`meses/${match.params.data}`, {previsao_entrada: evt.target.value})
        console.log(evt.target.value)
        dataMeses.refetch()
    }
    const alterarPrevisaoSaida = (evt) => {
      patch(`meses/${match.params.data}`, {previsao_saida: evt.target.value})
      console.log(evt.target.value)
    }
    return  (
      <div className='container'>
        <h1>Movimentações</h1>
        {
          !dataMeses.loading && <div>
              {dataMeses.data && 
                <span> Previsão de entrada: {dataMeses.data.previsao_entrada} 
                  <input onBlur={alterarPrevisaoEntrada} type='text' /> / 
                  Previsão de saída: {dataMeses.data.previsao_saida} 
                  <input onBlur={alterarPrevisaoSaida} type='text' /> 
                  <br />
                  Entradas: {dataMeses.data.entradas} / 
                  Saidas: {dataMeses.data.saidas}
                </span>
              }
        </div>
        }
        <table className='table'>
          <thead>
            <tr>
              <th> Descricao</th>
              <th className='text-right'>Valor</th>
            </tr>  
          </thead>
          <tbody>
          {
            data.data &&
            Object
              .keys(data.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{data.data[movimentacao].descricao}</td>
                    <td className='text-right'>{
                      data.data[movimentacao].valor} {' '}
                      <button className='btn btn-danger' onClick={() => removerMovimentacao(movimentacao)}>-</button>
                    </td>
                  </tr>
                )
              })
          }
          <tr>
            <td><input type='text' value={descricao} onChange={onChangeDescricao} /></td>
            <td  className='text-right'>
                <input type='text' value={valor} onChange={onChangeValor}/>
                <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    
    )
  }

  export default Movimentacoes