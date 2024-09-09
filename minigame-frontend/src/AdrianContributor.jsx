import AdrianProfileImg from './Arrow Swarm trails.png'


export function AdrianContributor(props) {
  return (
    <div className='contributor-adrian'>
        <img src={AdrianProfileImg} width={"100px"}/>
        <div>
          {props.name}
          @Ajknight121
        </div>
      </div>
  )
}