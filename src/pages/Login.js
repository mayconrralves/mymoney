import React, {useEffect,useState} from 'react'
import { usePost }from '../utils/rest'
import {Redirect} from 'react-router-dom'
/*Para adicionar um novo usuário para sua aplicação no firebase
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[sua_key]&fbclid=IwAR2GAVulG-e2f5A51IT30zDM2-9ib-_JtS0JYTzyhjjBJSSFd9heIwkhIpY
//Para efetuar o login do usuário
https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[sua_key]&fbclid=IwAR2tdHKZe4NTh1ddj8HKnMfIScPBecU4dbpTRhLaYF2HSoK5QTd6AK6HyWc
*/
const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVAGu96uxj-HlSL7Z7yHbCsSF4pKTQ45I&fbclid=IwAR2tdHKZe4NTh1ddj8HKnMfIScPBecU4dbpTRhLaYF2HSoK5QTd6AK6HyWc'



const Login = () => {
    const [postData, signin] = usePost(url)
    const [logado, setLogado] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    useEffect(() => {
        if(Object.keys(postData.data).length > 0){
           localStorage.setItem('token',postData.data.idToken)
           window.location.reload()

        }
    }, [postData])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        }
    })
    const login = async() => {
        //const token = poderia pegar se fossse fazer de uma forma imperativa
        await signin({
            email,
            password: senha,
            returnSecureToken: true
        })
    }
    const onChangeEmail = evt => {
        setEmail(evt.target.value)
    }
    const onChangeSenha = evt =>{
        setSenha(evt.target.value)
    }
    if(logado){
        return <Redirect to='/' />
    }
    return (
        <div>
            <h1>Login</h1>
            {
                postData.error && postData.error.length > 0 &&
                <p>E-mail e/ou Senha errados</p>
            }
            <input type='text' value={email} onChange={onChangeEmail} placeholder='Seu Email' />
            <input type='password' value={senha} onChange={onChangeSenha} placeholder='Sua Senha' />
            <button onClick={login}>Login</button>
        </div>
        
    )
}



export default Login