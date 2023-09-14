'use client'
import React from 'react'
import { Note } from '@/types'
import moment from 'moment'

interface ComponentProps {
  note: Note
}
const NoteComponent: React.FC<ComponentProps> = ({note}) => {
  return (
    <div className='note p-5'>
        <h4 className='noteTitle'>{note.title}</h4>
        <div className="noteDetail">
            <span className='noteDate'>{moment(note.created).format("MM/DD/YY")}</span>
            <span className='noteContent'>{note.body}</span>
        </div>
    </div>
  )
}

export default NoteComponent