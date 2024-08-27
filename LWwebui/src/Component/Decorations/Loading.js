import { Spinner } from "react-bootstrap"
import './Loading.css';
export const Loading = () =>{
    return(
        <>
            <p className="loading-text">Loading..</p> <Spinner className="loading-spinner"/>
        </>
    )
}