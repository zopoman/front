import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Container, Modal, modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Header from './layouts/partial/Header';
import MenuNavbar from './layouts/partial/MenuNavbar';
import Footer from './layouts/partial/Footer';


const Usuarios = () => {
      const baseUrl = "https://localhost:44331/api/"
      const [data, setData] = useState([])
      const [dataTipo, setDataTipo] = useState([])
      const [modal, setModal] = useState(false)
      const [user,setUser] = useState({
        idUsuarioN: '',
        idTipousuarioN: '',
        usuCorreoV: '',
        usuNickV: '',
        usuNombreV: '',
        usuPassV: '',
        usuTelefonoV: '',
        usuActivoB: true
      })
      const peticionGetUsuario=async()=>{
        await axios.get(baseUrl+"usuario/")
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      };
      const peticionGetTipo=async()=>{
        await axios.get(baseUrl+"tipoUsuarios/")
        .then(response=>{
          setDataTipo(response.dataTipo);
        }).catch(error=>{
          console.log(error);
        })
      };
      const peticionPostUsuario=async()=>{
        delete user.idUsuarioN;
        user.idTipousuarioN = parseInt(user.idTipousuarioN);
        await axios.post(baseUrl+"usuario/", user)
        .then(response=>{
          setData(data.concat(response.data));
        }).catch(error=>{
          console.log(error);
        })
      };
      const handleChange=e=>{
        const {name, value} = e.target;
        setUser({
          ...user,
          [name]: value
        });
      }
      const abrirModalInsert=()=>{
        setModal(!modal);
      }
      useEffect(()=>{
        peticionGetUsuario();
        peticionGetTipo();

      },[])
    return (
        <div className="wrapper">
            <Header/>
            <MenuNavbar/>
            <div className="content-wrapper">
              <div className="container-fluid">
                <div className="d-flex justify-content-center pt-4 pb-4">
                  <button onClick={()=>abrirModalInsert()} className="btn btn-success">
                    <i className="fas fa-user-plus"></i>
                    <span>Añadir Nuevo Usuario</span>
                  </button>
                </div>
                <div className="card card-primary card-outline table-responsive">
                  <div className="card-header">
                    <h3>Usuarios Registrados</h3>
                  </div>
                  <table id="tablaUsuarios" className="table table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Tipo Usuario</th>
                        <th>Nick</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Acciones</th>
                      </tr>                 
                    </thead>
                    <tbody>
                        {data.map(Usuario=>(
                          <tr key={Usuario.idUsuarioN}>
                              <td>{Usuario.idUsuarioN}</td>
                              <td>{Usuario.usuNombreV}</td>
                              <td value={Usuario.idTipousuarioN}>{Usuario.idTipousuarioNNavigation.tipusuNombreV}</td>
                              <td>{Usuario.usuNickV}</td>
                              <td>{Usuario.usuTelefonoV}</td>
                              <td>{Usuario.usuCorreoV}</td>
                              <td>{Usuario.usuPassV}</td>
                              <td>
                                <button className="btn btn-primary">Editar</button>
                                <button className="btn btn-danger">Eliminar</button>
                              </td>
                          </tr>
                        ))}
                    </tbody>
                  </table> 
                </div>
                
              </div>
                <Modal isOpen={modal}>
                  <ModalHeader>Insertar Nuevo Usuario</ModalHeader>
                  <ModalBody>
                    <div className="form-group">
                      <label>Nombre Completo</label>
                      <br/>
                      <input type="text" className="form-control" name="usuNombreV" onChange={handleChange}/>
                      <br/>
                      <label>Nick Usuario</label>
                      <br/>
                      <input type="text" className="form-control" name="usuNickV" onChange={handleChange}/>
                      <br/>
                      <label>Contraseña</label>
                      <br/>
                      <input type="password" className="form-control" name="usuPassV" onChange={handleChange}/>
                      <br/>
                      <label>Telefono</label>
                      <br/>
                      <input type="number" className="form-control" name="usuTelefonoV" onChange={handleChange}/>
                      <br/>
                      <label>Correo</label>
                      <br/>
                      <input type="e-mail" className="form-control" name="usuCorreoV" onChange={handleChange}/>
                      <br/>
                      <label>Tipo De Usuario</label>
                      <br/>
                      <select class="form-control">
                        {dataTipo.map(TipoUsuarios=>(
                          <option value={TipoUsuarios.idTipousuarioN}>{TipoUsuarios.tipusuNombreV}</option>
                        ))}              
                      </select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>peticionPostUsuario()}>Ingresar</button>
                    <button className="btn btn-danger" onClick={()=>abrirModalInsert()}>Cancelar</button>
                  </ModalFooter>
                </Modal>
                <Modal>
                  <ModalHeader>Editar Usuario</ModalHeader>
                  <ModalBody>
                    <div className="form-group">
                      <label>Nombre Completo</label>
                      <br/>
                      <input type="text" className="form-control" name="usuNombreV" onChange={handleChange}/>
                      <br/>
                      <label>Nick Usuario</label>
                      <br/>
                      <input type="text" className="form-control" name="usuNickV" onChange={handleChange}/>
                      <br/>
                      <label>Contraseña</label>
                      <br/>
                      <input type="password" className="form-control" name="usuPassV" onChange={handleChange}/>
                      <br/>
                      <label>Telefono</label>
                      <br/>
                      <input type="number" className="form-control" name="usuTelefonoV" onChange={handleChange}/>
                      <br/>
                      <label>Correo</label>
                      <br/>
                      <input type="e-mail" className="form-control" name="usuCorreoV" onChange={handleChange}/>
                      <br/>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>peticionPostUsuario()}>Ingresar</button>
                    <button className="btn btn-danger" onClick={()=>abrirModalInsert()}>Cancelar</button>
                  </ModalFooter>
                </Modal>
            </div>
            <Footer/> 

        </div>
        
    );
}

export default Usuarios;
