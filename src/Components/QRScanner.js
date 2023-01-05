import React, { Component } from 'react';
import QrReader from 'modern-react-qr-reader';
import {withRouter} from './Navigate';
import apis from '../utilities/api';
import './QRScanner.css';

class QRScanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            delay: 100,
            result: 'Scanning...',
        }
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    handleScan(data){
        if(data){
            this.setState({
            result: data.text,
            })
            apis.markAttendance({QRString:data.text});
            this.props.navigate('/Dashboard');
        }
    }
    handleError(err){
        console.error(err)
    }
    render() {
        const previewStyle = {
            height: 240,
            width: 320,
        }
        return (
            <div className='qrcscanner-main'>
                <div className='qrscanner-window'>
                    <QrReader
                        delay={300}
                        facingMode={"environment"}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={previewStyle}
                    />
                </div>
                <p>{this.state.result}</p>
            </div>
        )
    }
}

export default withRouter(QRScanner);
