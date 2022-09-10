import { isNull } from 'lodash';
import React from 'react'
import { useSelector } from 'react-redux';
import Bubble from './Bubble';
import BubbleWithReplay from './BubbleWithReplay';
import MyBubble from './MyBubble';
import MyBubbleWithReplay from './MyBubbleWithReplay';

function Message({ message }) {

    const { user } = useSelector(state => state.user)

    return user.id == message.user_id ? (
        !isNull(message.parent_id) ? (
            <MyBubbleWithReplay message={message} />
        ) : (
            <MyBubble message={message} />
        )
    ) : (
        !isNull(message.parent_id) ? (
            <BubbleWithReplay message={message} />
        ) : (
            <Bubble message={message} />
        )
    )


}

export default Message