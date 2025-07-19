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
  IoFootball,
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
  { name: "Football", Icon: IoFootball },
  { name: "Soccer", Icon: GiSoccerBall },
  { name: "NBA", Icon: IoBasketballSharp },
  { name: "Rugby", Icon: GiAmericanFootballPlayer },
  { name: "Curling", Icon: GiCurlingStone },
  { name: "WNBA", Icon: IoBasketballSharp },
  { name: "Rodeo", Icon: GiCowboyBoot },
  { name: "GAA", Icon: GiSoccerBall },
  { name: "Cricket", Icon: MdSportsCricket },
  { name: "Basketball", Icon: IoBasketballSharp },
  { name: "Tennis", Icon: MdSportsTennis },
  { name: "MMA", Icon: MdOutlineSportsMma },
  { name: "Boxing", Icon: PiBoxingGloveBold },
  { name: "Racing", Icon: IoCarSportSharp },
  { name: "Baseball", Icon: GiBaseballGlove },
  { name: "Wrestling", Icon: GiBoxingGloveSurprise },
  { name: "Hockey", Icon: GiHockey },
];
