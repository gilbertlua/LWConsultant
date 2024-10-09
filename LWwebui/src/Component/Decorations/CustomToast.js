import { Toast,ToastContainer } from "react-bootstrap"
import { useState, useEffect } from 'react';

export const CustomToast = ({ message, trigger }) => {    
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        if (trigger) {
            setShow(true); 
        }
    }, [trigger]);
    
    return (
        <div>
            <ToastContainer className="p-3" position={'top-center'} style={{ zIndex: 1 }}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header closeButton={false}>            
                        <strong className="me-auto">
                            <span className="text-danger">Error saat mencari data</span>
                        </strong>
                        <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};
