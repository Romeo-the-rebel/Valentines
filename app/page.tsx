"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoveImg from "../components/images/love.png";
import RocketImg from "../components/images/rocket.png";
import { gridItems, MusicItems } from "@/data";
import insta from '@/components/images/instagram.png'
import email from '@/components/images/mail.png'
import linked from '@/components/images/linkedin.png'





const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(5);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showRocket, setShowRocket] = useState<boolean>(false);
  const [showItems, setShowItems] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setLoading(false);
            setShowRocket(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (showRocket) {
      setTimeout(() => {
        setShowItems(true);
      }, 3000);
    }
  }, [showRocket]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gridItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gridItems.length - 1 : prevIndex - 1
    );
  };

  const handleOkClick = () => {
    setShowLoader(true);
    setLoading(true);
  };

  return (
    <div className="bg-[#fff] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="bg-black">{/* header content */}</header>

      <main className="w-full">
        {!showLoader ? (
          <div className="text-center border-2 border-black rounded-lg p-5 flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-3xl">Are You Ready?</h1>
            <h3 className="text-gray-400">Click the heart if you are</h3>
            <button onClick={handleOkClick} className="mt-4">
              <Image src={LoveImg} height={200} width={200} alt="Heart image" />
            </button>
          </div>
        ) : (
          <div className="loader-container text-center">
            {loading ? (
              <p className="text-3xl font-extrabold">Loading... {seconds}s</p>
            ) : null}
          </div>
        )}

        {!loading && showLoader && !showRocket && (
          <div className="content text-center mt-4">
            <h1>Welcome to the Home Page!</h1>
          </div>
        )}

        {showRocket && (
          <div className="rocket-container text-center mt-4 ">
            <h1 className="text-[3rem] font-extrabold text-gray-500">
              Happy Valentine Day
            </h1>
            <div className="rocket-animation">
              <Image
                src={RocketImg}
                height={100}
                width={100}
                alt="Rocket image"
                className="rocket"
              />
            </div>
          </div>
        )}

        {showItems && (
          <div className="items-container text-center mt-4">
            <h2 className="text-2xl font-bold mt-16 mb-4">Poetry For The Soul</h2>
            <div className="flex justify-center items-center space-x-8">
              <button
                onClick={handlePrev}
                className="text-xl font-bold text-white bg-gray-700 p-4 rounded-full"
              >
                &lt;
              </button>

              <div className=" items-center bg-gradient-to-r from-pink-300 via-blue-300 to-blue-400 border-2 rounded-3xl p-5 w-[40rem]">
                <div className="flex-1 flex flex-col items-center justify-between h-full">
                  <h3 className="font-bold text-xl mb-2">
                    {gridItems[currentIndex].title}
                  </h3>
                </div>
                <div className="flex h-[20rem] w-[40rem]">
                  <Image
                    src={gridItems[currentIndex].img}
                    height={200}
                    width={300}
                    alt="Missing Image"
                    className="rounded-3xl bg-white py-3 mb-4 mx-2 "
                  />
                  <p
                    className="text-white text-[12px] m-auto "
                    dangerouslySetInnerHTML={{
                      __html: gridItems[currentIndex].description,
                    }}
                  ></p>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="text-xl font-bold text-white bg-gray-700 p-4 rounded-full"
              >
                &gt;
              </button>
            </div>
          </div>
          
        )};

        {showItems && (
           <div className="bg-gradient-to-r from-pink-300 via-blue-300 to-blue-400 w-full items-center mt-16 py-5 rounded-3xl">
            <h2 className="text-2xl font-bold my-6 text-center ">Music For The Heart</h2>
            {MusicItems.map((musicItem) => (
              <div key={musicItem.id} className="bg-white border-2  rounded-3xl p-5 mb-8 flex mx-auto items-center w-[700px]">
                <div>
                  <Image
                    src={musicItem.img}
                    height={100}
                    width={100}
                    alt={musicItem.title}
                    className="rounded-xl mr-5"
                  />
                </div>
                <div className=" w-[200px] mr-5">
                  <h3 className="font-bold text-xl text-center ">{musicItem.title}</h3>
                  <div
                  className="description text-center text-sm"
                  dangerouslySetInnerHTML={{ __html: musicItem.Artist }}
                  ></div>
                </div>
                <div className="  relative ">
                  {/* Audio player */}
                  <audio controls >
                    <source src={musicItem.src} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
              </div>
          </div>
          ))}
         </div>

        )};





      </main>

      <footer className="bg-gradient-to-r from-pink-300 via-blue-300 to-blue-400 w-full rounded-3xl">
      {showItems && (
      <div className="flex pl-10 py-5 items-center">
        <a href="mailto:tshivhulafhulufhelo@gmail.com">
          <Image
          src={email}
          alt="No Image"
          width={20}
          height={20}
          className="mr-10"
          />
        </a>
        <a href="https://www.instagram.com/romeo_the_scientist/">
          <Image
          src={insta}
          alt="No Image"
          width={20}
          height={20}
          className="mr-10"
          />
        </a>
        <a href="www.linkedin.com/in/fhulufhelo-tshivhula-69a2a0246">
          <Image
          src={linked}
          alt="No Image"
          width={20}
          height={20}
          />
        </a>

      </div>
      )}
      </footer>
    </div>
  );
};

export default Home;
