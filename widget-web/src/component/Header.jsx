import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import CompClock from './CompClock';
import CompDate from './CompDate';
import CompReminderLetestTimeSholat from './CompReminderLetestTimeSholat';
import Marquee from 'marquee-react-dwyer';
import '../css/animate.css';
import Background from '../images/images1.jpg';

class Header extends Component {
    render () {
        var sectionStyle = {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: -132,
            backgroundPositionY: -21,
            backgroundColor: '#0000',
            backgroundImage: `url(${Background})`
        };
        return(
            <Fragment>
                <header className="ui header" style={sectionStyle}>
                    <div className="ui three column grid">
                        <div className="l date four celled  column">
                            <CompDate/>
                        </div>
                        <div className="c eight celled column">
                            <p className="bismillah">السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</p>
                            <h1>{this.props.title}</h1>
                            <p>{this.props.desc}</p>
                        </div>
                        <div className="r time four celled column">
                            <CompClock/>
                        </div>
                    </div>

                    <CompReminderLetestTimeSholat/>
                </header>
                <div className="runningText">
                    <Marquee
                        Size={"p"}
                        NumberOfOptions={"3"}
                        Index0={
                            " حُبِّبَ إِلَيَّ مِنَ الدُّنْيَا النِّسَاءُ وَالطِّيبُ، وَجُعِلَ قُرَّةُ عَيْنِي فِي الصَّلَاةِ " +
                            " - “Dijadikan kesenanganku dari dunia berupa wanita dan minyak wangi. Dan dijadikanlah penyejuk hatiku dalam ibadah shalat.” (HR. An-Nasa’i no. 3391 dan Ahmad 3: 128, shahih)"
                        }
                        Index1={
                            " ِقُمْ يَا بِلَالُ فَأَرِحْنَا بِالصَّلَاةِ " +
                            " - “Wahai Bilal, berdirilah. Nyamankanlah kami dengan mendirikan shalat.” (HR. Abu Dawud no. 4985, shahih)"
                        }
                        Index2={
                            "إِنَّ الصَّلَاةَ تَنْهَى عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ " +
                            " - “Sesungguhnya shalat itu mencegah dari perbuatan keji dan mungkar.” (QS. Al-‘Ankabuut [29]: 45)"
                        }
                        TimeToCross={"30000"}
                        TimeToChange={"10000"}
                        IsRandom={"false"}
                        Color={"#FFFF"}
                    />
                </div>
            </Fragment>
        );
    }
}
const doStateToProps = (state) => {
    return {
        title   : state.Config.title,
        desc    : state.Config.desc,
        address : state.Config.address
    }
}
export default connect(doStateToProps)(Header);