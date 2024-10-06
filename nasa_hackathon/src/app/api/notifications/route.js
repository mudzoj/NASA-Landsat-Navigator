import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

function diff_minutes(dt2, dt1) {
  let diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000; // difference in seconds
  diff /= 60; // convert seconds to minutes
  return Math.abs(Math.round(diff)); // return absolute value of rounded minutes
}

export async function GET(request) {
  // TODO: using filesystem here migrate to firebase later (not priority though this still works for testing)
  const notificationTimesFile = await fs.readFile(
    path.join(process.cwd(), "src/lib/data/notificationTimes.json")
  );
  const notificationTimes = JSON.parse(notificationTimesFile);

  // setting up to notify if within 10 minutes
  const phoneNumbersToNotify = [];
  const currentTime = new Date();
  for (const notificationTime of Object.keys(notificationTimes)) {
    console.log(diff_minutes(notificationTime, currentTime));
    if (diff_minutes(notificationTime, currentTime) < 10) {
      phoneNumbersToNotify.push(notificationTimes[notificationTime]);
      // TODO: SMS logic here
      // phone number is in notificationTimes[notificationTime]
      console.log("notifying " + notificationTimes[notificationTime]);
    }
  }
  return new Response();
}
