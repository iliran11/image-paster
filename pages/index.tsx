import cx from "classnames";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import * as happyKoala from "../lib/happy-koala";
import useImagePaster from "../src/useImagePaster";

interface Artist {
  name: string;
  prompt: string;
  id: string;
}

export const getServerSideProps: GetServerSideProps<Artist> = async () => {
  try {
    const nextArtist = await happyKoala.nextArtist();

    return {
      props: {
        name: nextArtist.artist,
        prompt: nextArtist.prompt,
        id: nextArtist.id.toString(),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { name: "", prompt: "", id: "" },
    };
  }
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { handleSend, imageString, onFileUpload, uploadStatus } =
    useImagePaster();
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
      <button
        className={cx("send-button", {
          idle: uploadStatus === "idle",
          uploading: uploadStatus === "uploading",
          error: uploadStatus === "error",
        })}
        onClick={() => handleSend(props.name, props.id)}
      >
        {uploadStatus}
      </button>
      <style jsx>{`
        .root {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h2,
        h3 {
          margin-bottom: 15px;
        }
        input[type="text"],
        textarea,
        input[type="file"] {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        img {
          margin-top: 10px;
        }
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .send-button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .idle {
          background-color: #007bff;
          color: white;
        }
        .uploading {
          background-color: #ffc107;
          color: black;
        }
        .error {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
}
