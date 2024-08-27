import './Result.css'
import { CustomModal } from './Modal'
import { useState,useEffect } from 'react'

export const Result = ({results,loading}) =>{    
    const [modalShow, setModalShow] = useState(false)
    const [singleItem, setSingleItem] = useState(null)

    const handleButtonDetail = (item) =>{
        setModalShow(true)
        setSingleItem(item)
    }
    return(
    
        <div className='result'>
            <table width={'100%' } className=''>
                <tr className='border result-tr result-tr-th'>
                    <th width='20%' className='result-th'>Keyword</th>
                    <th width='50%' className='result-th'>Detail</th>
                    <th width='20%' className='result-th'>Pasal</th>
                    <th width='10%' className='result-th'>Action</th>
                </tr>
        
                {results.map((item,index) => (
                    <tr key={index}>
                        <td className='result-td'>hasil</td>
                        <td className='result-td'>
                            {item.description.length > 10
                            ? item.description.substring(0, 100) + '...'
                            : item.description}
                        </td>
                        <td className='result-td'>{item.pasal}</td>
                        <td className='result-td'><button onClick={()=>handleButtonDetail(item)} className="details-btn">Detail</button></td>
                    </tr>
                ))}
                
            </table>

            {
                modalShow ? <CustomModal show={modalShow} onHide={() => setModalShow(false)} item = {singleItem}/>
                :
                ""
            }   
        </div>
    )    
}