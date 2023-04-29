import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import {withTranslation} from "react-i18next";

class Component403 extends Component {
    render() {
        // const { t } = this.props;
        return (
            <div className="middle-box text-center animated fadeInDown">
                <h1>403</h1>
                <h3 className="font-bold">Bạn không có quyền truy cập vào khu vực này</h3>
                <div className="error-desc">
                    Bạn vui lòng liên hệ quản lý để được hỗ trợ.
                </div>
                <Link to={'/'} className={`mb-2`}>Quay về</Link>
                {/*<Link to={'/'} className={`mb-2`}>{ t('action.backIndex') }</Link>*/}
            </div>
        );
    }
}

export default Component403;
// export default withTranslation()(Component403);
