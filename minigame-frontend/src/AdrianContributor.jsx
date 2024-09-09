import AdrianProfileImg from './Arrow Swarm trails.png'


export function AdrianContributor(props) {
  return (
    <div className='contributor-adrian'>
        <img src={AdrianProfileImg} width={"100px"}/>
        <div>
          {props.name}
          {props.username ? props.username : " No username"}
        </div>
      </div>
  )
}