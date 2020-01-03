import React, { Component, Fragment } from 'react';

import Modal from '../components/UI/Modal/Modal';

const withAxiosErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                console.log('Req were: ' + JSON.stringify(req));
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log('xxxxxxxxxxxxxxxxx' + JSON.stringify(error));
                this.setState({ error: error });
            });


            //if (axios.config.params.api_key === 'xxx' || axios.config.params.user === 'xxx') {
            //    const errMsg = { message: 'API and user key not set' };
            //    this.setState({ error: errMsg });
            //}
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
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