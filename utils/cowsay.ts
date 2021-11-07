/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import cowsay, { IOptions } from "cowsay";
import getRandomInt from "./random";
import quotes from "./quotes.json";

export default function () {
  const quoteNum = getRandomInt(0, quotes.length);
  const opts: IOptions = {
    text: `${quotes[quoteNum].quote} - ${quotes[quoteNum].author}`,
    r: true,
  };

  let cowStr;
  const regex = /```/g;
  do {
    cowStr = cowsay.say(opts);
  } while (cowStr.search(regex) !== -1);

  return cowStr;
}
