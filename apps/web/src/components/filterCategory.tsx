export default function FilterCategory({ handleChangeRadio, checkCategory }: { handleChangeRadio: any, checkCategory: string }) {
    const category = [
        {value: '', id: 'filterDefault' },
        {value: 'Music', id: 'filterMusic' },
        {value: 'Sport', id: 'filterSport' },
        {value: 'Entertainment', id: 'filterEntertainment' },
        {value: 'Seminar', id: 'filterSeminar' },
        {value: 'Gallery', id: 'filterGallery' },
    ] 
  return (
    <div className='grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 w-full text-sm md:text-md gap-2'>
                      <div>
                          <input type="radio" name="filterCategory" id='filterDefault' value={''} onChange={(e) => handleChangeRadio(e)} checked={checkCategory === ''}/>
                          <label htmlFor='filterDefault'>Any</label>
                      </div>
                      <div>
                          <input type="radio" name="filterCategory" id='filterMusic' value={'Music'} onChange={(e) => handleChangeRadio(e)} checked={checkCategory === 'Music'}/>
                          <label htmlFor='filterMusic'>Music</label>
                      </div>
                      <div>
                          <input type="radio" name="filterCategory" id='filterSport' value={'Sport'} onChange={(e) => handleChangeRadio(e)} checked={checkCategory === 'Sport'}/>
                          <label htmlFor='filterSport'>Sport</label>
                      </div>
                      <div>
                          <input type="radio" name="filterCategory" id='filterEntertainment' value={'Entertainment'} onChange={(e) => handleChangeRadio(e)} checked={checkCategory === 'Entertainment'}/>
                          <label htmlFor='filterEntertainment' className="break-all">Entertainment</label>
                      </div>
                      <div>
                          <input type="radio" name="filterCategory" id='filterSeminar' value={'Seminar'} onChange={(e) => handleChangeRadio(e)} checked={checkCategory === 'Seminar'}/>
                          <label htmlFor='filterSeminar'>Seminar</label>
                      </div>
                      <div>
                          <input type="radio" name="filterCategory" id='filterGallery' value={'Gallery'} onChange={(e) => handleChangeRadio(e)} checked={checkCategory === 'Gallery'}/>
                          <label htmlFor='filterGallery'>Gallery</label>
                      </div>
                  </div>
  )
}
