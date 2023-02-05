import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import TextInput from './TextInput'

interface Props {
  name: string
  label: string
  list: string[]
  setList: React.Dispatch<React.SetStateAction<string[]>>
}

const MultiInput: React.FC<Props> = (props) => {
  const { list, setList, name, label } = props
  const [item, setItem] = useState('')

  const addItem = () => {
    if (item && !list.includes(item)) {
      setList(list.length ? [...list, item] : [item])
      setItem('')
    }
  }

  const deleteItem = (index: number) => {
    let li = [...list]
    li.splice(index, 1)
    setList(li)
  }

  return (
    <>
      <div className='flex'>
        <TextInput
          name={name}
          label={label}
          type='text'
          value={item}
          setValue={setItem}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.stopPropagation()
              e.preventDefault()
              addItem()
            }
          }}
        />
        <button
          className='m-3 w-[42px] rounded-full bg-[#009ef7] text-white flex justify-center items-center'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addItem()
          }}
        >
          <FontAwesomeIcon className='py-0 text-2xl w-5' icon={faPlus} />
        </button>
      </div>
      <div className='flex gap-2 items-center mb-3'>
        <span className={'text-xl flex ' + !list.length && 'hidden'}>
          {label}:
        </span>
        {list &&
          list.map((tag, index) => (
            <div className='flex border border-[#009ef7]' key={index}>
              <span className='px-2 border-r border-[#009ef7]'>{tag}</span>
              <div
                className='cursor-pointer flex justify-center items-center px-2'
                onClick={(e) => {
                  e.preventDefault()
                  deleteItem(index)
                }}
              >
                <FontAwesomeIcon
                  className='text-xl text-[#009ef7] w-3'
                  icon={faTimes}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default MultiInput
