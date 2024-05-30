import { useState, useRef } from 'react';
import './App.css'
import { useFetch } from './useFetch'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function App() {
  const url = "https://api.fake-rest.refine.dev/users"
  const {data,refetch} = useFetch(url)
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [firstName, setfirstName] = useState('');
  const [LastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [op, setOp] = useState(1);
  const closeModalRef = useRef(null); 



// Aqui Se Abre el modal dependiendo el Boton 
  const openModal = (op, id, firstName, LastName, email) => {
    setId('');
    setfirstName('');
    setlastName('');
    setemail('');
    setOp(op);

    if (op === 1) {
      setTitle('Registrar Usuario')
    }
    else if (op === 2) {
      setTitle('Editar Usuario');
      setId(id);
      setfirstName(firstName);
      setlastName(LastName);
      setemail(email);
    }
  }
   const validar = ()=>{
     if(firstName.trim()===''){
        alert('Escriba Su Nombre');
     }
     else if (LastName.trim()===''){
        alert('Escriba Su Apellido');
     }
     else if (email.trim()===''){
         alert('Escriba El Email');
     }
     else{
         agregar();
     }
   }

 // En esta Funcion Se agregan Usuarios y Editarlos
  const agregar = () => {
    
    if (op === 1) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: LastName,
          email: email,
          status: true
        })
      })
      .then(response =>{
        if(!response.ok){
           throw new Error('Error al Agregar usuario');
        }
        return response.json
      } )
       .then(data => {
        alert('usuario Agregado Exitosamente')
        refetch();
        closeModalRef.current.click(); 
       })

    } else if (op === 2) {
      fetch(url + '/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: LastName,
          email: email,
          status: true

        })
      })
        .then(response =>{
          if(!response.ok){
             throw new Error('Error al Actualizar usuario');
          }
          return response.json
        } )
         .then(data => {
          alert('usuario Actualizado Exitosamente')
          refetch();
          closeModalRef.current.click(); 
         })
         

    }


  }
  //Esta Funcion es para Borrar los Usuarios Por la id
  const eliminarUsuario = (id) => {
    const confirmarEliminacion = window.confirm('Estas Seguro de Eliminar Este Usuario?');
    if (confirmarEliminacion) {
      fetch('https://api.fake-rest.refine.dev/users/'+id, {
        method: 'DELETE'
      })
      .then(response =>{
        if(!response.ok){
           throw new Error('Error al Eliminar usuario');
        }
        return response.json
      } )
       .then(data => {
        alert('usuario Eliminado Exitosamente')
        refetch();

       })
    }
   
  }


return (
  <div className=' text-bg-dark p-3'>
    <div className='contairner-fluid'>
      <div className='row mt-3'>
        <div className='col-md-4 offset-4'>
          <div className='d-grid mx-auto'>
            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUser'>
              <i className='fa-solid fa-circle-plus'></i> Agregar
            </button>
          </div>
        </div>

      </div>
    </div>
    <table className='table table-bordered '>
      <thead >
        <tr><th cl>Nombre</th><th>LastName</th><th>Email</th> <th>Editar</th></tr>
      </thead>
   
      <tbody className='table-group '>
        {data?.filter(user => user.status === true).map((user, id) => (
          <tr key={user.id}>
            <td >{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>
              <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUser' onClick={() => openModal(2, user.id, user.firstName, user.lastName, user.email)}>
                <i className='fa-solid fa-edit'></i>
              </button>

              <button onClick={() => eliminarUsuario(user.id)} className='btn btn-danger'>
                <i className='fa-solid fa-trash'></i>
              </button>
            </td>


          </tr>

        ))
        }
      </tbody>


    </table>

    <div id='modalUser' class="modal text-dark" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef}></button>
          </div>
          <div class="modal-body">
            <input type='hidden' id='id'></input>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa solid fa-user' ></i></span>
              <input type="text" id='firstName' className='form-control' placeholder='Nombres' value={firstName} onChange={(e) => setfirstName(e.target.value)} />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa solid fa-message' ></i></span>
              <input type="text" id='lastName' className='form-control' placeholder='Apellidos' value={LastName} onChange={(e) => setlastName(e.target.value)} />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa solid fa-envelope' ></i></span>
              <input type="text" id='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} />
            </div>
          </div>



          <div class="modal-footer">
            <button id='BotonCerrar' type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button onClick={(() => validar())} type="button" class="btn btn-success">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>


)

}

export default App
