const axios = require('axios');

// Taken from https://www.youtube.com/watch?v=D9OJX6sSyYk
export default function MeetingsOverlay(isOpen, onClose, children) {
    console.log("MeetingsOverlay called")
    return (
        <>
            isOpen ? (
                <div className='overlay'>
                    <div className='overlay_background' onClick={onClose} />
                    <div className='overlay_container'>
                        <div className='overlay_controls'>
                            <button className='overlay_close' type='button' onClick={onClose} />
                        </div>
                        {children}
                    </div>
                </div>
            ) : null;
        </>
    )
}