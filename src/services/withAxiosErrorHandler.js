import React, { Component, Fragment } from 'react';

import Modal from '../components/UI/Modal/Modal';

const withAxiosErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
            userOrKeyNotEdited: false
        }

        constructor(props) {
            super(props);

            // Store 'this' for use in later function calls!
            var that = this;

            this.reqInterceptor = axios.interceptors.request.use(function (config) {
                // console.log(config);
                that.setState({ error: null, userOrKeyNotEdited: false });
                if (config.params.api_key === 'xxx' || config.params.user === 'xxx') {
                    that.setState({ userOrKeyNotEdited: true });
                }
                return config;
            });

            this.resInterceptor = axios.interceptors.response.use(res => {
                // console.log('http response recived ok');
                return res;
            }, anError => {
                let errMsg = '' + anError;
                if (that.state.userOrKeyNotEdited) {
                    errMsg = 'The default API and user key in LastFmDataAxiosService must be edited before use';
                }
                that.setState({ error: errMsg });
                return Promise.reject(anError);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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