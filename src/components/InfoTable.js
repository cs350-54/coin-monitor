import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {column} from '../config/column';
import fetchUtil from '../util/FetchUtil';
import {Config} from '../config/config';

class InfoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            btc_data: {},
            bch_data: {},
            btg_data: {},
            ripple_data: {},
            ada_data: {},
            stellar_data: {},
            total: 0
        };
        this.updateTable = this.updateTable.bind(this);
    }

    componentDidMount() {
        this.updateTable();
    }

    updateTable() {
        this.setState({
            total: 0
        })
        this.updateBTC().then(response => {
            this.setState({
                btc_data : response
            })
        });
        this.updateBCH().then(response => {
            this.setState({
                bch_data : response
            })
        });
        this.updateBTG().then(response => {
            this.setState({
                btg_data : response
            })
        });
        this.updateRipple().then(response => {
            this.setState({
                ripple_data : response
            })
        });
        this.updateCardano().then(response => {
            this.setState({
                ada_data : response
            })
        });
        this.updateStellar().then(response => {
            this.setState({
                stellar_data : response
            })
        });

    };

    updateBTC() {
        return fetchUtil(Config.Q_URL + "book=" + Config.COIN_SYM.BCT).then(response => {
            if(response instanceof Error) {
                return response;
            }
            else {
                this.setState({
                    total: this.state.total + (response.bid * Config.BUYING.volume.BCT)
                });
                return {
                    coin: "bitcoin",
                        volume: Config.BUYING.volume.BCT,
                    buying: Config.BUYING.price.BCT,
                    current: response.bid,
                    total: Config.BUYING.volume.BCT * response.bid,
                    profit: Config.BUYING.volume.BCT *(response.bid - Config.BUYING.price.BCT)
                }
            }
        });
    }

    updateBCH() {
        return fetchUtil(Config.Q_URL + "book=" + Config.COIN_SYM.BCH).then(response => {
            if(response instanceof Error) {
                return response;
            }
            else {
                this.setState({
                    total: this.state.total + (response.bid * Config.BUYING.volume.BCH)
                });
                return {
                    coin: "bitcoin cash",
                    volume: Config.BUYING.volume.BCH,
                    buying: Config.BUYING.price.BCH,
                    current: response.bid,
                    total: Config.BUYING.volume.BCH * response.bid,

                    profit: Config.BUYING.volume.BCH *(response.bid - Config.BUYING.price.BCH)
                }
            }
        });
    }

    updateBTG() {
        return fetchUtil(Config.Q_URL + "book=" + Config.COIN_SYM.BTG).then(response => {
            if(response instanceof Error) {
                return response;
            }
            else {
                this.setState({
                    total: this.state.total + (response.bid * Config.BUYING.volume.BTG)
                });
                return {
                    coin: "bitcoin gold",
                    volume: Config.BUYING.volume.BTG,
                    buying: Config.BUYING.price.BTG,
                    current: response.bid,
                    total: Config.BUYING.volume.BTG * response.bid,

                    profit: Config.BUYING.volume.BTG *(response.bid - Config.BUYING.price.BTG)
                }
            }
        });
    }

    updateRipple() {
        return fetchUtil(Config.C_URL + "ripple/?convert=CAD").then(response => {
            if(response instanceof Error) {
                return response;
            }
            else {
                this.setState({
                    total: this.state.total + (response[0].price_cad * Config.BUYING.volume.XRP)
                });
                return {
                    coin: "ripple",
                    volume: Config.BUYING.volume.XRP,
                    buying: Config.BUYING.price.XRP,
                    current: response[0].price_cad,
                    total: Config.BUYING.volume.XRP * response[0].price_cad,

                    profit: Config.BUYING.volume.XRP *(response[0].price_cad - Config.BUYING.price.XRP)
                }
            }
        });
    }
    updateCardano() {
        return fetchUtil(Config.C_URL + "cardano/?convert=CAD").then(response => {
            if(response instanceof Error) {
                return response;
            }
            else {
                this.setState({
                    total: this.state.total + (response[0].price_cad * Config.BUYING.volume.ADA)
                });
                return {
                    coin: "cardano",
                    volume: Config.BUYING.volume.ADA,
                    buying: Config.BUYING.price.ADA,
                    current: response[0].price_cad,
                    total: Config.BUYING.volume.ADA * response[0].price_cad,

                    profit: Config.BUYING.volume.ADA *(response[0].price_cad - Config.BUYING.price.ADA)
                }
            }
        });
    }
    updateStellar() {
        return fetchUtil(Config.C_URL + "stellar/?convert=CAD").then(response => {
            if(response instanceof Error) {
                return response;
            }
            else {
                this.setState({
                    total: this.state.total + (response[0].price_cad * Config.BUYING.volume.XLM)
                });
                return {
                    coin: "stellar lumen",
                    volume: Config.BUYING.volume.XLM,
                    buying: Config.BUYING.price.XLM,
                    current: response[0].price_cad,
                    total: Config.BUYING.volume.XLM * response[0].price_cad,

                    profit: Config.BUYING.volume.XLM *(response[0].price_cad - Config.BUYING.price.XLM)
                }
            }
        });
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={[this.state.btc_data, this.state.bch_data,this.state.btg_data,
                    this.state.ripple_data, this.state.ada_data, this.state.stellar_data]}
                    columns={column}
                    className="-striped -highlight"
                    minRows={0}
                >
                </ReactTable>
                <div style={{textAlign: "center"}}>
                    <button onClick={this.updateTable}>Refresh</button>
                    <span style={{fontSize:"30px", marginLeft:"200px"}}>{this.state.total.toFixed(0)}</span>
                    <span style={{fontSize:"30px", marginLeft:"200px"}}>{this.state.total.toFixed(0) - 10000}</span>
                </div>
            </div>
        )
    }
}

export default InfoTable