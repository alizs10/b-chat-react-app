import React, { useRef } from 'react'
import { useSwipeable } from 'react-swipeable';
import Conversations from './Sidebar/Conversations'

function Sidebar({ setSidebarVisibility }) {

    const handlers = useSwipeable({
        onSwiping: (SwipeEventData) => handleSwipeSidebar(SwipeEventData),
        onSwipedLeft: (eventData) => handleAfterSwipeSidebar(eventData),
        ...{
            delta: 50,                             // min distance(px) before a swipe starts. *See Notes*
            preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
            trackTouch: true,                      // track touch input
            trackMouse: true,                     // track mouse input
            rotationAngle: 0,                      // set a rotation angle
            swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
            touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
        },
    });

    const handleSwipeSidebar = eventData => {
        // console.log(eventData);

        if (eventData.deltaX < 0) {
            sidebarRef.current.style.left = `-${eventData.absX}px`;
        }
        // setSidebarVisibility(false)

    }

    const handleAfterSwipeSidebar = eventData => {
        if(eventData.deltaX < -200) 
        {
            setSidebarVisibility(false)
        } else {
            sidebarRef.current.style.left = 0;
        }
    }

    const sidebarRef = useRef(null)

    const refPassthrough = (el) => {
        // call useSwipeable ref prop with el
        handlers.ref(el);

        // set myRef el so you can access it yourself
        sidebarRef.current = el;
    }


    return (
        <div {...handlers} ref={refPassthrough} className="fixed top-0 bottom-0 left-0 w-full z-30 lg:relative grid grid-rows-6 gap-y-2 lg:h-screen bg-white col-span-3">

            <div className='row-span-5 flex flex-col gap-y-2'>

                <div className="flex flex-col gap-y-2 p-3">
                    <span className='font-bold text-2xl py-2 block'><span className="text-[#4361ee]">B</span>CHAT</span>
                </div>

                <Conversations />
            </div>

            <div className='row-span-1 flex-center p-3'>

                <button className="flex w-full items-center p-2 rounded-corners bg-[#5F7AF0] btn-hover text-white transition-all duration-300">
                    <span className='p-3 w-fit rounded-corners bg-[#4361EE] px-4 flex-center'>
                        <i className="fa-regular fa-comment-medical text-2xl"></i>
                    </span>
                    <span className='ml-2 whitespace-nowrap text-lg'>Start New Conversation</span>
                </button>
            </div>

        </div>
    )
}

export default Sidebar