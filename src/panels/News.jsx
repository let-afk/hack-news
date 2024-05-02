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
} from "@vkontakte/vkui";
import React, { useState, useEffect } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const baseUrl = "https://hacker-news.firebaseio.com/v0";
export const newStories = `${baseUrl}/newstories.json`;
export const itemUrl = `${baseUrl}/item/`;

export const News = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [news, setNews] = useState([]);
  const [newsLoaded, setNewsLoaded] = useState(false);

  const fetchNews = () => {
    setNewsLoaded(false);
    fetch(newStories)
      .then((response) => response.json())
      .then((data) => {
        const newsIds = data.slice(0, 100);
        Promise.all(
          newsIds.map((id) =>
            fetch(`${itemUrl}${id}.json`).then((response) => response.json())
          )
        ).then((newsData) => {
          console.log(newsData);
          setNews(newsData);
          setNewsLoaded(true);
        });
        console.log(news);
      });
  };

  const getDate = (time) => {
    let moment = new Date(time * 1000);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    let date = moment.toLocaleDateString("ru-RU", options);

    return date;
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(() => {
      fetchNews();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Panel id={id}>
      <Group header={<Header>Новости</Header>}>
        <Button onClick={() => fetchNews()} className="refresh">
          Обновить
        </Button>
        {newsLoaded ? (
          <List>
            {news.map((item) => (
              <Group
                key={item.id}
                onClick={() => routeNavigator.push(`/new/${item.id}`)}
              >
                <SimpleCell
                  Component="label"
                  after={<Div>{getDate(item.time)}</Div>}
                  before={<Div>{"Автор: " + item.by}</Div>}
                >
                  <Header subtitle={`Рейтинг: ${item.score}`}>
                    {item.title}
                  </Header>
                </SimpleCell>
              </Group>
            ))}
          </List>
        ) : (
          <Spinner size="large"></Spinner>
        )}
      </Group>
    </Panel>
  );
};
