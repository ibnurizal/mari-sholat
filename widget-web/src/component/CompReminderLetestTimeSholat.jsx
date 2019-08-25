import React, {Component} from 'react';
import { connect } from 'react-redux';
import { MappingJadwal } from '../helper/Formater';
import Moment from 'moment-hijri';
import { extendMoment } from 'moment-range';
import {ActionType} from "../redux/ActionTypes";
import ReactHtmlParser from "react-html-parser";
import {Api} from "../Model";

const moment = extendMoment(Moment);

let loadingEllipsis = "<div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div><br>Loading...";

class CompReminderLetestTimeSholat extends Component {
    constructor(props){
        super(props);

        setInterval(()=> this.setToDispatchActiveSholat(), 1000);
    }

    setToDispatchActiveSholat(){
        this.props.handleActiveSholat(this.props.resulDataReminder);
    }

    componentDidMount(){
        this.setToDispatchActiveSholat();
    }

    render () {
        let reminder;

        if(this.props.resulDataReminder[1] !== null){
            reminder = "<h2 class='time-box'>" + this.props.resulDataReminder[1] + "</h2><p class='desc-box'>Menjelang Sholat " + this.props.resulDataReminder[0].sholat + (this.props.resulDataReminder[3] === 1 ? " Besok" : "") + "</p>";
        } else {
            reminder = loadingEllipsis;
        }

        reminder = ReactHtmlParser(reminder);

        return(
            <div className="reminder">
                {reminder}
            </div>
        );
    }
}

const getLastJadwal = (tmpJadwal, date, time) => {
    let jadwal = MappingJadwal(tmpJadwal.data);

    let conterMinJadwal = 0;
    let indexWaktuMin = -1;
    let counterLoopFirst = true;

    jadwal.map((rs, i) => {
        let startDate = moment(date + " " + time,'YYYY-MM-DD HH.mm.ss');
        let endDate = moment(date + " " + rs.waktu+":00",'YYYY-MM-DD HH:mm:ss');
        let dateRange   = moment.range(startDate, endDate);
        let second   = dateRange.diff('second');
        if( second > 0){
            if(second < conterMinJadwal || counterLoopFirst){
                conterMinJadwal = second ;
                indexWaktuMin = i;
                counterLoopFirst = false;
            }
        }
        return true;
    });

    if(indexWaktuMin !== -1) {
        let nighboarJadwal = jadwal[indexWaktuMin];

        let startDate = moment(date + " " + time,'YYYY-MM-DD HH.mm.ss');
        let endDate = moment(date + " " + nighboarJadwal.waktu+":00",'YYYY-MM-DD HH:mm:ss');

        let dateRange   = moment.range(startDate, endDate);
        let milliseconds = dateRange.valueOf(); // milliseconds

        var duration = moment.duration(milliseconds, 'milliseconds');

        let hours  = duration.hours();
        let minutes  = duration.minutes();
        let seconds  = duration.seconds();

        return [ nighboarJadwal,
            ( hours < 10 ? '0' : '') + hours + ':' + ( minutes < 10 ? '0' : '') + minutes + ":" + ( seconds < 10 ? '0' : '') + seconds,
            { hours:hours, minutes:minutes, seconds:seconds },
                 0 // today
               ];
    } else if(indexWaktuMin === -1 && jadwal !== null){
        let nighboarJadwal = jadwal[1];
        if(typeof nighboarJadwal !== 'undefined'){
            let dateYesterday = moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
            let startDate = moment(date + " " + time,'YYYY-MM-DD HH.mm.ss');
            let endDate = moment(dateYesterday + " " + nighboarJadwal.waktu+":00",'YYYY-MM-DD HH:mm:ss');

            let dateRange   = moment.range(startDate, endDate);
            let milliseconds = dateRange.valueOf(); // milliseconds

            let duration = moment.duration(milliseconds, 'milliseconds');
            let hours  = duration.hours();
            let minutes  = duration.minutes();
            let seconds  = duration.seconds();

            return [ nighboarJadwal,
                ( hours < 10 ? '0' : '') + hours + ':' + ( minutes < 10 ? '0' : '') + minutes + ":" + ( seconds < 10 ? '0' : '') + seconds,
                { hours:hours, minutes:minutes, seconds:seconds },
                1 // yesterday
            ];
        }
    }

    return [ { sholat: null, waktu: null }, null, null, -1];
}

const doStateToProps = (state) => {
    let resulDataReminder = getLastJadwal(state.JadwalSholat, state.DateTime.dateApi, state.DateTime.time);

    return {
        JadwalSholat : state.JadwalSholat,
        date : state.DateTime.dateApi,
        time : state.DateTime.time,
        resulDataReminder : resulDataReminder,
    }
}
const doDispatchToProps = (dispatch) =>  {
    return {
        handleActiveSholat: (data) => {
            dispatch({ type: ActionType.GET_ACTIVE_SHOLAT, ActiveSholat: data});
        }
    }
}
export default connect(doStateToProps, doDispatchToProps)(CompReminderLetestTimeSholat);