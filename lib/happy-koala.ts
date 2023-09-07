import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";

const animal = "happy Koala";
const prompt = (artist: string) =>
  `joyful and happy ${animal} in the style of ${artist}, with big baby eyes, realistic and hyper-detailed renderings, blue decorative relief, dreamy and romantic compositions Green and orange --ar 4:3 --chaos 0.25`;

export const nextArtist = async () => {
  const client = await clientPromise;
  const db = client.db("image-paster");
  const happyKoala = db.collection("happy-koala");
  const pipeline = [
    {
      $match: {
        image: { $in: [null, false, 0, ""] },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: "artists",
        localField: "artist",
        foreignField: "_id",
        as: "artistInfo",
      },
    },
    {
      $unwind: "$artistInfo",
    },
    {
      $project: {
        _id: 1,
        artistName: "$artistInfo.name",
      },
    },
  ];
  const [document] = await happyKoala.aggregate(pipeline).toArray();
  const artist = document.artistName;
  return { artist, prompt: prompt(artist), id: document._id };
};

export const updateImage = async (id: string, image: string) => {
  const client = await clientPromise;
  const db = client.db("image-paster");
  const happyKoala = db.collection("happy-koala");
  const query = { _id: new ObjectId(id) };
  const update = {
    $set: {
      image,
    },
  };

  const result = await happyKoala.updateOne(query, update);
  return;
};

export const getAll = async () => {
  const client = await clientPromise;
  const db = client.db("image-paster");
  const happyKoala = db.collection("happy-koala");
  const pipeline = [
    {
      $match: {
        image: { $exists: true, $ne: null },
      },
    },
    {
      $lookup: {
        from: "artists",
        localField: "artist",
        foreignField: "_id",
        as: "artistData",
      },
    },
    {
      $unwind: "$artistData",
    },
    {
      $project: {
        image: 1,
        name: "$artistData.name",
        _id: 0,
      },
    },
  ];

  const results = await happyKoala.aggregate(pipeline).toArray();
  const dd =  results.map((x) => ({ name: x.name, image: x.image }));
  return dd;
};
