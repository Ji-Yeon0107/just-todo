import { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type RequestInputType = "text" | "date";
type RequestInputId = "name" | "birth";
type RequestInputTitle = "이름" | "생년월일";
type RequestType = {
  id: RequestInputId;
  title: RequestInputTitle;
  type: RequestInputType;
};
type WeatherType = {
  sky: string;
  rain: string;
} | null;

const requestList: Array<RequestType> = [
  { id: "name", title: "이름", type: "text" },
  { id: "birth", title: "생년월일", type: "date" },
];

const UserInformationInput = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const userInfo = {
    name: window.localStorage.getItem("name"),
    birth: window.localStorage.getItem("birth"),
  };

  const today = new Date();
  const year = today.getFullYear().toString().padStart(4, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const [weather, setWeather] = useState<WeatherType>(null);

  useEffect(() => {
    console.log(`It's Working!`);
    decodeWeatherCodeToImage();
  }, [weather]);

  const decodeWeatherCodeToImage = useCallback(() => {
    if (!weather) return;
    let imageName = "sunny";
    let effectName = "none";

    switch (weather?.sky) {
      case "1":
        imageName = "sunny";
        break;
      case "3":
        imageName = "cloudy";
        break;
      case "4":
        imageName = "dark";
        break;
    }
    switch (weather?.rain) {
      case "1":
        effectName = "rainy";
        break;
      case "3":
        effectName = "snowy";
        break;
    }

    navigate(`/select-options?q=1&sky=${imageName}&rain=${effectName}`);
  }, [weather]);

  const displayInfoByHref = (pathname: string): RequestType => {
    if (pathname === "/") return requestList[0];

    return (
      requestList.find(({ id }) => `/${id}` === pathname) ?? {
        id: "name",
        title: "이름",
        type: "text",
      }
    );
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      birth: { value: string };
    };

    const id = displayInfoByHref(pathname).id;
    window.localStorage.setItem(id, target[id].value);

    if (pathname === "/") navigate("/birth");
    if (pathname === "/birth") {
      const getWeather = async (latitude: number, longitude: number) => {
        const data = new URLSearchParams();
        // const serviceKey = process.env.REACT_APP_WEATHER_SERVICE_KEY;

        data.append(
          "serviceKey",
          "O42VRlwxKQ3QnfPv1MxTtg6XIHKtGPSeSIK808z6IwKAzHD//RS34Ti5eDG3Gc7R7qAFcRA/tJYz6WEvQ1Y6Gg=="
        );
        data.append("pageNo", "1");
        data.append("base_date", `${year}${month}${day}`);
        data.append("base_time", "0800");
        data.append("dataType", "JSON");
        data.append("nx", Math.round(latitude).toString());
        data.append("ny", Math.round(longitude).toString());

        await fetch(
          `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?` +
            data
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const skyCode = data.response.body.items.item?.find(
              ({ category }: { category: string }) => category === "SKY"
            );
            const rainCode = data.response.body.items.item?.find(
              ({ category }: { category: string }) => category === "PTY"
            );

            setWeather(() => ({
              sky: skyCode?.fcstValue,
              rain: rainCode?.fcstValue,
            }));
          })
          .catch((e) => console.error(e));
      };

      navigator.geolocation.getCurrentPosition(
        (location) => {
          getWeather(location.coords.latitude, location.coords.longitude);
          e;
        },
        () => alert("오류가 발생했어요! 페이지에 다시 접속해주세요.")
      );
    }
  };
  console.log("weather", weather);
  return (
    <main>
      <section>
        <div>{displayInfoByHref(pathname)?.title}을 입력해주세요</div>
        <form onSubmit={handleSubmit}>
          <input
            type={displayInfoByHref(pathname).type}
            name={displayInfoByHref(pathname).id}
            defaultValue={userInfo[displayInfoByHref(pathname)?.id] ?? ""}
            required
            // type이 date일 때
            min={"1920-01-01"}
            max={formattedDate}
            // type이 text일 때
            minLength={2}
            maxLength={12}
            pattern="^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]+"
          />
          <button type="submit">화살표</button>
        </form>
      </section>
    </main>
  );
};

export default UserInformationInput;
