import React, { Component } from 'react'
import { Modal, Button, Glyphicon } from 'react-bootstrap'
import './confirm-window.scss'

class ConfirmWindow extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      show: false
    }
  }

  handleClose () {
    this.setState({ show: false })
  }

  handleShow () {
    this.setState({ show: true })
  }

  render () {
    const { show, onConfirm, onDismiss, title, text, confirmation } = this.props
    return (
      <div>
        <Modal show={show} onConfirm={onConfirm} onHide={onDismiss}>
          <Modal.Header closeButton>
            <Modal.Title><Glyphicon glyph='exclamation-sign' />{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{text}</h5>
            {this.props.children}
          </Modal.Body>
          { confirmation &&
          <Modal.Footer>
            <Button bsStyle='success' onClick={onDismiss}>إلغاء<Glyphicon glyph='ban-circle' /></Button>
            <Button bsStyle='danger' onClick={onConfirm}>موافق <Glyphicon glyph='trash' /></Button>
          </Modal.Footer>
          }
        </Modal>
      </div>
    )
  }
}

export default ConfirmWindow
