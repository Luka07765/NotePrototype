import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2024 Your Company. All Rights Reserved.</p>
      <p style={styles.text}>
        <a href="/privacy" style={styles.link}>
          Privacy Policy
        </a>{' '}
        |
        <a href="/terms" style={styles.link}>
          {' '}
          Terms of Service
        </a>
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '1em 0',
    position: 'fixed',

    bottom: 0,
    width: '100%',

    left: '12%',
  },
  text: {
    margin: 0,
    padding: '0.5em',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    marginLeft: '10px',
  },
};

export default Footer;
