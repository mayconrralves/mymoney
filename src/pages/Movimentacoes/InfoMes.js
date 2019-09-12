import React from 'react'
import {useMesApi} from '../../api'

const InfoMes = ({data }) => {
    const {infoMes, alterarMes } = useMesApi(data)

    const alterarPrevisaoEntrada = (evt) => {
        alterarMes({previsao_entrada: evt.target.value})
        console.log(evt.target.value)
        infoMes.refetch()
    }
    const alterarPrevisaoSaida = (evt) => {
      alterarMes({previsao_saida: evt.target.value})
    }

    if(infoMes.loading){
        return <p>Carregando Dados</p>
    }
    if(infoMes.data){
        return (
            <div>
                  <span> Previsão de entrada: {infoMes.data.previsao_entrada} 
                    <input onBlur={alterarPrevisaoEntrada} type='text' /> / 
                    Previsão de saída: {infoMes.data.previsao_saida} 
                    <input onBlur={alterarPrevisaoSaida} type='text' /> 
                    <br />
                    Entradas: {infoMes.data.entradas} / 
                    Saidas: {infoMes.data.saidas}
                  </span>
          </div>
        )
    }
    return null
}

export default InfoMes