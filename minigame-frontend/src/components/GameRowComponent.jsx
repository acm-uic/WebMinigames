export function GameRowComponent(props) {
    return (
      <div className="bg-white-400 m-1 py-4 h-[250px] content-center">
        <div className='bg-white-400 h-[100px] content-center flex justify-between flex-row items-center justify-normal content-normal'>
          <div className='bg-[#C7BFBF] h-[100px] flex flex-col justify-start grow p-2'>
            <div className='text-[24px] w-full justify-start'>{props.GameName}</div>
            <div className='text-[12x] w-full justify-end'>{props.GameDesc}</div>
          </div>
          <div className='w-[275px] bg-[#534444] h-[200px] flex flex-none justify-center p-2'>
            <img className="w-auto h-full" src={props.GameImage} alt="" />
          </div>
          <div className='bg-[#C7BFBF] h-[100px] w-[50px] flex-'></div>
        </div>
      </div>
    );
  }