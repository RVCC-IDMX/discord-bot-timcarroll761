/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import cowsay, { IOptions } from "cowsay";
import getRandomInt from "./random";

export default function () {
  const opts: IOptions = {
    text: "For science!",
    r: true,
  };

  let cowStr;
  const regex = /```/g;
  do {
    cowStr = cowsay.say(opts);
  } while (cowStr.search(regex) !== -1);

  return cowStr;
}
