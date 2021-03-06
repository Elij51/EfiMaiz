import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
  Picker,
  Modal,
  Alert
} from 'react-native';

var pickerSelectionValue;
var PhandleCoordenadax, PCoordenadasx, PhandleCoordenadasy, PCoordenadasy, 
PhandleDepartamento, PDepartamento, PhandleNombreFinca, PNombreFinca;
const SignUp = (props) => {

    const { pickerDisplayed, pickerValues,setPickerValue,togglePicker,pickerSelection,
            SignUpMethod, handlePass,handlePass2, handleEmail, estadoEmail, estadoClave, estadoClave2,saveDataMethod,
            handleNombre, estadoNombre, handleApellido, estadoApellido, handleTelefono, estadoTelefono,
            handleUsuario, estadoUsuario, cambiarPantalla, 
            handleCoordenadax, Coordenadasx, handleCoordenadasy, Coordenadasy, 
            handleDepartamento, Departamento, handleNombreFinca, NombreFinca, } = props;

    pickerSelectionValue = pickerSelection;
    PhandleCoordenadax = handleCoordenadax;
    PCoordenadasx = Coordenadasx;
    PhandleCoordenadasy = handleCoordenadasy; 
    PCoordenadasy = Coordenadasy;
    PhandleDepartamento = handleDepartamento;
    PDepartamento = Departamento;
    PhandleNombreFinca = handleNombreFinca;
    PNombreFinca = NombreFinca;
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor='rgb(70, 160, 90)'/>
        <ImageBackground source={require('../../assets/fondo3.jpg')} style={styles.image}>
          <View style={styles.center}>
            <View style={styles.body}>
              <ScrollView>
                <View>
                  <View style={styles.center}>
                    <Image style={styles.logo} source={require('../../assets/logo.png')}/>
                  </View>
                  <View >
                    <Text style={styles.title}>Registro</Text>
                    <Text style={styles.text}>Ingrese sus datos para registrarse.</Text>
                    <Text style={styles.textSubTitle}></Text>
                  </View>
                  <View style={styles.center}>
                    <TextInput
                      keyboardType={"default"}
                      placeholderTextColor="white"
                      autoCapitalize={'words'}
                      style={styles.textInput}
                      placeholder='Nombre'
                      onChangeText={handleNombre}
                      value={estadoNombre}
                    />

                    <TextInput
                      keyboardType={"default"}
                      placeholderTextColor="white"
                      autoCapitalize={'words'}
                      style={styles.textInput}
                      placeholder='Apellido'
                      onChangeText = {handleApellido}
                      value = {estadoApellido}
                    />

                    <TextInput
                      keyboardType={"numeric"}
                      placeholderTextColor="white"
                      style={styles.textInput}
                      placeholder='Teléfono'
                      onChangeText = {handleTelefono}
                      value = {estadoTelefono}
                    />

                    <TextInput
                      keyboardType={"default"}
                      placeholderTextColor="white"
                      style={styles.textInput}
                      placeholder='Correo'
                      onChangeText = {handleEmail}
                      value = {estadoEmail}
                    />

                    <View style={styles.button2}>
                      <TouchableHighlight onPress={togglePicker} style={[styles.buttonContainer2, styles.ocupationButton]}>
                        <Text style={styles.buttonText}>{pickerSelection}</Text>
                      </TouchableHighlight>
                    </View>
                    <Modal visible={pickerDisplayed} animationType={"slide"} transparent={true}>
                      <View style={styles.modal}>
                        <Text style={styles.textOpacity}>Elija una ocupación</Text>
                        { pickerValues.map((value, index) => {
                          return <TouchableHighlight key={index} onPress={() => setPickerValue(value.value)} style={styles.itemText}>
                                    <Text>{ value.title }</Text>
                                 </TouchableHighlight>
                        })}
                        <TouchableHighlight onPress={togglePicker} style={styles.buttonCancel}>
                          <Text style={styles.textOpacity}>Cancelar</Text>
                        </TouchableHighlight>
                      </View>
                    </Modal>
                    {
                      elementosOcultos()
                    }
                    <TextInput 
                      keyboardType={"default"}
                      placeholderTextColor="white"  
                      style={styles.textInput}
                      placeholder='Usuario'
                      onChangeText = {handleUsuario}
                      value = {estadoUsuario}
                    />
                    
                    <TextInput
                      keyboardType={"default"}
                      placeholderTextColor="white"
                      secureTextEntry={true}
                      style={styles.textInput}
                      placeholder='Contraseña'
                      onChangeText = {handlePass}
                      value = {estadoClave}
                    />

                    <TextInput
                    onChangeText={handlePass2}
                    value={estadoClave2}
                    keyboardType={"default"}
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder='Confirmar Contraseña'
                    />
                  </View>
                </View>
                <View style={styles.button}>
                  <TouchableHighlight style={[styles.buttonContainer, styles.signUpButton]} onPress = {SignUpMethod}  >
                    <Text style={styles.buttonText}>Registrarse</Text>
                  </TouchableHighlight>
                </View>
                <Text style={styles.textContainer}><Text onPress={cambiarPantalla} style={styles.text2}>Regresar a LogIn</Text></Text>
              </ScrollView>
              
            </View>
          </View>
        </ImageBackground>
      </>
    );
};

