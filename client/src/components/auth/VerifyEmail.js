import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import './VerifyEmail.css';

const VerifyEmail = ({ email, password, login }) => {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/users/verify-email', { email, code });
      setMsg('Email verified! Logging you in...');
      await login(email, password); // Auto-login after verification
    } catch (err) {
      setMsg('Invalid or expired code.');
    }
  };

  return (
    <form className="otp-form" onSubmit={onSubmit}>
      <input
        className="otp-input"
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={e => setCode(e.target.value)}
        maxLength={6}
      />
      <button className="otp-btn" type="submit">Verify</button>
      {msg && <p className="otp-msg">{msg}</p>}
    </form>
  );
};

VerifyEmail.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(VerifyEmail);