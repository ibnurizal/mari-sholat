

module.exports.MappingJadwal = function(data){
    if(data === undefined) return [];
    return [
        { sholat: 'Imsak', waktu: data.imsak },
        { sholat: 'Subuh', waktu: data.subuh },
        { sholat: 'Syuruq', waktu: data.terbit },
        { sholat: 'Dhuha', waktu: data.dhuha },
        { sholat: 'Dzuhur', waktu: data.dzuhur },
        { sholat: 'Ashar', waktu: data.ashar },
        { sholat: 'Maghrib', waktu: data.maghrib },
        { sholat: 'Isya', waktu: data.isya },
    ];
}
