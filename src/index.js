import { from, fromEvent } from "rxjs";
import { map, flatMap, startWith } from "rxjs/operators";
import axios from "axios";

const button = document.querySelector(".refresh");
const refreshClicks = fromEvent(button, "click");

const requestStream = refreshClicks.pipe(
  startWith("startup click"),
  map(() => {
    const randomOffset = Math.floor(Math.random() * 500);
    return `https://api.github.com/users?since=${randomOffset}`;
  })
);

const responseStream = requestStream.pipe(
  flatMap(requestUrl => {
    return from(axios(requestUrl));
  })
);

responseStream.subscribe(data => {
  console.log(data.data);
});
