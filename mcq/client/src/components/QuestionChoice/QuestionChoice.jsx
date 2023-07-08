import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Box,
  Text,
  Container,
  Button,
  colorScheme,
  Center,
} from "@chakra-ui/react";
function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    fetch("http://localhost:8000/api/generate/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.error("Error:", error);
        setQuestions([]);
      });
  };

  const handleAnswerSelect = (questionId, selectedChoice) => {
    const answer = { question_id: questionId, selected_choice: selectedChoice };
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);

    const question = questions.find((q) => q.id === questionId);
    const isCorrect = selectedChoice === question.correct_choice;

    if (isCorrect) {
      console.log("Correct answer!");

      alert("Corect Answer");
    } else {
      alert("Wrong Answer");
    }
  };

  const submitAnswers = () => {
    fetch("http://localhost:8000/api/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_answers: userAnswers }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setScore(data.score);
        setShowResult(true);
      })
      

      .catch((error) => {
        console.error("Error:", error);
        setScore(0);
        setShowResult(true);
      });
  };
  const startQuiz = () => {
    setQuizStarted(true);
  };
  
  

  return (
    <div className="">
      {!quizStarted ? (
        <Box mt={10}  height ="60vh" display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Container mt={10}>
            <Card backgroundColor={"lightblue"}>
              <CardHeader>
                <Heading size="md" fontSize={"3xl"} mt={5} >
                  Quiz
                </Heading>
              </CardHeader>
              <CardBody>
                <Button
                  width={"full"}
                  colorScheme="blue"
                  onClick={startQuiz}
                >
                  Start
                </Button>
              </CardBody>
            </Card>
          </Container>
        </Box>

      ): showResult ? (
        <Box mt={10}>
          {/* <Heading mt={5}></Heading> */}

          <Container mt={10}>
            <Card>
              <CardHeader>
                <Heading size="md" fontSize={"3xl"} textAlign="center" mt={5}>
                  Result 
                </Heading>
              </CardHeader>

              <CardBody>
                <Text fontSize={"2xl"}>
                  {" "}
                  Correct Answers: {score} / {questions.length}
                </Text>
                {score === questions.length ? (
                <Text fontSize={"2xl"} color="green">
                  Cheers! You got all the answers correct!
                </Text>
              ) : (
                <Text fontSize={"2xl"} color="red">
                  Oops! Better luck next time
                </Text>
              )}
            
              </CardBody>
            </Card>
          </Container>
        </Box>
      ) : (
        <Box>
          {questions.map((question) => (
            <Container key={question.id} >
              <Card mt={10}  mb={10} >
                <CardHeader>
                  <Heading size="md">{question.question_text}</Heading>
                </CardHeader>

                <CardBody>
                  <Flex
                    align={"center"}
                    justifyContent={"space-between"}
                    spacing="4"
                  >
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice1)
                        }
                        colorScheme={
                          userAnswers.find(
                            (answer) =>
                              answer.question_id === question.id &&
                              answer.selected_choice === question.choice1
                          )
                            ? question.correct_choice === question.choice1
                              ? "green"
                              : "red"
                            : undefined
                        }
  
                      > 
        
                        1. {question.choice1}
                      </Button>
                    </Box>
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice2)
                        }
                        colorScheme={
                          userAnswers.find(
                            (answer) =>
                              answer.question_id === question.id &&
                              answer.selected_choice === question.choice2
                          )
                            ? question.correct_choice === question.choice2
                              ? "green"
                              : "red"
                            : undefined
                        }
                      >
                        2. {question.choice2}
                      </Button>
                    </Box>
                  </Flex>
                  <Flex
                    align={"center"}
                    justifyContent={"space-between"}
                    spacing="4"
                  >
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice3)
                        }
                        colorScheme={
                          userAnswers.find(
                            (answer) =>
                              answer.question_id === question.id &&
                              answer.selected_choice === question.choice3
                          )
                            ? question.correct_choice === question.choice3
                              ? "green"
                              : "red"
                            : undefined
                        }
                      >
                        3. {question.choice3}
                      </Button>
                    </Box>
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice4)
                        }
                        colorScheme={
                          userAnswers.find(
                            (answer) =>
                              answer.question_id === question.id &&
                              answer.selected_choice === question.choice4
                          )
                            ? question.correct_choice === question.choice4
                              ? "green"
                              : "red"
                            : undefined
                        }
                      >
                        4. {question.choice4}
                      </Button>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Container>
          ))}
          <Container mb={20}>
            <Button width={"full"} colorScheme="blue" onClick={submitAnswers}>
              Submit
            </Button>
          </Container>
        </Box>
      )}
    </div>
  );
}

export default App;
