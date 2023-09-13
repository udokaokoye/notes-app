'use client'
import React from 'react'

function NoteComponent() {
  return (
    <div className='note p-5'>
        <h4 className='noteTitle'>Note Title</h4>
        <div className="noteDetail">
            <span>09/09/2023</span>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, aspernatur...</span>
        </div>
    </div>
  )
}

export default NoteComponent