import React,{Component} from 'react';

import Suelo from '../Componentes/Suelo';


class ContenedorSuelo extends Component{
    constructor(props){
        super(props);
        this.state = {
            PH:'',
            Profundidad:'',
            Pendiente:'',
            pickerSelection: 'Tipo de suelos',
            pickerDisplayed: false,
            pickerSelection2: 'Color del suelo',
            pickerDisplayed2: false,
            pickerSelection3: 'Textura',
            pickerDisplayed3: false,
        }



    }

    //Funciones para pantalla de suelo

    eventoTxtSuelo =(value) => {
        this.setState({
            TSuelo:value
        })
    }

    eventoTxtColor = (value) => {
        this.setState({
            Color:value
        })
    }

    eventoTxtPH = (value) => {
        this.setState({
            PH:value
        })
    }


    eventoTxtMOrganica = (value) => {
        this.setState({
            MOrganica:value
        })
    }

    eventoTxtTopografia = (value) => {
        this.setState({
            Topografia:value
        })
    }


    eventoTxtTextura = (value) => {
        this.setState({
            Textura:value
        })
    }

    eventoTxtProfundidad = (value) => {
        this.setState({
            Profundidad:value
        });
    }

    eventoTxtPendiente = (value) => {
        this.setState({
            Pendiente:value
        });
    }


    extraerParametros = () => {
        const { navigation } = this.props;
        const Data = {
            TemperaturaC: navigation.getParam('TemperaturaC'),
            PrecipitacionC: navigation.getParam('PrecipitacionC'),
            VelocidadVC: navigation.getParam('VelocidadVC'),
            HumedadC: navigation.getParam('HumedadC'),
            AltitudC: navigation.getParam('AltitudC'),
            NRadiacionC: navigation.getParam('NRadiacionC'),
            NivelaptoC: navigation.getParam('NivelaptoC')
        }
        console.log(Data)
        return {...Data};
    }

    navegarAgua = () => {
        const { pickerSelection, pickerSelection2, pickerSelection3, PH,Pendiente,Profundidad } = this.state;
        const {navigation} = this.props;

        const valoaptoSuelo = this.setValorApto(this.evaluarSuelo());
        const ADatos = {
            ...this.extraerParametros(),
            PHS:PH,
            ProfundidadS:Profundidad,
            PendienteS:Pendiente,
            TexturaS:pickerSelection3,
            ColorS:pickerSelection2,
            TSueloS:pickerSelection,
            SueloApto:valoaptoSuelo
        }
        this.evaluarSuelo();
        if(pickerSelection!='' || pickerSelection2 != '' || pickerSelection3 != '', PH != '' || Pendiente != '' || Profundidad != ''){
            navigation.navigate('Agua',{...ADatos});
        }else{
            alert("¡Oops Parece que olvidas llenar algunos datos!");
        }
        

    } 

    //Funcion para hacer evaluacion del suelo

    evaluarSuelo = () => {
        const { pickerSelection, PH, Profundidad, Pendiente } = this.state;
        var contador = 0;

        if(pickerSelection === 'Franco'){
            contador += 3;
        }else if(pickerSelection === 'Francoarenoso'){
            contador += 2;
        }else if(pickerSelection === 'Francoarcilloso'){
            contador += 1;
        }else{
            contador -=2;
        }

        if(parseFloat(PH) >= 6.5 && parseFloat(PH) <= 7.0){
            contador += 3;
        }else if(parseFloat(PH) >= 6.0 && parseFloat(PH) <= 6.4){
            contador += 2;
        }else if(PH < 6.0){
            contador += 1; 
        }
        
        if(parseInt(Profundidad)>=60){
            contador +=3;
        }else if(parseInt(Profundidad)>40 && parseInt(Profundidad)<60){
            contador += 2;
        }else if(parseInt(Profundidad)>10 && parseInt(Profundidad)<20){
            contador += 1;
        }
      

        if(parseInt(Pendiente)<=15){
            contador += 3;
        }else if(parseInt(Pendiente)>15 && parseInt(Pendiente)<=30){
            contador += 2;
        }else if(parseInt(Pendiente)>30){
            contador += 1;
        }
        //dasddasd
        // if(contador === 12){
        //     alert("Suelo optimo");
        // }else if(contador === 8){
        //     alert("Suelo Bueno");
        // }else if(contador === 4){
        //     alert("Suelo marginal");
        // }
        return contador;
    }

