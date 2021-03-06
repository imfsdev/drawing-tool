import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../../actions/authentication'
import classnames from 'classnames'
import { Button } from 'reactstrap'
import './styles.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/customer')
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(user)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/customer')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  render() {
    const { errors } = this.state
    return (
      <div className="container" style={{ marginTop: '100px', width: '400px' }}>
        <form className="form-section" onSubmit={this.handleSubmit}>
          <div className="content">
            <div className="form-group">
              <p>Username</p>
              <input
                type="email"
                placeholder="Email"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.email,
                })}
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <p>Password</p>
              <input
                type="password"
                placeholder="Password"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.password,
                })}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group" style={{ textAlign: 'center' }}>
              <Button color="primary" type="submit" style={{ width: '200px' }}>
                Login
              </Button>
              <Link
                className="nav-link"
                to="/register"
                style={{ textDecoration: 'underline' }}
              >
                Don't have an account?
              </Link>
            </div>
            <div className="form-group" style={{ textAlign: 'center' }}></div>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { loginUser },
)(Login)
