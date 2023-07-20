import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  let navigate=useNavigate()
  return (
    <>
      <div className='shadow rounded p-4 position-absolute top-50 start-50 translate-middle'>
        <h3 className='text-primary'>Welcome to Home !</h3>
        <div className='text-center mt-3'>
          <button className="btn btn-sm btn-outline-warning" onClick={()=>{navigate('/')}}>Logout</button>
        </div>
      </div>
    </>

  )
}

export default Home