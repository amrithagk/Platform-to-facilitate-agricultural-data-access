import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const LoginSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Dealer');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  // Additional signup fields
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [idProof, setIdProof] = useState('');
  const [region, setRegion] = useState('');
  const [contact, setContact] = useState('');

  const handleToggle = () => {
    setError('');
    setIsLogin((prev) => !prev);
  };

  const handleRoleToggle = () => {
    setRole((prev) => (prev === 'Dealer' ? 'Farmer' : 'Dealer'));
  };

  const handleAuth = async () => {
    try {
      const userData = { email, password, role };

      if (!isLogin) {
        // Additional fields for signup
        userData.Name = name;
        userData.Date_of_Birth = dob;
        userData.Id_Proof = idProof;
        if (role === 'Dealer') {
          userData.region = region;
          userData.contact = contact;
        }
      }

      if (isLogin) {
        // Login
        const response = await axios.post(`http://localhost:5000/login/${role}`, userData);
        const token = response.data.token;
        console.log('Login successful! Token:', token);
        // Save the token in localStorage or state for future requests
      } else {
        // Signup
        await axios.post(`http://localhost:5000/signup/${role}`, userData);
        console.log('Signup successful!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container-fluid login-signup-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center bg-primary">
              <h2 className="text-light">{isLogin ? 'Login' : 'Sign Up'}</h2>
              <p className="text-light">Role: {role}</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRoleToggle}
              >
                {role === 'Dealer' ? 'Are you a farmer?' : 'Are you a Dealer?'}
              </button>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
                {!isLogin && role === 'Farmer' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Date of Birth:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={dob}
                        required
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="idProof" className="form-label">
                        ID Proof:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="idProof"
                        value={idProof}
                        required
                        onChange={(e) => setIdProof(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {!isLogin && role === 'Dealer' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Region" className="form-label">
                        Region:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Region"
                        value={region}
                        required
                        onChange={(e) => setRegion(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Contact" className="form-label">
                        Contact Details:
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="Contact1"
                        value={contact}
                        required
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    pattern="^(?=.*[A-Za-z\d]).{8,}$"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!isLogin && (
                    <ul className="password-requirements">
                      <li>At least 8 characters long</li>
                      <li>Must include at least one letter or digit</li>
                    </ul>
                  )}
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>

                <p className="mt-3">
                  {isLogin
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <button
                    type="button"
                    className="link-button"
                    onClick={handleToggle}
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
