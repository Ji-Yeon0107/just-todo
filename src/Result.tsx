import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const userName = window.localStorage.getItem("name");
  const userBirth = window.localStorage.getItem("birth");
  useEffect(() => {
    if (!userName) navigate("/", { replace: true });
  }, []);

  const handleClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    // TODO: validation check

    const confirmed = confirm("이름과 생년월일을 다시 입력하시겠어요?");

    if (confirmed) {
      navigate(`/?name=${userName}&birth=${userBirth}`);
    } else {
      navigate(`/select-options`);
    }
  };

  return (
    <section>
      <h1>지금 {userName}에게 해주고 싶은 말은 </h1>
      <div>
        <div>
          미친것이란, 똑같은 행동을 반복하면서 다른 결과를 기대하는 것이다.
        </div>
        <div>Albert Einstein</div>
      </div>
      <div>
        <button onClick={handleClick}>한번 더</button>
      </div>
    </section>
  );
}
