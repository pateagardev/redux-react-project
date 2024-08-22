import React from 'react'
import { parseISO, formatDistanceToNow, format } from 'date-fns';

export default function TimeAgo({timestamp}) {
    let timeAgo = "";
    let formattedDate = "";
    if (timestamp) {
        const date = parseISO(timestamp)
        formattedDate = format(date, "MMMM do, yyyy 'at' h:mm a");
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    
  return (
     <span className='date'>
          {formattedDate}
          &nbsp; {timeAgo}
    </span>
  )
}
