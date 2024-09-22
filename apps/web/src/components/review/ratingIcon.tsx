import * as React from "react"
export default function RatingIcon( { isHover, onMouseEnter, onMouseLeave, onClick, val, rating }: { isHover: Boolean, onMouseEnter: any, onMouseLeave: any, onClick: any, val:number, rating:number }) {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 30 30"
            onMouseEnter={
                () => {
                    if(!onMouseEnter) return;
                    return onMouseEnter(val+1)
                }
            }
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            className={!onClick?'':'cursor-pointer'}
            // {...props}
        >
            <title />
            <path
            d="M16.41 1.52 19.06 9a1.52 1.52 0 0 0 1.35 1l7.65.32a1.58 1.58 0 0 1 .87 2.8l-6 5a1.6 1.6 0 0 0-.52 1.65l2.08 7.71a1.52 1.52 0 0 1-2.28 1.73l-6.37-4.45a1.44 1.44 0 0 0-1.66 0L7.8 29.23a1.52 1.52 0 0 1-2.28-1.73l2.08-7.71a1.6 1.6 0 0 0-.52-1.65l-6-5a1.58 1.58 0 0 1 .87-2.8l7.65-.32a1.52 1.52 0 0 0 1.35-1L13.6 1.5a1.48 1.48 0 0 1 2.81.02Z"
            data-name="Layer 2"
            style={{
                fill: `${rating>val?`#FFD700`: isHover?`#FFD700`:`none`}`,
                stroke: `${rating>val?`#FFD700`: isHover?`#FFD700`:`#000`}`,
                strokeLinecap: "round",
                strokeLinejoin: "round",
            }}
            />
        </svg>
    )
}
