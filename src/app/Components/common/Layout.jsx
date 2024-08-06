// src/app/Components/common/Layout.jsx
import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import Container from 'react-bootstrap/Container';

const Layout = ({ children }) => {
  return (
      <Container>
        <Breadcrumbs />
        {children}
      </Container>
  );
};

export default Layout;
