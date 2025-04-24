import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const BoardInput = () => {
  return (
    <div>
      <InputGroup className="mt-5 mb-5">
        <Form.Control as="textarea" aria-label="Recipients username with two button addons" />
        <Button variant="outline-secondary">Upload</Button>
      </InputGroup>
    </div>
  )
}

export default BoardInput
