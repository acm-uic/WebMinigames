import AdrianProfileImg from "../images/AdrianPFP.png";
import JackProfileImg from "../images/JackPFP.jpg";
export function AdrianContributor() {
  return (
    <div className="contributor-adrian flex flex-c bg-slate-500 w-[300px] p-1">
      <img src={AdrianProfileImg} width={"100px"} />
      <div className="text-white text-center justify-center m-auto">
        <div>Adrian Knight</div>
        <div>@Ajknight121</div>
      </div>
    </div>
  );
}

// Add your contributor card component below

export function JackContributor() {
  return (
    <div className="contributor-jack flex flex-c bg-slate-500 w-[300px] p-1">
      <img src={JackProfileImg} width={"100px"} />
      <div className="text-white text-center justify-center m-auto">
        <div className="font-semibold">Chao Liu ｜ Jack</div>
        <div>@JackLiu00331</div>
      </div>
    </div>
  );
}
