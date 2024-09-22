import RatingIcon from "./ratingIcon"

export default function RatingStarRows({ onMouseEnter, onMouseLeave, onClick, value, rating }: {value:number, onMouseEnter: any, onMouseLeave: any, onClick: any, rating:number  }) {
  return (
    <div className="flex gap-3">
        {
            Array.apply(null, Array(5)).map((_, idx) => {
                return (
                    <RatingIcon key={idx} isHover={value > idx} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} val={idx} rating={rating}/>
                )
            })
        }
    </div>
  )
}
