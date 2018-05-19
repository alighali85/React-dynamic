import React from 'react'
import { Button, ButtonToolbar, Modal } from 'react-bootstrap'

class AdminModal extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)

    this.state = {
      show: false
    }
  }

  handleShow () {
    this.setState({ show: true })
  }

  handleHide () {
    this.setState({ show: false })
  }

  render () {
    return (
      <ButtonToolbar>
        <Button bsStyle='primary' onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName='custom-modal'
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-lg'>
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Wrapped Text</h4>
            <p>
              Here is the modal
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    )
  }
}
export default AdminModal