const elementosOcultos = () => {
  if(pickerSelectionValue === 'Productor'){
    return(
      <>
      <TextInput onChangeText = {PhandleDepartamento} value = {PDepartamento} keyboardType={"default"} placeholderTextColor="white" autoCapitalize={'words'} style={styles.textInput} placeholder='Departamento'></TextInput>
      <TextInput onChangeText = {PhandleNombreFinca} value ={PNombreFinca} keyboardType={"default"} placeholderTextColor="white" autoCapitalize={'words'} style={styles.textInput} placeholder='Nombre de la Finca'></TextInput>
      <TextInput onChangeText = {PhandleCoordenadax} value = {PCoordenadasx} keyboardType={"numeric"} placeholderTextColor="white" autoCapitalize={'words'} style={styles.textInput} placeholder='Coordenada X'></TextInput> 
      <TextInput onChangeText = {PhandleCoordenadasy} value = {PCoordenadasy} keyboardType={"numeric"} placeholderTextColor="white" autoCapitalize={'words'} style={styles.textInput} placeholder='Coordenada Y'></TextInput> 
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    borderRadius:20,
  },
  buttonContainer2: {
    height:50,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    width:300,
    borderRadius:10,
  },
  signUpButton: {
    backgroundColor: 'rgba(70, 160, 90, .9)',
  },
  ocupationButton: {
    backgroundColor: 'rgba(255, 255, 255, .3)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    marginTop: 30,
    color: 'white',
    width: 300,
    textAlign: 'left'
  },
  selectInput: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    fontSize: 16,
    paddingLeft: 10,
    marginTop: 30,
    color: '#bbb',
    width: 300,
  },
  text: {
    fontSize: 16, 
    color: '#eee',
    textAlign: 'center',
  },
  textOpacity: {
    color: '#999' 
  },
  itemText: { 
    paddingTop: 4,
    paddingBottom: 4 
  },
  textContainer: {
    fontSize: 12, 
    color: '#eee',
    textAlign: 'center',
  },
  textSubTitle: {
    fontSize: 16, 
    textAlign: 'justify', 
    color: 'rgba(255, 255, 255, .4)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancel: {
    paddingTop: 4, 
    paddingBottom: 4 
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  },
  body: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
    width: '100%',
    height: '100%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 125,
    marginTop: 50
  },
  modal: {
    margin: 20, padding: 20,
    backgroundColor: '#efefef',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute'
  },
  text2: {
    fontSize: 12, 
    color: '#9ed4a3',
    textAlign: 'center',
  },
  textContainer: {
    fontSize: 12, 
    color: '#eee',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  }
});

export default SignUp;


