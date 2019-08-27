import React, {Component} from 'react';
import { connect } from 'react-redux';
import { MappingJadwal } from '../helper/Formater';
import Moment from 'moment-hijri';
import { extendMoment } from 'moment-range';
import {ActionType} from "../redux/ActionTypes";
import ReactHtmlParser from "react-html-parser";
import Notification from 'react-web-notification';
import Bell from '../images/bell.png';
import Sound from '../files/sound.mp3';
import SoundOgg from '../files/sound.ogg';

const moment = extendMoment(Moment);

let loadingEllipsis = "<div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div><br>Loading...";

class CompReminderLetestTimeSholat extends Component {
    state = {
        ignore: true,
        title: '',
    };
    constructor(props){
        super(props);
        setInterval(()=> this.setToDispatchActiveSholat(), 1000);
    }

    templateNotification(callBack){
        let data = this.props.resulDataReminder[2];
        if(typeof  data === 'undefined') return false;
        if(data === null) return false;

        let body;
        const title =  "Mari Sholat" ;
        if(data.minutes === 0 && data.seconds === 1){
            body = "Saat ini waktu sholat " + this.props.resulDataReminder[0].sholat;
        } else {
            body = data.minutes + " Minutes Menjelang Sholat " + this.props.resulDataReminder[0].sholat;
        }

        const now = Date.now();
        const tag = now;

        const icon = Bell;

        // Available options
        // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
        const options = {
            tag: tag,
            body: body,
            icon: icon,
            lang: 'in',
            dir: 'ltr',
            sound: Sound  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
        }
        this.setState({
            title: title,
            options: options
        }, ()=> callBack());

    }

    handleNotification(){
        let data = this.props.resulDataReminder[2];
        if(typeof  data === 'undefined') return false;
        if(data === null) return false;

        if(!this.state.ignore){
            if(data.minutes === 10 && data.seconds === 0){
                this.templateNotification(()=>{
                   console.log('Callback: templateNotification');
                });
            }
            if(data.minutes === 0 && data.seconds === 1){
                this.templateNotification(()=>{
                    console.log('Callback: templateNotification');
                });
            }
        }
        // }
    }

    handlePermissionGranted(){
        console.log('Permission Granted');
        this.setState({
            ignore: false
        });
    }
    handlePermissionDenied(){
        console.log('Permission Denied');
        this.setState({
            ignore: true
        });
    }
    handleNotSupported(){
        console.log('Web Notification not Supported');
        this.setState({
            ignore: true
        });
    }
    handleNotificationOnClick(e, tag){
        console.log(e, 'Notification clicked tag:' + tag);
    }
    handleNotificationOnError(e, tag){
        console.log(e, 'Notification error tag:' + tag);
    }
    handleNotificationOnClose(e, tag){
        console.log(e, 'Notification closed tag:' + tag);
    }
    handleNotificationOnShow(e, tag){
        console.log(e, 'Notification shown tag:' + tag);
        this.playSound();
    }
    playSound(){
        document.getElementById('sound').play();
    }

    setToDispatchActiveSholat(){
        this.handleNotification();
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
                <Notification
                    ignore={this.state.ignore && this.state.title !== ''}
                    notSupported={this.handleNotSupported.bind(this)}
                    onPermissionGranted={this.handlePermissionGranted.bind(this)}
                    onPermissionDenied={this.handlePermissionDenied.bind(this)}
                    onShow={this.handleNotificationOnShow.bind(this)}
                    onClick={this.handleNotificationOnClick.bind(this)}
                    onClose={this.handleNotificationOnClose.bind(this)}
                    onError={this.handleNotificationOnError.bind(this)}
                    timeout={20000}
                    title={this.state.title}
                    options={this.state.options}
                />
                <audio id='sound' preload='auto'>
                    <source src={Sound} type='audio/mpeg' />
                    <source src={SoundOgg} type='audio/ogg' />
                    <embed hidden={true} autostart='false' loop={false} src='./sound.mp3' />
                </audio>
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