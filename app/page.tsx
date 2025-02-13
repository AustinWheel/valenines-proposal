"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

export default function Home() {
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [currentSadGif, setCurrentSadGif] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const [currentImage, setCurrentImage] = useState(2);

  const handleNoClick = () => {
    const scaleOptions = [1, 0.75, 0.5, 0.25, 0]
    setCurrentSadGif(prev => prev + 1);
    setNoButtonScale(scaleOptions[currentSadGif]);
  };

  const totalImages = 15;

  const handlePrevImages = () => {
    setCurrentImage((prev) => (prev === 1 ? totalImages : prev - 1))
  };

  const handleNextImages = () => {
    setCurrentImage((prev) => (prev === totalImages ? 1 : prev + 1))
  };

  const handleTouchStart = (e: any) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImages();
    }
    if (isRightSwipe) {
      handlePrevImages();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (showSuccess) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-8">
        <ReactConfetti
          key={confettiKey}
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        />
        <div 
          className="relative w-full max-w-6xl h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex justify-center items-center">

            {/* Prev Image */}
            <div
              key={currentImage === 1 ? totalImages : currentImage - 1}
              className="relative aspect-[2/3] w-3/6 transform transition-all duration-300 ease-in-out hover:scale-105 -rotate-12 -mr-20 z-0 drop-shadow-[0_5px_10px_rgba(255,255,255,0.20)]"
              onClick={handlePrevImages}
            >
              <Image
                src={`/us${currentImage === 1 ? totalImages : currentImage - 1}.jpg`}
                alt={`Couple photo ${currentImage === 1 ? totalImages : currentImage - 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Middle Image */}
            <div
              key={currentImage}
              className="relative aspect-[2/3] w-2/3 transform transition-all duration-300 ease-in-out hover:scale-105 z-10 drop-shadow-[0_5px_10px_rgba(255,255,255,0.20)]"
            >
              <Image
                src={`/us${currentImage}.jpg`}
                alt={`Couple photo ${currentImage}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Next Image */}
            <div
              key={currentImage === totalImages ? 1 : currentImage + 1}
              className="relative aspect-[2/3] w-1/2 transform transition-all duration-300 ease-in-out hover:scale-105 rotate-12 -ml-20 z-0 drop-shadow-[0_5px_10px_rgba(255,255,255,0.20)]"
              onClick={handleNextImages}
            >
              <Image
                src={`/us${currentImage === totalImages ? 1 : currentImage + 1}.jpg`}
                alt={`Couple photo ${currentImage === totalImages ? 1 : currentImage + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        <h1 
          onClick={() => setConfettiKey(prev => prev + 1)}
          className="text-4xl font-bold text-center cursor-pointer hover:scale-105 transition-all"
          style={{
            WebkitTextStroke: '2px #ff69b4',
            color: 'white',
            textShadow: '0 0 10px #ff69b4'
          }}
        >
          💖 Yayyyy!!! 💖
        </h1>
        <p className="text-2xl font-semibold">I love you 宝宝</p>
        <p className="text-2xl font-semibold">我爱你宝宝</p>
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
          {[1, 2, 3].map((num) => (
            <div key={num} className="relative aspect-square w-full">
              <Image
                src={`/happy${num}.gif`}
                alt={`Happy gif ${num}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <div className="relative aspect-square w-full max-w-lg">
        <Image
          src={currentSadGif === 1 ? "/happy1.gif" : `/sad${currentSadGif - 1}.gif`}
          alt="Valentine gif"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h2 className="text-3xl text-white font-bold text-center">Will you be my valentine?</h2>
      <div className="flex gap-4">
        <button
          onClick={() => setShowSuccess(true)}
          className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all font-semibold text-lg"
        >
          Yes
        </button>
        {noButtonScale >= 0.25 && (
          <button
            onClick={handleNoClick}
            style={{ transform: `scale(${noButtonScale})` }}
            className="px-8 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all font-semibold text-lg"
          >
            No
          </button>
        )}
      </div>
    </div>
  );
}
