"use client"
import React, { useState, useEffect } from 'react';

type IProps = {
  minute: number;
  startTime: Date;
}
export const Countdown = ({ minute, startTime }: IProps) => {
  const [timeRemaining, setTimeRemaining] = useState(`00:${minute}:00`);

  useEffect(() => {

    const timerInterval = setInterval(() => {
      const start = new Date(startTime);
      const endTime = new Date(start.getTime() + minute * 60000);

      const timeDiff = endTime.getTime() - new Date().getTime();


      if (timeDiff <= 0) {
        setTimeRemaining('00:00:00');
        clearInterval(timerInterval);
      } else {
        const minutes = String(Math.floor((timeDiff / 1000 / 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');
        setTimeRemaining(`00:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  });

  return (
    <span>
      {timeRemaining}
    </span>
  );
};