    setValorApto = (contador) =>{
        if(contador >= 9 && contador <= 12){
            return 'Optimo'
        }else if(contador >= 5 && contador <= 8){
            return 'Bueno'
        }else if(contador <= 4){
            return 'Marginal'
       }
    }

    togglePicker = () => {
        this.setState({
            pickerDisplayed: !this.state.pickerDisplayed
        })
    }

    setPickerValue = (newValue) =>{
        this.setState({
            pickerSelection: newValue
        })
        this.togglePicker();
    }

    togglePicker2 = () => {
        this.setState({
            pickerDisplayed2: !this.state.pickerDisplayed2
        })
    }

    setPickerValue2 = (newValue) =>{
        this.setState({
            pickerSelection2: newValue
        })
        this.togglePicker2();
    }

    togglePicker3 = () => {
        this.setState({
            pickerDisplayed3: !this.state.pickerDisplayed3
        })
    }

    setPickerValue3 = (newValue) =>{
        this.setState({
            pickerSelection3: newValue
        })
        this.togglePicker3();
    }

    render(){
        const pickerValues = [
            {
                title: 'Arenoso',
                value: 'Arenoso'
            },
            {
                title: 'Arena Franca',
                value: 'Arena Franca'
            },
            {
                title: 'Franco Limoso',
                value: 'Franco Limoso'
            },
            {
                title: 'Franco',
                value: 'Franco'
            },
            {
                title: 'Franco Arcilloso',
                value: 'Franco Arcilloso'
            },
            {
                title: 'Arcilla Fina',
                value: 'Arcilla Fina'
            },
            {
                title: 'Franco Pesada',
                value: 'Franco Pesada'
            }
        ]
        const pickerValues2 = [
            {
                title: 'Negro',
                value: 'Negro'
            },
            {
                title: 'Rojizo',
                value: 'Rojizo'
            },
            {
                title: 'Amarillento',
                value: 'Amarillento'
            },
        ]
        const pickerValues3 = [
            {
                title: 'Arcilloso',
                value: 'Arcilloso'
            },
            {
                title: 'Limoso',
                value: 'Limoso'
            },
            {
                title: 'Arenoso',
                value: 'Arenoso'
            },
        ]
        const { pickerSelection, pickerDisplayed,  pickerSelection2, pickerDisplayed2, pickerSelection3, pickerDisplayed3, TSuelo, Color, PH, MOrganica, Topografia, Textura, Pendiente, Profundidad } = this.state;
        return(
            <Suelo
                pickerDisplayed={pickerDisplayed}
                pickerValues={pickerValues}
                togglePicker={this.togglePicker}
                setPickerValue={this.setPickerValue}
                pickerSelection={pickerSelection}
                
                pickerDisplayed2={pickerDisplayed2}
                pickerValues2={pickerValues2}
                togglePicker2={this.togglePicker2}
                setPickerValue2={this.setPickerValue2}
                pickerSelection2={pickerSelection2}

                pickerDisplayed3={pickerDisplayed3}
                pickerValues3={pickerValues3}
                togglePicker3={this.togglePicker3}
                setPickerValue3={this.setPickerValue3}
                pickerSelection3={pickerSelection3}

                
                eventoTxtPH={this.eventoTxtPH}
                eventoTxtProfundidad={this.eventoTxtProfundidad}
                eventoTxtPendiente = {this.eventoTxtPendiente}
                suelo={TSuelo} 
                color={Color}
                ph={PH}
                mOrganica={MOrganica}
                topografia={Topografia}
                textura={Textura}
                pendiente={Pendiente}
                profundidad={Profundidad}
                eventoIrAgua={this.navegarAgua}
            />
        );
    }
}

export default ContenedorSuelo;