/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import cowsay, { IOptions } from "cowsay";
import getRandomInt from "./random";
import quotes from "./quotes.json";

export default async function (cow: string | undefined) {
  const quoteNum = getRandomInt(0, quotes.length); // generate the number of the quote to use
  let opts: IOptions;

  function getCows(
    error: NodeJS.ErrnoException,
    cowNames: Array<string>
  ): void {
    if (error) {
      console.log(`Error getting cow names: ${error.message}`);
    } else if (cowNames) {
      console.log(`Number of cows available: ${cowNames.length}`);
    }
  }

  const cowList = await cowsay.list(getCows);

  if (cow !== undefined && cowList.includes(cow.concat(".cow"))) {
    opts = {
      text: `${quotes[quoteNum].quote} - ${quotes[quoteNum].author}`,
      f: cow,
    }; // if the user input a valid cow, use it to make the ascii art string with the generated quote
  } else {
    opts = {
      text: `${quotes[quoteNum].quote} - ${quotes[quoteNum].author}`,
      r: true,
    }; // otherwise, use a random cow
  }

  const regex = /```/g;
  return cowsay.say(opts).replace(regex, "'''");
  // check to make sure we won't drop out of the code fence
}
