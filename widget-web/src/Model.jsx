import axios from 'axios';

export const Api = {
    GetDataJadwalSholat : (date, cityID, callback, callbackCatch)=>{
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + cityID + '/tanggal/' + date)
            .then(callback).catch(callbackCatch);
    },
} ;
