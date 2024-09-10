import React from 'react'

export default function Pagination ({pages, handlePageJump, handlePage}: { pages:number, handlePageJump:any, handlePage:any }) {
    const arr = []
    for(let i = 0; i < pages; i++) {
        arr.push(i+1)
    }
    return (
    <div className='[&_button]:btn-pagination flex justify-end gap-4 mt-4'>
        <button onClick={() => handlePage(-1)}>prev page</button>
        {
            arr.map((val) => (
                <button onClick={() => handlePageJump(val)}>{val}</button >
            ))
        }
        <button onClick={() => handlePage(1)}>next page</button>
    </div>
  )
}
