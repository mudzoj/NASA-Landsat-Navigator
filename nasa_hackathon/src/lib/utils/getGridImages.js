"use server";

const API_URL = "https://m2m.cr.usgs.gov/api/api/json/stable/";

export async function getGridImages(requestedPath, requestedRow) {
  const authRes = await fetch(API_URL + "login-token", {
    method: "POST",
    body: JSON.stringify({
      username: process.env.M2M_USERNAME,
      token: process.env.M2M_TOKEN,
    }),
  });
  const apiKey = await authRes.json();
  console.log(apiKey.data);

  const requestJson = {
    acquisitionFilter: {
      start: "2024-08-17T00:00:00.000Z",
      end: "2024-08-17T00:00:00.000Z",
    },
    cloudCoverFilter: {
      max: 15,
    },
    metadataFilter: {
      filterType: "and",
      childFilters: [
        {
          filterType: "value",
          filterId: "61af9273566bb9a8",
          value: "9",
          operand: "=",
        },
        {
          filterType: "between",
          filterId: "5e83d14fb9436d88",
          firstValue: requestedPath,
          secondValue: requestedPath,
        },
        {
          filterType: "between",
          filterId: "5e83d14ff1eda1b8",
          firstValue: requestedRow,
          secondValue: requestedRow,
        },
      ],
    },
  };

  return;
}
