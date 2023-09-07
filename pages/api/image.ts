import type { NextApiRequest, NextApiResponse } from "next";
import * as HappyKoala from "../../lib/happy-koala";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageBase64, id } = req.body;
  if (!id || !imageBase64) {
    throw new Error("missing data");
  }
  await HappyKoala.updateImage(id, imageBase64);
  res.json({ ok: 200 });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb", // Set desired value here
    },
  },
};
