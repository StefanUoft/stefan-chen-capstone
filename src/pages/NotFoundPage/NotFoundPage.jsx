import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

function NotFoundPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="not-found__container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>You will be redirected to the home page in {timeLeft} seconds.</p>
    </div>
  );
}

export default NotFoundPage;
