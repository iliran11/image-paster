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
  return { artist, prompt: prompt(artist) };
};
