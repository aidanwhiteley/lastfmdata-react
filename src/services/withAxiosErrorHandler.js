import React, { Component, Fragment } from 'react';

import Modal from '../components/UI/Modal/Modal';

const withAxiosErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
            userOrKeyNotEdited: false
        }

        _isMounted = false;

        constructor(props) {
            super(props);

            // Store 'this' for use in later function calls!
            var that = this;

            this.reqInterceptor = axios.interceptors.request.use(function (config) {
                if (that._isMounted) {
                    that.setState({ error: null, userOrKeyNotEdited: false });
                    if (config.params && (config.params.api_key === 'xxx' || config.params.user === 'xxx')) {
                        that.setState({ userOrKeyNotEdited: true });
                    }
                }
                return config;
            });

            this.resInterceptor = axios.interceptors.response.use(res => {
                return res;
            }, anError => {
                if (that._isMounted) {
                    let errMsg = '' + anError;
                    if (that.state.userOrKeyNotEdited) {
                        errMsg = 'The default API and user key in LastFmDataAxiosService must be edited before use';
                    }
                    that.setState({ error: errMsg });
                    return Promise.reject(anError);
                }
            });
        }

        componentDidMount() {
            this._isMounted = true;
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
            this._isMounted = false;
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null, userOrKeyNotEdited: false });
        }

        render() {

            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment >
            );
        }
    }

};

export default withAxiosErrorHandler;   