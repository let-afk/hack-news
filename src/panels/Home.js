import { Button, Panel } from "@vkontakte/vkui";
import { News } from "./News";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Home = ({ id }) => {
  return <Panel id={id}>{<News></News>}</Panel>;
};
