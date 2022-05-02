import React from 'react';
import "./sampleModal.css"
import Modal from 'react-modal';

Modal.setAppElement("#root");

function SampleModal({children, isOpen, onModalClose}) {
    // We can also control isOpen using a local state

    function handleModalClose(){
        // console.log('SampleModal:onModalClose()')
        onModalClose();
    }
  
    return (
      <div className="App">
        {/* <button onClick={toggleModal}>Open modal</button> */}
        <Modal
          isOpen={isOpen}
          onRequestClose={handleModalClose}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={0}
        >
          {children}
          {/* <div className="bottomBar">
            <button className="borderlessButton" onClick={handleModalClose}>Close</button>
          </div> */}
        </Modal>
      </div>
    );
}

export default SampleModal
