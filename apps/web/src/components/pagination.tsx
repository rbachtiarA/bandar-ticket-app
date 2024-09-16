import React from 'react'

export default function Pagination ({pages, handlePageJump, handlePage}: { pages:number, handlePageJump:any, handlePage:any }) {
    const arr = []
    for(let i = 0; i < pages; i++) {
        arr.push(i+1)
    }
    return (
    <div className='[&_button]:btn-pagination-ry flex justify-center items-center gap-4'>
        <button onClick={() => handlePage(-1)}>prev page</button>
        {
            arr.map((val) => (
                <button key={val} onClick={() => handlePageJump(val)}>{val}</button >
            ))
        }
        <button onClick={() => handlePage(1)}>next page</button>
    </div>
  )
}
