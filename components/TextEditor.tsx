import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

interface Props {
  getContent: (val: string) => void
}

const Editor = dynamic<EditorProps>(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor)
  },
  { ssr: false }
)
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TextEditor: React.FC<Props> = ({ getContent }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state)
    sendContent()
  }

  const sendContent = () => {
    getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className='min-h-[300px]'>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
      />
    </div>
  )
}

export default TextEditor
