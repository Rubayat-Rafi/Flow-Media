import {
  GiAmericanFootballPlayer,
  GiBaseballGlove,
  GiBoxingGloveSurprise,
  GiCowboyBoot,
  GiCurlingStone,
  GiHockey,
  GiSoccerBall,
} from "react-icons/gi";
import {
  IoBasketballSharp,
  IoCarSportSharp,
} from "react-icons/io5";
import {
  MdOutlineLiveTv,
  MdOutlineSportsMma,
  MdSportsCricket,
  MdSportsTennis,
} from "react-icons/md";
import { PiBoxingGloveBold } from "react-icons/pi";

export const Categories = [
  { name: "Channel", Icon: MdOutlineLiveTv },
  { name: "Soccer", Icon: GiSoccerBall },
  { name: "NBA", Icon: IoBasketballSharp },
  { name: "NFL", Icon: GiAmericanFootballPlayer },
  { name: "NCAAF", Icon: GiAmericanFootballPlayer },
  { name: "Hockey", Icon: GiHockey },
  { name: "Boxing", Icon: PiBoxingGloveBold },
  { name: "MMA", Icon: MdOutlineSportsMma },
  { name: "WNBA", Icon: IoBasketballSharp },
  { name: "Cricket", Icon: MdSportsCricket },
  { name: "Basketball", Icon: IoBasketballSharp },
  { name: "Tennis", Icon: MdSportsTennis },
  { name: "Racing", Icon: IoCarSportSharp },
  { name: "Baseball", Icon: GiBaseballGlove },
  { name: "Rugby", Icon: GiAmericanFootballPlayer },
  { name: "Wrestling", Icon: GiBoxingGloveSurprise },
  { name: "Curling", Icon: GiCurlingStone },
  { name: "GAA", Icon: GiSoccerBall },
  { name: "Rodeo", Icon: GiCowboyBoot },
];
