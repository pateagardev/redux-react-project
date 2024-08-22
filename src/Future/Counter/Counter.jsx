import React, { useState } from 'react'
import { increment, decrement, incrementByAmount } from './CounterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getCount } from './CounterSlice'

export default function Counter() {

  const dispatch = useDispatch()
  const count = useSelector(getCount)
  const [incrementAmount, setIncrementAmount ] = useState(0)
 
  return (  
      <div><h3>Counter</h3> 
      <div>
        {
          count
        }
      </div>
      <button onClick={()=>dispatch(increment())}>Increment</button>
      <button onClick={()=>dispatch(decrement())}>Decrement</button>
      <div>
        <input
          value={incrementAmount}
          onChange={ (e)=> setIncrementAmount(e.target.value) }
          type='text'
        />
        <button onClick={()=>dispatch(incrementByAmount(incrementAmount))}>Increase Amount</button>
      </div>
    </div>
  )
}
