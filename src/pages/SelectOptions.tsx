import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import sunnyImage from "../assets/sunny.jpg";
import cloudyImage from "../assets/cloudy.jpg";
import darkImage from "../assets/dark.jpg";

type QuestionSetType = {
  question: string;
  options: string[];
};

// type TestType = {
//   [key: string]: HTMLImageElement | undefined;
// };
export default function SelectOptions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const questionParams = Number(searchParams.get("q"));
  const questionIndex = Number(searchParams.get("q")) - 1;
  const bgImage = searchParams.get("sky") ?? "";
  const bgEffect = searchParams.get("rain") ?? "";

  const questionSet: QuestionSetType[] = [
    { question: "q1", options: ["1", "2", "3", "4"] },
    { question: "q2", options: ["12", "23", "34", "45"] },
    { question: "q3", options: ["134", "234", "334", "44"] },
  ];

  const imageMapping = {
    sunny: sunnyImage,
    cloudy: cloudyImage,
    dark: darkImage,
  };

  useEffect(() => {
    if (questionParams > 3 || questionParams < 1)
      navigate("/select-options?q=1", { replace: true });
  }, []);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (questionParams < 3)
      return navigate(`/select-options?q=${questionParams + 1}`);

    navigate("/result");
  };

  return (
    <>
      {questionParams <= 3 && questionParams >= 1 ? (
        <section>
          <img src={imageMapping[bgImage]} alt={bgImage} />
          <img src={bgEffect} alt={bgEffect} />
          <p></p>
          <form onSubmit={handleSubmit}>
            <h1>{questionSet[questionIndex].question}</h1>
            {questionSet[questionIndex].options.map((item, index) => (
              <label key={item}>
                <input
                  type="radio"
                  value={item}
                  name="select"
                  defaultChecked={index === 0}
                />
                {item}
              </label>
            ))}
            <div>
              <button type="submit">화살표</button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}
