import React, { useState } from 'react';

const ProfileSettings = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      setMessage('Password changed successfully!');
      // Add logic to change the password
    } else {
      setMessage('Passwords do not match.');
    }
  };

  const handleResetPassword = () => {
    // Add logic to reset the password
    setMessage('Password reset link sent to your email.');
  };

  return (

    
    <div className='my-11'>

<h1 className="text-3xl font-bold  dark:text-white mt-7 mb-4 text-center text-orange-500">
          Reset Password
        </h1>
    <div className='my-11' style={styles.container}>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Current Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Confirm New Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleChangePassword} style={styles.button}>
        Change Password
      </button>
      <button onClick={handleResetPassword} style={styles.button}>
        Reset Password
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff3e0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#ff6f20',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#ff6f20',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ff6f20',
  },
  button: {
    backgroundColor: '#ff6f20',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  message: {
    marginTop: '10px',
    color: '#ff6f20',
  },
};

export default ProfileSettings;
