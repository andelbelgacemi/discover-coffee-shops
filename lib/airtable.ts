const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;
const TABLE_ID = "tblwZJpydq8HRecMn";

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

export type AirtableStore = {
  airtableId: string;
  storeId: string;
  name: string;
  votes: number;
};

export async function getOrCreateStore(
  storeId: string,
  name: string
): Promise<AirtableStore> {
  const res = await fetch(
    `${BASE_URL}/${TABLE_ID}?filterByFormula=${encodeURIComponent(
      `{storeId}="${storeId}"`
    )}`,
    { headers, cache: "no-store" }
  );

  const data = await res.json();

  if (data.records?.length) {
    const r = data.records[0];
    return {
      airtableId: r.id,
      storeId: r.fields.storeId,
      name: r.fields.name,
      votes: Number(r.fields.votes ?? 0),
    };
  }

  const createRes = await fetch(`${BASE_URL}/${TABLE_ID}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      records: [
        {
          fields: {
            storeId,
            name,
            votes: 0,
          },
        },
      ],
    }),
  });

  const created = await createRes.json();
  const record = created.records[0];

  return {
    airtableId: record.id,
    storeId,
    name,
    votes: 0,
  };
}

export async function incrementVote(storeId: string) {
  const store = await getOrCreateStore(storeId, "Coffee Store");

  await fetch(`${BASE_URL}/${TABLE_ID}/${store.airtableId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      fields: {
        votes: store.votes + 1,
      },
    }),
  });
}
