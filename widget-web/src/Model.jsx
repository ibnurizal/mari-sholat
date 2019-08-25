import axios from 'axios';

export const Api = {
    GetDataJadwalSholat : (date, cityID, callback)=>{
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + cityID + '/tanggal/' + date)
            .then(callback).catch((rs) => {
            alert('Opps, Please check your connection.');
                setTimeout(() => {
                    this.setState({
                        countReloadPage: this.state.countReloadPage + 1
                    },()=> {
                        Api.GetDataJadwalSholat();
                    });
                }, 10000)
            });
    },
} ;
