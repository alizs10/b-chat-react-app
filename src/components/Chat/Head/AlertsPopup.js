import React from 'react'

function AlertsPopup() {
  return (
    <div className="w-56 overflow-hidden flex flex-col absolute right-0 top-[4.5rem] z-30 shadow-lg bg-white rounded-corners">
            <button className="text-right hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>new message from @alizs10</span>
            </button>
           
            <button className="text-right hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>new message from @alizs10</span>
            </button>
           
            <button className="text-right hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>new message from @alizs10</span>
            </button>
           
        </div>
  )
}

export default AlertsPopup