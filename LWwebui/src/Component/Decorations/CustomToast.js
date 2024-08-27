import { Toast,ToastContainer } from "react-bootstrap"
import { useState } from "react";

export const CustomToast = (message) => {
    const [show, setShow] = useState();
    return(
        <div >
             <ToastContainer className="p-3"position={'top-center'} style={{ zIndex: 1 }}>
                <Toast  onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header closeButton={false}>            
                    <strong className="me-auto"><span className="text-danger">Error saat mencari data</span></strong>
                    <button type="button" class="btn-close"onClick={()=>setShow(false)} aria-label="Close"></button>
                    </Toast.Header>
                    <Toast.Body>Maaf data yang anda cari tidak ditemukan</Toast.Body>
                </Toast>
             </ToastContainer>
        </div>
    )
}