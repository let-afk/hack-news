import {
  Spinner,
  List,
  SimpleCell,
  Group,
  Header,
  Button,
  Footer,
  Div,
  Panel,
  Link,
} from "@vkontakte/vkui";
import React, { useState, useEffect } from "react";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import "./Messages";
import { Messages } from "./Messages";

export const baseUrl = "https://hacker-news.firebaseio.com/v0";
export const newStories = `${baseUrl}/newstories.json`;
export const itemUrl = `${baseUrl}/item/`;

export const New = ({ id }) => {
  const newId = useParams().id;
  const routeNavigator = useRouteNavigator();
  const [newVal, setNewVal] = useState({});
  const [newLoaded, setNewLoaded] = useState(false);

  const fetchNew = () => {
    setNewLoaded(false);
    fetch(`${itemUrl}${newId}.json`)
      .then((response) => response.json())
      .then((newData) => {
        console.log(newData);
        setNewVal(newData);
        setNewLoaded(true);
      });
  };

  useEffect(() => {
    fetchNew();
  }, []);

  return (
    <Panel id={id}>
      {newLoaded ? (
        <Group>
          <Group>
            <Header
              subtitle={
                <Link href={newVal.url} target="_blank">
                  {"Ссылка на новость"}
                </Link>
              }
            >
              {newVal.title}
            </Header>
            <Button onClick={() => routeNavigator.back()} className="refresh">
              Назад
            </Button>
            <Div>{"Автор: " + newVal.by}</Div>
          </Group>
          <Group>
            <Messages></Messages>
          </Group>
        </Group>
      ) : (
        <Spinner size="large"></Spinner>
      )}
    </Panel>
  );
};
