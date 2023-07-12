import { useLocation, useNavigate } from "react-router-dom";

type RequestInputType = "text" | "date";
type RequestInputId = "name" | "birth";
type RequestInputTitle = "이름" | "생년월일";
type RequestType = {
  id: RequestInputId;
  title: RequestInputTitle;
  type: RequestInputType;
};

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
      const getWeather = async (longitude: number, latitude: number) => {
        const data = {
          serviceKey: "",
          pageNo: 1,
          numOfRows: 1000,
          dataType: "XML",
          base_date: `${year}+${month}+${day}`,
          base_time: "0600",
          nx: longitude,
          ny: latitude,
        };
        // const response = await fetch(
        //   `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0?` +
        //     new URLSearchParams(data)
        // );

        // console.log("response", response);
      };

      navigator.geolocation.getCurrentPosition(
        (location) => {
          getWeather(location.coords.longitude, location.coords.latitude);
          // location.coords.latitude / longitude
        },
        () => alert("오류가 발생했어요! 페이지에 다시 접속해주세요.")
      );

      // navigate("/select-options?q=1")
    }
  };

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
