import React, { useState } from 'react'
import { DatePicker } from 'rsuite'
import moment from 'moment'
import 'rsuite/dist/rsuite.min.css'

interface Props {
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const DatePickerComponent: React.FC<Props> = (props) => {
  const { label, value, setValue } = props
  const [date, setDate] = useState(
    moment(value || new Date())
      .set({ hours: 0, minute: 0, second: 0 })
      .toDate()
  )

  const handleChange = (val: Date | null) => {
    setDate(val || new Date())
    setValue(val?.toString() || '')
  }

  return (
    <div className='relative z-0 mb-5 mt-[6px] w-full group'>
      <DatePicker
        oneTap
        placeholder={label}
        style={{ width: '100%' }}
        format='yyyy-MM-dd'
        value={date}
        onChange={handleChange}
      />
    </div>
  )
}

export default DatePickerComponent
