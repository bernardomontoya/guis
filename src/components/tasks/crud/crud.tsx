import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../../shared/input/input";
import Button from "../../shared/button/button";
import { Title, Subtitle } from "../../shared/text/styles";
import { Container, Wrapper } from "../../shared/container/styles";
import { List } from "./styles";

type user = {
  id?: string;
  name: string;
  surname: string;
  type?: string;
};

const initialUsersList: user[] = [
  {
    id: uuidv4(),
    name: "George",
    surname: "Lucas",
  },
  {
    id: uuidv4(),
    name: "Johnny",
    surname: "Cash",
  },
  {
    id: uuidv4(),
    name: "Billy",
    surname: "Corgan",
  },
];

const CRUD = () => {
  useEffect(() => {
    console.log("rendered CRUD");
  });

  const [search, setSearch] = useState<string>("");
  const [userList, setUserList] = useState(initialUsersList);
  const [activeUser, setActiveUser] = useState<user>({
    id: "",
    name: "",
    surname: "",
    type: "",
  });

  const editing = activeUser.type === "edit";
  const creating =
    activeUser.type === "create" &&
    activeUser.id === "" &&
    activeUser.name !== "" &&
    activeUser.surname !== "";
  const filteredUserList = userList.filter((user) => {
    if (user.surname.toLowerCase().startsWith(search)) {
      return true;
    }
    return false;
  });
  const listToDisplay = search ? filteredUserList : userList;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "surname"
  ) => {
    const value = e.target.value;
    setActiveUser({
      ...activeUser,
      [field]: value,
      type: editing ? "edit" : "create",
      id: editing ? activeUser.id : "",
    });
  };

  const clearActiveUser = () => {
    setActiveUser({ id: "", name: "", surname: "", type: "" });
  };

  const handleFormAction = (action: string) => {
    const { name, surname, id } = activeUser;
    switch (action) {
      case "save":
        setUserList((currentUserList) => {
          const newUserList = currentUserList.concat({
            name,
            surname,
            id: uuidv4(),
          });
          return newUserList;
        });
        clearActiveUser();
        break;
      case "edit":
        setUserList((currentUserList) => {
          const newUserList = currentUserList.map((user: user) => {
            if (user.id === id) {
              return { ...user, name, surname };
            }
            return user;
          });
          return newUserList;
        });
        clearActiveUser();
        break;
      case "delete":
        setUserList(userList.filter((user) => user.id !== id));
        clearActiveUser();
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Title>CRUD</Title>
      <Subtitle>Add, edit or remove users from the list</Subtitle>
      <form>
        <Wrapper direction="row" bottom="small" align="start">
          <Wrapper direction="column" align="start" right="small">
            <Wrapper direction="column" bottom="small">
              <Input
                label="Filter prefix"
                placeholder="Hans"
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Wrapper>
            <List>
              {listToDisplay.map((user) => (
                <span
                  onClick={() => {
                    const alreadySelected = activeUser.id === user.id;
                    setActiveUser({
                      id: alreadySelected ? "" : user.id,
                      name: alreadySelected ? "" : user.name,
                      surname: alreadySelected ? "" : user.surname,
                      type: alreadySelected ? "" : "edit",
                    });
                  }}
                  key={user.id}
                >{`${user.surname}, ${user.name}`}</span>
              ))}
            </List>
          </Wrapper>
          <div>
            <Wrapper direction="column" bottom="small">
              <Input
                label="Name"
                placeholder="John"
                type="text"
                value={activeUser.name}
                onChange={(e) => {
                  handleInputChange(e, "name");
                }}
              />
            </Wrapper>
            <Wrapper direction="column" bottom="small">
              <Input
                label="Surname"
                placeholder="Smith"
                type="text"
                value={activeUser.surname}
                onChange={(e) => {
                  handleInputChange(e, "surname");
                }}
              />
            </Wrapper>
          </div>
        </Wrapper>
        <Wrapper>
          <Button
            text="Create"
            type="button"
            disabled={editing || !creating}
            onClick={() => {
              handleFormAction("save");
            }}
            right="small"
          />
          <Button
            text="Update"
            type="button"
            disabled={!editing}
            onClick={() => {
              handleFormAction("edit");
            }}
            right="small"
          />
          <Button
            text="Delete"
            type="button"
            disabled={!editing}
            onClick={() => {
              handleFormAction("delete");
            }}
          />
        </Wrapper>
      </form>
    </Container>
  );
};

export default CRUD;
