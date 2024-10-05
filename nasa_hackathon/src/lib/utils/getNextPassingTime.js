"use server";

import { promises as fs } from "fs";
import path from "path";

const pathSchedule = [
  [13, 29, 45, 61, 77, 93, 102, 118, 134, 150, 166, 182, 198, 214, 230],
  [4, 20, 36, 52, 68, 84, 93, 109, 125, 141, 157, 173, 189, 205, 221],
  [11, 27, 43, 59, 75, 91, 100, 116, 132, 148, 164, 180, 196, 212, 228],
  [2, 18, 34, 50, 66, 82, 91, 107, 123, 139, 155, 171, 187, 203, 219],
  [9, 25, 41, 57, 73, 89, 98, 114, 130, 146, 162, 178, 194, 210, 226],
  [16, 32, 48, 64, 80, 96, 105, 121, 137, 153, 169, 185, 201, 217, 233],
  [7, 23, 39, 55, 71, 87, 96, 112, 128, 144, 160, 176, 192, 208, 224],
  [14, 30, 46, 62, 78, 94, 103, 119, 135, 151, 167, 183, 199, 215, 231],
  [5, 21, 37, 53, 69, 85, 94, 110, 126, 142, 158, 174, 190, 206, 222],
  [12, 28, 44, 60, 76, 92, 101, 117, 133, 149, 165, 181, 197, 213, 229],
  [3, 19, 35, 51, 67, 83, 92, 108, 124, 140, 156, 172, 188, 204, 220],
  [10, 26, 42, 58, 74, 90, 99, 115, 131, 147, 163, 179, 195, 211, 227],
  [1, 17, 33, 49, 65, 81, 90, 106, 122, 138, 154, 170, 186, 202, 218],
  [8, 24, 40, 56, 72, 88, 97, 113, 129, 145, 161, 177, 193, 209, 225],
  [15, 31, 47, 63, 79, 95, 104, 120, 136, 152, 168, 184, 200, 216, 232],
  [6, 22, 38, 54, 70, 86, 95, 111, 127, 143, 159, 175, 191, 207, 223],
];

export async function getNextPassingTime(requestedPath, requestedRow) {
  const pattern = /(\d{2,3})\s+(\d{2})\s+(\d{3}-\d{2}:\d{2}:\d{2})\s+(\w{3})/g;
  let day;
  let isFound = false;
  for (let i = 0; i < 16 && !isFound; i++) {
    for (let path of pathSchedule[i]) {
      if (path == requestedPath) {
        day = i;
        isFound = true;
        break;
      }
    }
  }

  const scheduleText = await fs.readFile(
    path.join(
      process.cwd(),
      `src/lib/data/landsat-9-schedule/day-${day + 1}.txt`
    )
  );

  let match;
  while ((match = pattern.exec(scheduleText)) !== null) {
    const [_, path, row, imageStart, station] = match;
    if (parseInt(path) == requestedPath && parseInt(row) == requestedRow) {
      return imageStart;
    }
  }
}
