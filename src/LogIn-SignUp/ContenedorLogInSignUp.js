import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { AsyncStorage, Alert} from 'react-native';

import LogIn from '../LogIn/Componentes/LogIn.js';
import SignUp from '../SignUp/Componentes/SignUp.js';

export default class ContenedorlogInSignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      vistualActual: 'LogIn',
      pickerSelection: 'Ocupación',
      pickerDisplayed: false,
      Departamento: '', //Datos solo para el productor
      NombreFinca:'', //Datos solo para el productor
      Coordenadasx: '', //Datos solo para el productor
      Coordenadasy:'', //Datos solo para el productor
      email: '',
      clave:'',
      nombre:'',
      apellido:'',
      telefono:'',
      usuario:'',
      clave2:''
    }
  }

  //Método para registro de usurios con su correo y contraseña
  SignUpMethod = () => {
    const { email,clave,clave2,nombre,apellido,telefono,usuario, pickerSelection } = this.state;

    if ( pickerSelection === 'Productor' ) {

      if(email != '' && clave != '' && clave2 != '' && nombre != '' && apellido != '' && telefono !='' && usuario!='' ){
        if(clave === clave2 ){
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.clave)
          .then((success) => (
            this.saveDataMethodProductor(),
            this.cambiarPantalla(),
            console.log('El resgistro realizado correctamente: ', success)
            )).catch((error) => {
            // Oteniendo los errores para su respectivo manejo
            var errorCode = error.code;
            console.log(errorCode)
            if (errorCode === 'auth/email-already-in-use') {
              this.mensaje2();
            }
          })
        }else{
          Alert.alert('Advertencia','Las contraseñas no coinciden.');
        }
    }else{
      Alert.alert('Advertencia','Ops, Parece que haz olvidado algunos datos');
    }
  }else{
        if(email != '' && clave != '' && clave2 != '' && nombre != '' && apellido != '' && telefono !='' && usuario!='' ){
          if(clave === clave2 ){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.clave)
            .then((success) => (
              this.saveDataMethodStuTea(),
              this.cambiarPantalla(),
              console.log('El resgistro realizado correctamente: ', success)
              )).catch((error) => {
              // Oteniendo los errores para su respectivo manejo
              var errorCode = error.code;
              console.log(errorCode)
              if (errorCode === 'auth/email-already-in-use') {
                this.mensaje2();
              }
            })
          }else{
            Alert.alert('Advertencia','Las contraseñas no coinciden.');
          }
      }else{
        Alert.alert('Advertencia','Ops, Parece que haz olvidado algunos datos');
      }
    }
  }
    mensaje2 = () => {
      Alert.alert('Advertencia', 'El usuario ya existe, porfavor resgistre otro.');
    }

    //Método para iniciar sesión con su correo y contraseña
    LogInMethod = () => {
      const {email, clave} = this.state;

       if(email != '' && clave != ''){
         firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.clave)
         .then(success => (
          this.GuardarEmail(),
          this.setState({
               email:'',
               clave:''
          }),
          this.cambiaraDrawer(),
          console.log('Logueo realizado correctamente: ', success)))
           .catch( error => { 
             const errorCode = error.code;

              if(errorCode === 'auth/user-not-found'){
                Alert.alert("Advertencia","El usuario ingresado no existe");
              }
              if(errorCode === 'auth/wrong-password'){
                Alert.alert("Adverencia","El usuario o contraseña son inválidos");
              }
           })
       }else{
        this.mensaje();
      }
    }

  mensaje = () => {
    Alert.alert('Advertencia', 'Por favor ingrese un usuario y contraseña valido')
  }

  //Método para guardar el email que funciona como id de usuarios, guardarlos en el AsyncStorage y obtenerlos en el perfil
  GuardarEmail  = async  () => {
    const { email } = this.state;
    const EmailConvertido  = JSON.stringify(email);
    await AsyncStorage.setItem('DATO',EmailConvertido);
  }

  //Método para obtener el email del usuario para la extracción de los datos
  ObtenerEmail = async () => {
    const emailAsycn = await AsyncStorage.getItem('DATO');
    return emailAsycn;
  }

  //Metodo para guardar datos en firestore si el usuario es un estudiante o un docente
  saveDataMethodStuTea = () =>{
    var db = firebase.firestore();
    db.collection("users").doc(this.state.email).set({
      fNombre: this.state.nombre,
      fApellido: this.state.apellido,
      fTelefono: this.state.telefono,
      fCorreoE: this.state.email,
      fOcupacion: this.state.pickerSelection,
      fUsuario: this.state.usuario,
    }).then((docRef) => {
      Alert.alert('Mensaje','Los datos del usuario han sido registrados');
      console.log("Los datos han sido resgitrados")
      this.setState({
        email:'',
        clave:'',
        clave2:'',
        nombre:'',
        apellido:'',
        telefono:'',
        usuario:'',
        pickerSelection:''
      })
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  //Método para guardar los datos, si el usuario es un productor.
  saveDataMethodProductor = () =>{
    var db = firebase.firestore();
    db.collection("users").doc(this.state.email).set({
      fNombre: this.state.nombre,
      fApellido: this.state.apellido,
      fTelefono: this.state.telefono,
      fCorreoE: this.state.email,
      fOcupacion: this.state.pickerSelection,
      fUsuario: this.state.usuario,
      FDepartamento: this.state.Departamento,
      FNombreFinca:this.state.NombreFinca,
      FCoordenadasx: this.state.Coordenadasx,
      FCoordenadasy:this.state.Coordenadasy,
    }).then(() => {
      Alert.alert('Mensaje','Los datos del usuario han sido registrados');
      console.log("Los datos del productor han sido resgitrados")
      this.setState({
        email:'',
        clave:'',
        clave2:'',
        nombre:'',
        apellido:'',
        telefono:'',
        usuario:'',
        Departamento: '',
        NombreFinca:'',
        Coordenadasx: '',
        Coordenadasy:'',
      })
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  //obteniendo datos desde firebase
  getDataFirebase = () => {

    var db = firebase.firestore();
    var docRef = db.collection('users').doc(this.state.email);

    docRef.get().then (function (doc) {

      if (doc.exists) {
        console.log("Datos del documento: ", doc.data().fCorreoE);
                  
      }else {
        console.log("No se encontró ningún documento");
      }
      
    }).catch (function(error) {

      console.log('Ha surgido el siguiente error: ', error)
      
    })

  }

    //Manejando el cambio de estado para las coordenadas y del usuario
    handleCoordenadasy = (CY) =>{
    this.setState({
      Coordenadasy: CY
    })
  } 

  //Manejando el cambio de estado para las coordenads x del usuario
  handleCoordenadasX = (CX) =>{
    this.setState({
      Coordenadasx: CX
    })
  }
  
  //Manejando el cambio de estado para el nombre de la finca del usuario
  handleNombreFinca = (NF) =>{
  this.setState({
    NombreFinca: NF
  })
}

  //Manejando el cambio de estado para el departamento del usuario
  handleDepartamento = (Depart) =>{
  this.setState({
    Departamento: Depart
  })
}

  //Manejando el cambio de estado para el nombre del usuario
  handleNombre = (nombreU) =>{
    this.setState({
      nombre:nombreU
    })
  }

  //Manejando el cambio de estado para el apellido del usuario
  handleApellido = (apellidoU) =>{
    this.setState({
      apellido:apellidoU
    })
  }

    //Manejando el cambio de estado para el teléfono del usuario
  handleTelefono = (telefonoU) => {
    this.setState({
      telefono:telefonoU
    })
  }

  //Manejando el cambio de estado para el correo del usuario
  handleEmail= (emailCU) =>{
    this.setState({
      email:emailCU
  });
  }

  //Manejando el cambio de estado para la contraseña del usuario
  handlePass = (claveCU) =>{
    this.setState({
      clave:claveCU
  });
  }

  handlePass2 = (claveCU) =>{
    this.setState({
      clave2:claveCU
  });
  }

  //Manejando el cambio de estado para la contraseña del usuario
  handleUsuario = (usuarioCU) =>{
    this.setState({
      usuario:usuarioCU
  });
  }

  //Esta función modifica el el valor del estado del elemento seleccionado
  //Y tambien cierra el modal al llamar la función togglePicker
  setPickerValue = (newValue) =>{
    this.setState({
      pickerSelection: newValue
    })
    this.togglePicker();
  }

  cambiarPantalla = () =>{
   const { vistualActual } = this.state;

    (vistualActual==='LogIn')?
    this.setState({
      vistualActual:'SignUp',
    }) :
    this.setState({
      vistualActual:'LogIn'
    });
  }

  cambiaraDrawer = () => {
      const { navigation } = this.props;

      navigation.navigate('inicio',{email:this.state.email});
  }

  //Esta función cambia el estado del modal
  //No borrar, lo estoy usuando para redireccionar al inicio luego del loggueo y del registro
  togglePicker = () => {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }

  render(){
    const {vistualActual, pickerDisplayed, pickerSelection} = this.state;
    const {email, clave, clave2, nombre, apellido, telefono, usuario, Departamento, 
    NombreFinca, Coordenadasx, Coordenadasy} = this.state;
    
    //Valores que se cargan en el modal
    const pickerValues = [
      {
        title: 'Estudiante',
        value: 'Estudiante'
      },
      {
        title: 'Docente',
        value: 'Docente'
      },
      {
        title: 'Productor',
        value: 'Productor'
      },
      {
        title: 'Técnico',
        value: 'Técnico'
      },
    ]

    switch (vistualActual) {
      case 'LogIn':
          return(
          <LogIn 
          cambiarPantallas={this.cambiarPantalla}
          irdrawer={this.cambiaraDrawer} //No quitar esto por favor, si quiere hacerlo, preguntar antes
          LogInMethod = {this.LogInMethod}
          handleEmail = {this.handleEmail}
          estadoEmail = {email}
          handlePass = {this.handlePass}
          estadoClave = {clave}
          />
          );
        break;
      
      case 'SignUp':
            return(
              <SignUp 
              pickerDisplayed={pickerDisplayed}
              pickerValues={pickerValues} //Valores que necesito para el registro de la ocupación del usuario
              togglePicker={this.togglePicker}
              setPickerValue={this.setPickerValue}
              pickerSelection={pickerSelection}
              SignUpMethod = {this.SignUpMethod}
              handleEmail = {this.handleEmail}
              estadoEmail = {email}
              handlePass = {this.handlePass}
              estadoClave = {clave}
              handleNombre = {this.handleNombre}
              estadoNombre = {nombre}
              handleApellido = {this.handleApellido}
              estadoApellido = {apellido}
              handleTelefono = {this.handleTelefono}
              estadoTelefono = {telefono}
              handleUsuario = {this.handleUsuario}
              estadoUsuario = {usuario}
              handlePass2 = {this.handlePass2}
              estadoClave2 = {clave2}
              handleCoordenadax = {this.handleCoordenadasX}
              Coordenadasx = {Coordenadasx}
              handleCoordenadasy = {this.handleCoordenadasy}
              Coordenadasy = {Coordenadasy}
              handleDepartamento = {this.handleDepartamento}
              Departamento = {Departamento}
              handleNombreFinca = {this.handleNombreFinca}
              NombreFinca = {NombreFinca}
              saveDataMethod = {this.saveDataMethod}
              cambiarPantalla = {this.cambiarPantalla}
              />
            );
          break;
      default:
        break;
    }
  }
}