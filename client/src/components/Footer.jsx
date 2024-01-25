import React from 'react';
import { Card } from 'react-bootstrap';

function Footer() {
  return (
    <div style={{ position: 'relative' }}>

      <Card className="text-center" style={{ backgroundColor: "navy", borderRadius: 0, position: 'absolute', width: '100%' }}>
        <Card.Footer className="text-white" style={{ fontSize: '16px' }}>@2024 Fleet Management System.</Card.Footer>
      </Card>
    </div>
  )
}

export default Footer;
