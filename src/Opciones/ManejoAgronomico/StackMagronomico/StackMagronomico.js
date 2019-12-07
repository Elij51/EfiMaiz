import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import  ContenedorGerminacion  from '../Contenedores/Germinacion/ContenedorGerminacion';
import GerminacionInstrucciones from '../Componentes/Germinacion/GerminacionInstrucciones';
import ContenedorFertilizante from '../Componentes/Fertilizante/Fertilizante';

import ContenedorManejoAgronomico from '../Contenedores/ContenedorManejoAgro';

const StackManejoAgronomico = createStackNavigator({
    ManejoAgronomico:{
        screen:ContenedorManejoAgronomico,
        navigationOptions:{
            header:null
        }
    },
    Germinacion:{
        screen:ContenedorGerminacion,
        navigationOptions:{
            header:null
        }
    },
    GerminacionInstru:{
        screen:GerminacionInstrucciones,
        navigationOptions:{
            header:null
        }
    },
    Fertilizante:{
        screen:ContenedorFertilizante,
        navigationOptions:{
            header:null
        }
    }
});

export default createAppContainer(StackManejoAgronomico);