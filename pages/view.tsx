import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import * as KoalaRepo from "../lib/happy-koala";

interface Data {
  images: { name: string; image: string }[];
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  // Your data fetching logic here
  // ...
  const images = await KoalaRepo.getAll();
  return {
    props: {
      images,
    },
  };
};

function ViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div>
      <h1>Total Pictures: {props.images.length}</h1>

      <div className="gallery">
        {props.images.map((x, index) => (
          <div className="image-container" key={index}>
            <img src={x.image} alt={x.name} />
            <p className="caption">{x.name}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .gallery {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .image-container {
          margin: 15px;
          text-align: center;
        }
        img {
          max-width: 300px;
          max-height: 300px;
        }
        .caption {
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}

export default ViewPage;
