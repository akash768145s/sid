"use client";
import Link from "next/link";
import Image from "next/image";
import notFoundImage from "../../public/Girl-Img.png"; // Adjust the path as necessary

const NotFoundPage = () => {
  return (
    <div className="container">
      <Image src={notFoundImage} alt="404 Image" width={500} height={500} />
      <h1>404</h1>
      <p>Oops! Page not found</p>
      <Link href="/">
        <span className="go-back-link">Go back to homepage</span>
      </Link>
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        body {
          background-color: #0a0b3b;
          color: #fff;
          font-family: sans-serif;
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        h1 {
          font-size: 6em;
          margin: 0;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        p {
          font-size: 1.5em;
          margin: 0;
          margin-top: 20px;
        }

        a {
          display: inline-block;
          padding: 10px 20px;
          background-color: #4293ef;
          color: #fff;
          text-decoration: none;
          margin-top: 20px;
          font-size: 1.2em;
          border-radius: 50px;
          animation: bounce 1s ease-in-out infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 4em;
          }
          p {
            font-size: 1em;
          }
        }

        @media (max-width: 576px) {
          h1 {
            font-size: 3em;
          }
          p {
            font-size: 0.8em;
          }
          a {
            font-size: 1em;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
