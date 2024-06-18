import { ChangeEvent, useState } from "react";
import "./App.css";
import { Heading } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { Skeleton, Stack } from "@chakra-ui/react";

const BASE_URL = "http://127.0.0.1:5000";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    let inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleRequest(): void {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/process`, { abstract: value })
      .then((response) => {
        const data = response.data.result;
        setResult(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Heading colorScheme="whiteAlpha">Skim Abstract</Heading>
      <Main>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Paste the abstract here"
          isRequired={true}
          size={"lg"}
        />
        <div className="button-group">
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            onClick={handleRequest}
          >
            Send
          </Button>
        </div>

        {isLoading ? (
          <div className="skeleton-wrapper">
            <Stack>
              <Skeleton height={"20px"} />
              <Skeleton height={"20px"} />
              <Skeleton height={"20px"} />
            </Stack>
          </div>
        ) : (
          <div className="result">
            <Text>{result}</Text>
          </div>
        )}
      </Main>
    </>
  );
}

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <main>{children}</main>;
}

export default App;
