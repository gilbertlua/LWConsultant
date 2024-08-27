import { useState } from 'react'
import { Loading } from '../Decorations/Loading'
import './Main.css'
import { Result } from '../Result/Result'
import { CustomToast } from '../Decorations/CustomToast'

export const Main = () => {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [inputSearch, setInputSeatch] = useState()
    const [showToast, setShowToast] = useState(false)
   
    const handleButtoneSearch = () =>{        
        setLoading(true)
        fetchItems(inputSearch)
        setShowResult(true)        
    }
    const handleInputChanges = (event) => {
        setInputSeatch(event.target.value)
    }
        
    const fetchItems = async (search) => {
        const API_URL = 'http://localhost:5183/Item/GetItemsKeyword?key='+search;

        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data === null || data === undefined) {
            setShowToast(true)
          }
          setResult(data)
          
        } catch (error) {
            setShowToast(true)
        } finally {
            setLoading(false)
        }
    }


    return(
        <>
            {showToast ? <CustomToast /> : "" }
            
            <div className="container">
                <div className="row main-container" >
                    <div>
                        <div className='title-bar child-bar'>
                            <p className='title-header'><span className="first-text">Layanan</span> Konsultasi Hukum</p>
                        </div>
                        <div className='center-bar child-bar'>
                            <input type='text'className='search-bar border' onChange={handleInputChanges} value={inputSearch}/>
                            <button className='search-btn' onClick={handleButtoneSearch}>Cari !</button>                        
                        </div>

                        <div className='loading-bar child-bar'>
                            {
                                loading ? <Loading/> : '' 
                            }
                            
                        </div>
                        
                        <div>
                            {
                                showResult ? <Result results={result} loading={setLoading}/> : ''
                            }
                        </div>                        
                    </div>                    
                </div>                
            </div>

            
        </>
    )
}