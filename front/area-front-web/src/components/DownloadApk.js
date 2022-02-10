import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class DownloadApkComponent extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <a href="../../public/client.apk" download>
                    Download APK
                </a>
            </div>
        );
    };
}

export default withRouter(DownloadApkComponent);