import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import * as happyKoala from "../lib/happy-koala";
import useImagePaster from "./useImagePaster";

interface Artist {
  name: string;
  prompt: string;
}

export const getServerSideProps: GetServerSideProps<Artist> = async () => {
  try {
    const nextArtist = await happyKoala.nextArtist();
    return {
      props: { name: nextArtist.artist, prompt: nextArtist.prompt },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { name: "", prompt: "" },
    };
  }
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { handleSend, imageString, onFileUpload } = useImagePaster();
  return (
    <div className="root">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h2>Artist name</h2>
      <input type="text" value={props.name} readOnly />
      <p>prompt</p>
      <textarea value={props.prompt} rows={10} readOnly />
      <h2>Form</h2>
      <input type="file" onChange={onFileUpload} />
      <img
        src={imageString as string}
        style={{ width: "300px", height: "300px", objectFit: "cover" }}
      />
      <h3>Send</h3>
      <button onClick={handleSend}>Send</button>
      <style jsx>{`
        .root {
          padding: 25px;
          padding-bottom: 250px;
        }
      `}</style>
    </div>
  );
}
