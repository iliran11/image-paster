// components/BigButtons.js
const Home = () => {
  return (
    <div className="button-container">
      <a href="/submit" role="button" className="big-button submit-button">
        Submit New Pictures
      </a>
      <a href="/view" role="button" className="big-button view-button">
        See All Existing Pictures
      </a>
      <style jsx>{`
        .button-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .big-button {
          padding: 20px;
          font-size: 24px;
          width: 100%;
          max-width: 300px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin: 10px;
          text-align: center;
        }
        .submit-button {
          background-color: #007bff;
          color: white;
        }
        .view-button {
          background-color: #28a745;
          color: white;
        }
        @media (max-width: 768px) {
          .big-button {
            font-size: 18px;
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
