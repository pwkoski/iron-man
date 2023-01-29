import QAList from './QAList.jsx';
import SearchComponent from './Searchqa.jsx';
import {useState} from 'react';
import axios from 'axios';
import {token} from '/config.js';

const QAIndex = () => {

  const [questionId, setQuestionId] = useState([37316])
  const [qaData, setQaData] = useState([])
  // inital state for how many questions show on the DOM
  const [questionsToShow, setQuestionsToShow] = useState(2)
  // inital state for add new question form
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false)


  function handleSearch() {
    // console.log(`sending request to server and token is ${token}`);

    $.ajax({
      type: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/?product_id=${questionId}`,
      headers: {
          'Authorization': `${token}`,
      },
      success: function (response) {
          // console.log("res from API looks like: ", response.results)
          setQaData(response.results)
      },
      error: function (error) {
          console.log(error);
      }
  });

  }
  // handle the show more questions func
  function showMoreQuestions() {
    setQuestionsToShow(questionsToShow + 2);
  }

  // handle the func to add new questions
  function addNewQuestion() {
    setIsAddingNewQuestion(true);
  }


  return (
    <div>
      <h2>QUESTIONS & ANSWERS</h2>
      <SearchComponent handleSearch={handleSearch}/>
      <QAList qaData={qaData} questionsToShow={questionsToShow}/>
      <button onClick={showMoreQuestions}>MORE ANSWERED QUESTIONS</button>
      <button onClick={addNewQuestion}>ADD A QUESTION +</button>
      {isAddingNewQuestion && <NewQuestionForm />}

    </div>
  )
}

export default QAIndex;
