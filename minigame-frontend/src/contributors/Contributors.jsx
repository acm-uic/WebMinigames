import AdrianProfileImg from "../images/AdrianPFP.png";
import JackProfileImg from "../images/JackPFP.jpg";
import ThaiProfileImg from "../images/ThaiPFP.jpg";
import TrentonProfileImg from "../images/TrentonPFP.jpg";
import MinhProfileImg from "../images/MinhPFP.jpg";
export function AdrianContributor() {
  return (
		<div className="contributor-adrian flex flex-c bg-slate-500 w-[300px] p-1">
			<img className="object-cover" src={AdrianProfileImg} width={"100px"} />
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
			<img className="object-cover" src={JackProfileImg} width={"100px"} />
			<div className="text-white text-center justify-center m-auto">
				<div className="font-semibold">Chao Liu ｜ Jack</div>
				<div>@JackLiu00331</div>
			</div>
		</div>
	);
}

export function ThaiContributor() {
  return (
    <div className="contributor-minh flex flex-c bg-slate-500 w-[300px] p-1">
      <img className="object-cover" src={ThaiProfileImg} width={"100px"} />
      <div className="text-white text-center justify-center m-auto">
        <div className="font-semibold">Viet Thai Nguyen</div>
        <div>@thai.nguyen07</div>
      </div>
    </div>
  );
}

export function TrentonContributor() {
  return (
    <div className="contributor-thai flex flex-c bg-slate-500 w-[300px] p-1">
      <img src={TrentonProfileImg} width={"100px"} />
      <div className="text-white text-center justify-center m-auto">
        <div className="font-semibold">Trenton Coleman</div>
        <div>@tdcoleman127</div>

export function MinhContributor() {
  return (
    <div className="contributor-minh flex flex-c bg-slate-500 w-[300px] p-1">
      <img className="object-cover" src={MinhProfileImg} width={"100px"} height={"300px"} />
      <div className="text-white text-center justify-center m-auto">
        <div className="font-semibold">Minh Ngo</div>
        <div>@hoangngo-sudo</div>
      </div>
    </div>
  );
}
