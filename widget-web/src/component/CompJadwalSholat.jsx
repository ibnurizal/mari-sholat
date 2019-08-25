import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import '../css/loading.css';
import {ActionType} from "../redux/ActionTypes";
import CardJadwal from "./CardJadwal";
import { MappingJadwal } from '../helper/Formater';
import {Api} from "../Model";

let loadingEllipsis = ReactHtmlParser("<div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>");

class CompJadwalSholat extends Component {
    state = {
        countReloadPage : 0,
        JadwalSholat : {
            "data": {
                "ashar": loadingEllipsis,
                "dhuha": loadingEllipsis,
                "dzuhur": loadingEllipsis,
                "imsak": loadingEllipsis,
                "isya": loadingEllipsis,
                "maghrib": loadingEllipsis,
                "subuh": loadingEllipsis,
                "terbit": loadingEllipsis
            }
        }
    }

    handleGetData()
    {
        Api.GetDataJadwalSholat(this.props.dateApi, this.props.cityID, res => {
            let rs = res.data;
            if(rs.status === 'ok'){
                const rsJadwalSholat = rs.jadwal;
                this.setState({
                    JadwalSholat: rsJadwalSholat
                }, () => {
                    this.props.handleReloadJadwalSholat(this.state.JadwalSholat);
                });

            }
        });
    }

    componentDidMount() {
        this.handleGetData();
    }

    render () {
        return(
            <div className="ui cards">
                { MappingJadwal(this.state.JadwalSholat.data).map((rs, index) =>
                    <CardJadwal key={index} waktu={rs.waktu} sholat={rs.sholat} active={rs.sholat === this.props.activeSholat} />
                )}
            </div>
        );
    }
}
const doStateToProps = (state) => {

    return {
        time   : state.DateTime.time,
        dateApi   : state.DateTime.dateApi,
        cityID   : state.Config.cityID,
        activeSholat   : (state.ActiveSholat == null ? null : state.ActiveSholat[0].sholat),
    }
}
const doDispatchToProps = (dispatch) =>  {
    return {
        handleReloadJadwalSholat: (dataState) => {
            dispatch({ type: ActionType.RELOAD_JADWAL_SHOLAT, JadwalSholat: dataState});
        }
    }
}
export default connect(doStateToProps, doDispatchToProps)(CompJadwalSholat);