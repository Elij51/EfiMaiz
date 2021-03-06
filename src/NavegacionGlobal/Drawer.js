import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import StackPerfil from '../Perfil/stackPerfil';
import ContenedorInicio from '../Inicio//Contenedores/ContenedorInicio';
import StackOpciones from '../Opciones/CaracterizacionSitio/StackOpciones/StackOpciones.js'
import StackGuias from '../Opciones/GuiasInformativas/StackGuias/StackGuias';
import StackMagronomico from '../Opciones/ManejoAgronomico/StackMagronomico/StackMagronomico';
import EstadisticasPro from '../Opciones/Estadisticas/ContenedorEstadisticas';
import StackEP from '../Opciones/EconomiaProduccion/StackEconomiaProduccion/StackEP';
import Publicidad from '../Publicidad/Publicidad.js';
const Drawer = createDrawerNavigator({
    Inicio:{
        screen: ContenedorInicio,
        navigationOptions:{
            drawerLabel:'Inicio'
        }
    },
    Caracterizacion:{
        screen: StackOpciones,
        navigationOptions:{
            drawerLabel:'Caracterización del Sitio'
        }
    },
    GuiasInformativas:{
        screen: StackGuias,
        navigationOptions:{
            drawerLabel:'Gúias informativas'
        }
    },
    ManejoAgronomico:{
        screen: StackMagronomico,
        navigationOptions:{
            drawerLabel:'Manejo Agronómico'
        }
    },
    Perfil:{
        screen: StackPerfil,
        navigationOptions:{
            drawerLabel:'Perfil de Usuario'
        }
    },
    EcoPro:{
        screen: StackEP,
        navigationOptions:{
            drawerLabel:'Economía y producción'
        }
    },
    Estadisticas:{
        screen: EstadisticasPro,
        navigationOptions:{
            drawerLabel:'Estadísticas de producción'
        }
    },
    Publicidad:{
        screen: Publicidad,
        navigationOptions:{
            drawerLabel:'Agroquímicos'
        }
    }
}
);




export default createAppContainer(Drawer);