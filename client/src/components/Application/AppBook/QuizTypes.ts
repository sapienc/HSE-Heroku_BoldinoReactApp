// ---------- [СТРУКТУРЫ ДАННЫХ ВИКТОРИНЫ] ----------
export type MainPageQuizzes = {
    id: number | string,
    quizName: string,
    quizImgUrl?: string
};

// ---- Кнопка
export type AnswerType = {
    btnID: number, // answerID
    btnContent: string, // answerContent
    visibility?: boolean
}

// ---- Набор кнопок
export interface IAnswerButtons extends Array<AnswerType> {}

// ---- Содержание вопроса
export type QuizContentType = {
    questionID: number,
    questionMainPart: string,
    questionContent?: string,
    questionImgPath?: string,
    questionVisibility: boolean,
    // questionAnswers: [AnswerType, AnswerType, AnswerType, AnswerType],
    questionAnswers: IAnswerButtons,
    questionRightAnswerID: number,
    questionRightAnswerDescription?: string,
}

// ---- Данные о всей викторине в целом
export interface IQuizData {
    id: number,
    quizType: number,
    quizCreatorID: number,
    quizName: string,
    quizContent: Array<QuizContentType>,
    quizVisible: boolean,
    quizInvisibleReason?: string,
    createdAt?: string,
    updatedAt?: string
}

// ---- Ленточка
export type TapeDataType = {
    heading: string,
    img?: string,
    tapeOne: string,
    tapeTwo: string
    socialShown?: boolean,
    tapeMini?: boolean
}

// ---- Состояние игры
export type GameDataType = {
    gameStarted: boolean,
    gameFinished: boolean,
    gameResultMode: boolean
}

export type ProgressDataType = {
    currentQuizID: number,
    currentQuestionID: number,
    currentScoresAmount: number,
    userAnswered: boolean,
    currentUserAnswerID: number,
    currentUserAnswerCorrect: boolean
}


// ---- Состояние Image Viewer'а
export type ImageViewerType = {
    photoIndex: number,
    isOpen: boolean,
}