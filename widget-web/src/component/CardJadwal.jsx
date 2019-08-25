import React, {Component} from 'react';
import { connect } from 'react-redux';

class CardJadwal extends Component {
    render () {
        return(
            <div className={"card "+(this.props.active ? "active" : "")}>
                <div className="content">
                    <p className="jadwal-sholat"> {this.props.sholat}</p>
                    <h3 className="waktu-sholat">{this.props.waktu}</h3>
                </div>
            </div>
        );
    }
}

export default connect()(CardJadwal);