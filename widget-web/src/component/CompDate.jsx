import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {ActionType} from "../redux/ActionTypes";

class CompDate extends Component {
    constructor(props){
        super(props);

        setInterval(()=>{
            this.props.handleReloadDateTime();
        }, 1000);
    }
    render () {
        return(
            <Fragment>
                <p className="date-indo">{this.props.date}</p>
                <p className="date-hijriah">{this.props.dateHijriah}</p>
            </Fragment>
        );
    }
}
const doStateToProps = (state) => {
    return {
        date : state.DateTime.date,
        dateHijriah : state.DateTime.dateHijriah,
    }
}
const doDispatchToProps = (dispatch) =>  {
    return {
        handleReloadDateTime: () => dispatch({ type: ActionType.RELOAD_DATE_TIME })
    }
}

export default connect(doStateToProps, doDispatchToProps)(CompDate);