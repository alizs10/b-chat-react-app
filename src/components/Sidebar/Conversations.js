import React from 'react'
import Conversation from './Conversation'

function Conversations() {
    return (

        <div className='relative flex flex-col gap-y-2 pl-3 styled-scrollbar overflow-y-scroll'>

            <span className="bg-white/80 z-20 sticky top-0 block text-sm text-gray-600 pb-1 border-b border-gray-200">Conversations (8)</span>
            <ul className='mt-2 flex flex-col gap-y-2 pb-3 mr-3'>
                <Conversation status={false} last_message="LEGEND!" username="Mehran Modiri" date="2022/08/16" avatar="assets/images/user-profile-5.webp" />
                <Conversation status={true} last_message="How u doing?? Miss u man..." username="Matt LeBlanc" date="2:04 PM" avatar="assets/images/user-profile-1.webp" />
                <Conversation status={false} last_message="Hello Goat!!! Siuuuuuu" username="Cristiano" date="yesterday" avatar="assets/images/user-profile-2.webp" />
                <Conversation status={false} last_message="So HANDSOME..." username="David Beckham" date="yesterday" avatar="assets/images/user-profile-3.webp" />
                <Conversation status={false} last_message="Congratulations man!!! Big Victory" username="Johnny Depp" date="2022/08/25" avatar="assets/images/user-profile-4.webp" />
                <Conversation status={false} last_message="Congratulations man!!! Big Victory" username="Johnny Depp" date="2022/08/25" avatar="assets/images/user-profile-4.webp" />
                <Conversation status={false} last_message="Congratulations man!!! Big Victory" username="Johnny Depp" date="2022/08/25" avatar="assets/images/user-profile-4.webp" />
                <Conversation status={false} last_message="Congratulations man!!! Big Victory" username="Johnny Depp" date="2022/08/25" avatar="assets/images/user-profile-4.webp" />
                <Conversation status={false} last_message="Congratulations man!!! Big Victory" username="Johnny Depp" date="2022/08/25" avatar="assets/images/user-profile-4.webp" />
                <Conversation status={false} last_message="Congratulations man!!! Big Victory" username="Johnny Depp" date="2022/08/25" avatar="assets/images/user-profile-4.webp" />

            </ul>
        </div>

    )
}

export default Conversations