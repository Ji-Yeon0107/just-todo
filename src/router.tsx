import UserInformationInput from "pages/UserInformationInput";
import SelectOptions from "pages/SelectOptions";
import Result from "Result";

export const router = [
  {
    path: "/",
    index: true,
    element: <UserInformationInput />,
  },
  {
    path: "/birth",
    element: <UserInformationInput />,
  },
  {
    path: "/select-options",
    element: <SelectOptions />,
  },
  {
    path: "/result",
    element: <Result />,
  },
];
