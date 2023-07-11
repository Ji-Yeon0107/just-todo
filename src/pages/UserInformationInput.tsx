import { useLocation, useNavigate } from "react-router-dom";

type RequestInputType = "text" | "date";

type RequestType = {
  id: string;
  title: string;
  type: RequestInputType;
};

const requestList: Array<RequestType> = [
  { id: "name", title: "이름", type: "text" },
  { id: "birth", title: "생년월일", type: "date" },
];

const UserInformationInput = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const displayInfoByHref = (pathname: string): RequestType | undefined => {
    if (pathname === "/") return requestList[0];

    return requestList.find(({ id }) => `/${id}` === pathname);
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    // validation check
    if (pathname === "/") navigate("/birth");
    if (pathname === "/birth") navigate("/select-options");
  };

  return (
    <main>
      <section>
        <div>{displayInfoByHref(pathname)?.title}을 입력해주세요</div>
        <form onSubmit={handleSubmit}>
          <input type={displayInfoByHref(pathname)?.type} />
          <button type="submit">화살표</button>
        </form>
      </section>
    </main>
  );
};

export default UserInformationInput;
