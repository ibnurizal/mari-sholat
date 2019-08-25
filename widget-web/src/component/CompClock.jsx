import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

class CompClock extends Component {
    render () {
        return(
            <Fragment>
                <h2 className='time-box'>{ this.props.time }</h2>
            </Fragment>
        );
    }
}
const doStateToProps = (state) => {
    return {
        time   : ReactHtmlParser('<div>'+state.DateTime.time.split('.').join('</div><div>')+'</div>'),
    }
}
export default connect(doStateToProps)(CompClock);