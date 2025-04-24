import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
const BoardSearch = () => {
  return (
    <div>
      <InputGroup>
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipients username with two button addons"
        />
        <Button variant="outline-secondary">Search</Button>
        <Button variant="outline-secondary">Reset</Button>
      </InputGroup>
    </div>
  )
}

export default BoardSearch
