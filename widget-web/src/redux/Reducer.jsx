
import { ActionType } from "./ActionTypes";

import moment from 'moment-hijri';
import 'moment/locale/id';

moment.localeData()._iMonths = ['Muharram' , 'Safar' , 'Rabi’ul Awal' , 'Rabi’ul Akhir' , 'Jumadil Awal' , 'Jumadil Akhir' , 'Rajab' , 'Sha’ban' , 'Ramadhan' , 'Syawal' , 'Dzulka’dah' , 'Dzulhijah'];

let formatDate = 'DD MMMM YYYY';
let formatDateForAPI = 'YYYY-MM-DD';
let formatDateHijriah = 'iDD iMMMM iYYYY';
let formatTime = 'HH.mm.ss';
let formatDateTimeLang = 'id';

let stateDefault = {
    Config: {
        title: 'Mari Sholat',
        desc: '',
        address: 'Desc',
        // https://api.banghasan.com/sholat/format/json/kota
        cityID: 664,
    },
    DateTime: {
        dateHijriah: moment(new Date()).locale(formatDateTimeLang).format(formatDateHijriah),
        dateApi: moment(new Date()).locale(formatDateTimeLang).format(formatDateForAPI),
        date: moment(new Date()).locale(formatDateTimeLang).format(formatDate),
        time: moment(new Date()).locale(formatDateTimeLang).format(formatTime),
    },
    JadwalSholat: { },
    ActiveSholat: null
};

let rootReducer = (state = stateDefault, action) => {
    switch (action.type)
    {
        case ActionType.LOAD_CONFIG:
            return {
                ...state,
                Config: {
                    ...state.Config,
                    title   : action.title,
                    desc    : action.desc,
                    address : action.address,
                    cityID : action.cityID
                }
            }
        case ActionType.RELOAD_DATE_TIME:
            return {
                ...state,
                DateTime: {
                    ...state.DateTime,
                    dateHijriah: moment(new Date()).locale(formatDateTimeLang).format(formatDateHijriah),
                    dateApi: moment(new Date()).locale(formatDateTimeLang).format(formatDateForAPI),
                    date: moment(new Date()).locale(formatDateTimeLang).format(formatDate),
                    time: moment(new Date()).locale(formatDateTimeLang).format(formatTime)
                }
            }
        case ActionType.RELOAD_JADWAL_SHOLAT:
            return {
                ...state,
                JadwalSholat: action.JadwalSholat
            }
        case ActionType.GET_ACTIVE_SHOLAT:
            return {
                ...state,
                ActiveSholat: action.ActiveSholat
            }
        default:
            return state;
    }
}

export default rootReducer;