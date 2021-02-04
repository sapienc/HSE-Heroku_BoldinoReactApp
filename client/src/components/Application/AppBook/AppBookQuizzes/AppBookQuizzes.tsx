import { useHistory } from "react-router-dom";
import QuizPages from "shared/components/QuizPages"
import {IAnswerButtons} from "components/Application/AppBook/QuizTypes"

// type QuizzesPageProps = {
//     btnsArray: IAnswerButtons
// }

export const AppBookQuizzes = () => {
    
    let history = useHistory();
    const redirectFunc = (quizID: number | string) => {
        history.push("/quiz/" + quizID);
    }
    const redirectToMain = () => {
        history.push("/");
    }

    const mockDataArray: IAnswerButtons = [ // должно быть строго 2 элемента
        {
            btnID: 3,
            btnContent: 'Самый первый тест!',
        },
        {
            btnID: 4,
            btnContent: 'Архивный тест, успейте пройти!',
        }
    ]

    return (
        <div className="content">
            <QuizPages
                actionFunc={redirectFunc}
                btnsArray={mockDataArray}
                arrowBtnFunc={redirectToMain}
                // arrowBtnFuncType={'redirect'}
                pageFlex={true}
            ></QuizPages>
        </div>
    )
}