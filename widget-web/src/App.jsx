import React, {Component, Fragment} from 'react';
import Header from './component/Header';
import CompJadwalSholat from './component/CompJadwalSholat';
import 'semantic-ui-css/semantic.min.css';
import './css/public.css';

class App extends Component {
    render () {
        return(
            <Fragment>
                <Header/>
                <CompJadwalSholat/>
            </Fragment>
        )
    }
}

export default App;