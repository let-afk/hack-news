import {
  Button,
  Div,
  Group,
  Input,
  List,
  SimpleCell,
  Header,
} from "@vkontakte/vkui";
import React, { useState } from "react";

export const Messages = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [cntMessage, setCntMessage] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessages = [...messages, inputValue];
      setMessages(newMessages);
      setInputValue("");
      setCntMessage((cntMessage) => cntMessage + 1);
    }
  };

  return (
    <Div>
      <Header>Всего сообщений: {cntMessage}</Header>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите сообщение"
      />
      <Button onClick={handleAddMessage}>Добавить сообщение</Button>
      <List>
        {messages.map((message, index) => (
          <Group key={index}>
            <SimpleCell>{message}</SimpleCell>
          </Group>
        ))}
      </List>
    </Div>
  );
};
