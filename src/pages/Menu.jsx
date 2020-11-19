import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layouts/partial/Header';
import MenuNavbar from './layouts/partial/MenuNavbar';
import Footer from './layouts/partial/Footer';

export default function Menu(props) {

    const cookies = new Cookies();
    const cerrarSesion=()=>{
        cookies.remove('idUsuarioN', {path: '/'});
        cookies.remove('idTipousuarioN', {path: '/'});
        cookies.remove('usuNombreV', {path: '/'});
        props.history.push('./');
    }
    useEffect(()=>{
        if(!cookies.get('idUsuarioN')){
            props.history.push('./');
        }
          },[]);
    return (
        <div className="wrapper">
        <Header/>
        <MenuNavbar/>
        <div className="content-wrapper">
            <div className="container">
                <h5>Bienvenido {cookies.get('usuNombreV')}</h5>
                <button className="btn btn-danger" onClick={()=>cerrarSesion()} >Cerrar Sesión</button>
            </div>

        </div>
            
        <Footer/>
        </div>
    )
}


