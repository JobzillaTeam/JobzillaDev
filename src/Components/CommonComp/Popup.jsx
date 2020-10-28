import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'

class Popup extends Component {

  constructor() {
    super()
    this.state = {
      isPopupShow: true
    }
  }

  showModal = () => {
    const { showPopup } = this.props;
    showPopup();
  }

  render() {
    const { isPopupShow } = this.state;
    const { title, body, showPopup, size, hideCloseButton } = this.props;

    return (
      <>
        <Modal
          size={size}
          show={isPopupShow}
          onHide={() => this.showModal()}
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
        >
          <Modal.Header closeButton={false}>
            <Modal.Title class="sub-title modal-title h4 pl-0" id="contained-modal-title-vcenter">
              <div class="popup-header-row">
                <div className="col pl-0">
                  {title}
                </div>
                {!hideCloseButton ? <div className="col-1 pt-2">
                  <img
                    src="/images/Dashboard-assets/Close-Icon.svg"
                    class="float-right header-close-popup" alt="Cinque Terre"
                    onClick={() => { this.showModal() }}
                  />
                </div> : null}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {body}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Popup