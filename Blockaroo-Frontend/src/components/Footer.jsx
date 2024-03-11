import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      Blockaroo {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  const footerStyle = {
    padding: '32px 0', // Increased vertical spacing
    backgroundColor: '#000000', // Black background
    color: 'white',
    textAlign: 'center', // Centered text
    marginTop: '20px'
  };

  const messageStyle = {
    marginBottom: '16px', // Spacing between paragraphs
    fontWeight: 'bold', // Bold font for the heading
  };

  const contactStyle = {
    marginTop: '16px', // Spacing above contact info
  };

  return (
    <footer style={footerStyle}>
      <Container maxWidth="sm">
        <Typography variant="body1" style={messageStyle}>
          Blockaroo - Your Premier NFT Marketplace
        </Typography>
        <Typography variant="body2" color="inherit" style={{ marginBottom: '16px' }}>
          Explore unique digital assets and start your NFT journey with Blockaroo. Connect with artists, collectors, and enthusiasts from around the world.
        </Typography>
        <Typography variant="body2" color="inherit" style={contactStyle}>
          For inquiries, please contact us at{' '}
          <a href="mailto:info@blockaroo.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
            info@blockaroo.com
          </a>
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
