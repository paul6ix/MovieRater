import React, {Component} from "react";
import {withCookies} from "react-cookie";
import {Form, Button, Container} from "react-bootstrap";


class Login extends Component {

    state = {
        isLoginView: true,
        credentials: {
            username: "",
            password: ""
        }
    }
    inputChanged = event => {
        let login = this.state.credentials
        login[event.target.name] = event.target.value
        this.setState({credentials: login})
    }
    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView})
    }

    login = () => {
        if (this.state.isLoginView) {
            fetch(`${process.env.REACT_APP_BASE_URL}auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.credentials)
            }).then(response => response.json())
                .then(res => {
                    this.props.cookies.set('AuthToken', res.token)
                    window.location.href = "/movies"
                })
                .catch(error => console.error('error', error))
        } else {
            fetch(`${process.env.REACT_APP_BASE_URL}api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.credentials)
            }).then(response => response.json())
                .then(res => {
                    this.setState({isLoginView: true}
                    )
                })
                .catch(error => console.error('error', error))
        }

    }

    render() {
        return (
        <div className="container m-lg-1">
            <Form className="p-5">
                <h1> {this.state.isLoginView ? 'Login' : 'Register'} </h1>
                <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name="username" type="text" value={this.state.credentials.username}
                                  onChange={this.inputChanged}/>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" value={this.state.credentials.password}
                                  onChange={this.inputChanged}/>
                </Form.Group>

                <Button variant="primary" type="submit"
                        onClick={this.login}>{this.state.isLoginView ? 'Login' : 'Register'}
                </Button>
                <Form.Text className="text-muted pt-5"
                           onClick={this.toggleView}> {this.state.isLoginView ? 'Create Account' : 'Already have an account? Login'}
                </Form.Text>
            </Form>
        </div>
    )
    }
}

export default withCookies(Login)