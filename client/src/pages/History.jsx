

import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'
import GenerateBtn from '../components/GenerateBtn'
const History = () => {

    const {history,fetchHistory} = useContext(AppContext);
    const downloadCurrentImage = (imageUrl,prompt) => {
        const imgLink = document.createElement("a");
        imgLink.href=imageUrl;
        imgLink.download = prompt + " .jpg";
        document.body.appendChild(imgLink);
        imgLink.click();
        document.body.removeChild(imgLink);
    }
    useEffect(()=>{
        fetchHistory();
    },[])

  return (
    <div className="my-20">
      {(history.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-20'>
            <p className='text-center text-gray-500 mt-10'>No history found.</p>
            <GenerateBtn/>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {history.map((item, index) => (
    <div
      key={index}
      className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition cursor-pointer"
      onClick={()=>downloadCurrentImage(item.imageUrl, item.prompt)}
    >
      <img
        src={item.imageUrl}
        alt="generated"
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      <p className="text-sm">
        <span className="font-semibold">Prompt:</span> {item.prompt}
      </p>
    </div>
  ))}
</div>
        
      ))}
    </div>
  )
}

export default History
