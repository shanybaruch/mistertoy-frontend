// import { useState, useEffect, useRef } from 'react'
// import { utilService } from '../services/util.service'

// export function Chat() {
//     const [msgs, setMsgs] = useState([])
//     const [userInput, setUserInput] = useState('')
//     const msgsRef = useRef()

//     useEffect(() => {
//         if (msgsRef.current) {
//             msgsRef.current.scrollTo({
//                 top: msgsRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }
//     }, [msgs])

//     function addMsg(text, from) {
//         const newMsg = {
//             id: utilService.makeId(),
//             text,
//             from,
//             sentAt: new Date()
//         }
//         setMsgs(prevMsgs => [...prevMsgs, newMsg])
//     }

//     const handleSubmit = (ev) => {
//         ev.preventDefault()
//         let value = userInput.trim()
//         if (!value) return

//         addMsg(value, 'user')

//         setTimeout(() => {
//             addMsg(`Sure thing honey`, 'Support')
//         }, 1000)

//         setUserInput('')
//     }

//     return (
//         <div className="chat-container">
//             <div ref={msgsRef} className="chat-messages">
//                 {msgs.map(msg => (
//                     <div key={msg.id} className={`message ${msg.from === 'user' ? 'user' : 'other'}`}>
//                         <section>
//                             <span className="timestamp">{msg.sentAt.toLocaleTimeString()}</span>
//                             <h3>{msg.from === 'user' ? 'You' : msg.from}: </h3>
//                         </section>
//                         <p>{msg.text}</p>
//                     </div>
//                 ))}
//             </div>

//             <form onSubmit={handleSubmit} className="chat-input-form">
//                 <input
//                     type="text"
//                     value={userInput}
//                     onChange={(ev) => setUserInput(ev.target.value)}
//                     placeholder="Type your message..."
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     )
// }


import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service'
import { toyService } from '../services/toy.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function Chat({ toy, onToyUpdate }) {
    const [msgs, setMsgs] = useState([])
    const [userInput, setUserInput] = useState('')
    const msgsRef = useRef()

    useEffect(() => {
        if (msgsRef.current) {
            msgsRef.current.scrollTo({
                top: msgsRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [msgs, toy?.msgs])

    function addChatMsg(text, from) {
        const newMsg = {
            id: utilService.makeId(),
            text,
            from,
            sentAt: new Date()
        }
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    const handleChatSubmit = (ev) => {
        ev.preventDefault()
        let value = userInput.trim()
        if (!value) return

        addChatMsg(value, 'user')
        setTimeout(() => {
            addChatMsg(`Sure thing honey, we're looking into it!`, 'Support')
        }, 1000)
        setUserInput('')
    }

    return (
        <div className="chat-container">
            <section className="support-chat">
                <div ref={msgsRef} className="chat-messages" style={{ height: '150px', overflowY: 'auto' }}>
                    {msgs.map(msg => (
                        <div key={msg.id} className={`message ${msg.from === 'user' ? 'user' : 'other'}`}>
                            <small>{msg.from}: </small>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleChatSubmit} className="chat-input-form">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(ev) => setUserInput(ev.target.value)}
                        placeholder="Chat with us..."
                    />
                    <button type="submit">Send</button>
                </form>
            </section>
        </div>
    )
}