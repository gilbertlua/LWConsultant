import { Modal } from "react-bootstrap"
import "./Result.css"

export const CustomModal = (props) =>{
    // console.log(item)

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Hasil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.item.pasal}</h4>        
          <iframe
            src={"./pdf/UU Nomor 5 Tahun 1960.pdf"}
            title="PDF Viewer"
            width="100%"
            height="500px"
            />
        </Modal.Body>
        <Modal.Footer>
          <button className="details-btn" onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}