"use server";

const API_URL = "https://m2m.cr.usgs.gov/api/api/json/stable/";

// returns image link
export async function getLatestImage(requestedPath, requestedRow) {
  const authRes = await fetch(API_URL + "login-token", {
    method: "POST",
    body: JSON.stringify({
      username: process.env.M2M_USERNAME,
      token: process.env.M2M_TOKEN,
    }),
  });
  // key is in apiKey.data
  const apiKey = await authRes.json();

  const filtersJson = {
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

  const res = await fetch(API_URL + "scene-search", {
    method: "POST",
    headers: { "X-Auth-Token": apiKey.data },
    body: JSON.stringify({
      datasetName: "landsat_ot_c2_l2",
      sceneFilter: filtersJson,
    }),
  });
  let data = await res.json();
  data = data.data.results[0];
  console.log(
    "🚀 ~ getLatestImage ~ data.browse[0].browsePath:",
    data.browse[0].browsePath
  );
  return data.browse[0].browsePath;
}
