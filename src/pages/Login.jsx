import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import '../css/login.css';

function Login(props) {

  const apiUrl="https://localhost:44331/api/Usuario";
  const cookies = new Cookies();
  const [form, setForm]= useState({
    user:'',
    password:''
  }
  )
  const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }
  const inicioSesion=async()=> {
    await Axios.get(apiUrl+`/${form.user}/${form.password}/`)
    .then(response=>{
      return response.data;
    }).then(response=>{
      if(response.length>0){
        var respuesta = response[0];
        cookies.set('idUsuarioN', respuesta.idUsuarioN, {path: '/'});
        cookies.set('idTipousuarioN', respuesta.idTipousuarioN, {path: '/'});
        cookies.set('usuNombreV', respuesta.usuNombreV, {path: '/'});
        props.history.push('/menu');

      }else{
        alert('El usuario o la contraseña es incorrecta');
      }
    }).catch(error=>{
      console.log(error);
    })
    }
    useEffect(()=>{
      if(cookies.get('idUsuarioN')){
        props.history.push('/menu');

      }
    },[]);
    return (
        <div className="containerPrincipal">
        <div className="containerLogin">
          
          <div className="form-group">
            <label>Usuario </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="user"
              onChange={handleChange}
            />
            <br />
            <label>Contraseña </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=>inicioSesion()} >Iniciar Sesión</button>
          </div>
        </div>
      </div>
    )
}
export default Login;
