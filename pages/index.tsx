import { AppProps } from "next/dist/shared/lib/router/router";
import {
  Button,
  Container,
  Divider,
  Form,
  FormGroup,
  FormInput,
  Header,
  HeaderContent,
  Image,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { Fetcher } from "../utils/Fetcher";
import prisma from "../lib/prisma";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const initialUsers = await prisma.users.findMany();

  return {
    props: {
      initialUsers,
    },
  };
}

export default function Home({ initialUsers }: AppProps) {


  const [Users, setUsers] = useState<Prisma.usersUncheckedCreateInput[]>(initialUsers);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState();
  const [Avatar, setAvatar] = useState("");

  return (
    <>
      <Container className={styles.container}>
        <Header as={"h1"}>This is a user create/delete app</Header>
        <Form
          onSubmit={async () => {
            const body: Prisma.usersCreateInput = {
              FirstName,
              LastName,
              Email,
              Age: Number(Age),
              Avatar
            };

            await Fetcher("/api/create", { user: body });
            await setUsers([...Users,body]);
            setFirstName("");
            setLastName("");
            setEmail("");
            setAge(undefined);
            setAvatar("");
          }}
        >
          <FormGroup widths="equal">
            <FormInput
              label="your first name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              label="your last name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormInput
              label="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              label="How old are you?"
              type="number"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
            <FormInput
              label="Avatar URL"
              
              value={Avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Save the user</Button>
        </Form>

        <Divider horizontal>Display Users</Divider>
        <Table celled>
          <TableHeader>
            <TableHeaderCell>Full Name</TableHeaderCell>
            <TableHeaderCell>Eamil adress</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableHeader>

          <TableBody>
            {Users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Header image>
                    <Image src={user.Avatar} size="mini" alt="" />
                  {user.FirstName + " " + user.LastName}
                  <Header.Subheader>
                  age: {user.Age}
                  </Header.Subheader>
                  </Header>
                  </TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>
                  <Button
                  onClick={async () => {
                  await Fetcher("/api/delete", {id: user.id});
                  await setUsers(Users.filter(u => u.id !== user.id))
                  }}
                  >Delete the user</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}
