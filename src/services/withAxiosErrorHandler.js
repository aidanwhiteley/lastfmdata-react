import React, { Component, Fragment } from 'react';

import Modal from '../components/UI/Modal/Modal';

const withAxiosErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(function(config) {
                console.log('Config were: ' + JSON.stringify(config));
                //this.setState({ error: null });
                if (config.params.api_key === 'xxx' || config.params.user === 'xxx') {
                    const errMsg = { message: 'API or user key not set' };
                    console.log(errMsg);
                    this.state = { error: errMsg };
                }
                return config;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log('xxxxxxxxxxxxxxxxx' + JSON.stringify(error));
                this.state = { error: error };
                return Promise.reject(error);
            });
        }

        //componentWillMount() {

            // this.reqInterceptor = axios.interceptors.request.use(req => {
            //     console.log('Req were: ' + JSON.stringify(req));
            //     this.setState({ error: null });
            //     return req;
            // });
            // this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            //     console.log('xxxxxxxxxxxxxxxxx' + JSON.stringify(error));
            //     this.setState({ error: error });
            // });


            //if (axios.config.params.api_key === 'xxx' || axios.config.params.user === 'xxx') {
            //    const errMsg = { message: 'API and user key not set' };
            //    this.setState({ error: errMsg });
            //}
        //}

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            console.log('In render: ' + JSON.stringify(this.state));

            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment >
            );
        }
    }

};

export default withAxiosErrorHandler;