import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { QuizPages } from '../../../../shared/components/QuizPages';
import { IAnswerButtons, IQuizData, TapeDataType, GameDataType, ProgressDataType, ImageViewerType } from '../QuizTypes';

import classNames from 'classnames';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import LinkButton from '../../../../shared/components/LinkButton';
import { changeHeading } from '../../../../redux/actions/ui/uiActions';

import './AppBookQuiz.css';
import IMG_BTN_DOWN from '../../../../assets/images/buttons/button_down.png';
import IMG_VK_ICON from '../../../../assets/images/icons/social_vk_icon.png';
import IMG_OK_ICON from '../../../../assets/images/icons/social_ok_icon.png';
import IMG_FB_ICON from '../../../../assets/images/icons/social_fb_icon.png';

export const AppBookQuiz = () => {

    // ========== [DEFAULT STATE VALUES] ==========
    const DEFAULT_TAPE_STATE: TapeDataType = {
        heading: 'Здравствуй!',
        img: '',
        tapeOne: 'Проверим Ваши знания?',
        tapeTwo: 'Сыграем в викторину и выясним насколько хорошо Вы знакомы с материалом?',
        socialShown: false,
        tapeMini: false
    };
    const DEFAULT_TAPE_STATE_NO_ACCESS: TapeDataType = {
        heading: 'Извините!',
        img: '',
        tapeOne: 'Данная викторина временно недоступна.',
        tapeTwo: '',
        socialShown: false,
        tapeMini: false
    };
    const DEFAULT_TAPE_STATE_RESULT: TapeDataType = {
        heading: 'Результат',
        img: '',
        tapeOne: '',
        tapeTwo: '',
        socialShown: true,
        tapeMini: false
    }
    const DEFAULT_ANSWER_BUTTONS_STATE: IAnswerButtons = [] as IAnswerButtons;
    const DEFAULT_GAME_STATE: GameDataType = {
        gameFinished: false,
        gameStarted: false,
        gameResultMode: false
    };
    const DEFAULT_PROGRESS_STATE: ProgressDataType = {
        currentQuizID: -1,
        currentQuestionID: 0,
        currentScoresAmount: 0,
        userAnswered: false,
        currentUserAnswerID: -1,
        currentUserAnswerCorrect: false
    };
    const _TEMP_DEFAULT_QUESTIONS_WEIGHT = 5;

    

    // ========== [QUIZ DATA] ==========
    const [ quizInfo, setQuizInfo ] = useState({} as IQuizData);

    // ========== [UI] ==========
    const [ tapeState, updateTapeState ] = useState<TapeDataType>( DEFAULT_TAPE_STATE );
    const [ answerBtnsState, updateAnswerBtnsState ] = useState<IAnswerButtons>( DEFAULT_ANSWER_BUTTONS_STATE );
    const [ picState, updatePicState ] = useState<ImageViewerType>({photoIndex: 0, isOpen: false});
    // ========== [GAME] ==========
    const [ gameState, updateGameState ] = useState<GameDataType>( DEFAULT_GAME_STATE );
    const [ userProgressState, updateUserProgressState ] = useState<ProgressDataType>( DEFAULT_PROGRESS_STATE );

    // .................... [GETTING DATA] ....................
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(changeHeading(false));

        const mockData: IQuizData = 
        {
            id: 3,
            quizType: 1,
            quizCreatorID: 2,
            quizName: 'Вопросы по еще другим произведениям',
            quizContent: [
                {
                    questionID: 1,
                    questionMainPart: "Суть 1",
                    questionContent: "Описание 1",
                    questionImgPath: "/logo512.png",
                    questionVisibility: true,
                    questionAnswers: [
                        {
                            btnID: 1,
                            btnContent: "Содержимое номер один"
                        },
                        {
                            btnID: 2,
                            btnContent: "Содержимое номер два"
                        },
                        {
                            btnID: 3,
                            btnContent: "Содержимое номер три"
                        },
                        {
                            btnID: 4,
                            btnContent: "Содержимое номер четыре"
                        }
                    ],
                    questionRightAnswerID: 3,
                    questionRightAnswerDescription: "Description 1"
                },
                {
                    questionID: 2,
                    questionMainPart: "Суть номер два 2",
                    questionContent: "Описание номер два 2",
                    questionImgPath: "",
                    questionVisibility: true,
                    questionAnswers: [
                        {
                            btnID: 1,
                            btnContent: "Ответ номер один"
                        },
                        {
                            btnID: 2,
                            btnContent: "Ответ номер два"
                        },
                        {
                            btnID: 3,
                            btnContent: "Ответ номер три"
                        },
                        {
                            btnID: 4,
                            btnContent: "Ответ номер четыре"
                        }
                    ],
                    questionRightAnswerID: 1,
                    questionRightAnswerDescription: "Тут должно быть пояснение 2"
                },
                {
                    questionID: 3,
                    questionMainPart: "Суть номер три 3",
                    questionContent: "Описание номер три 3",
                    questionImgPath: "",
                    questionVisibility: true,
                    questionAnswers: [
                        {
                            btnID: 1,
                            btnContent: "Ответ номер один 3"
                        },
                        {
                            btnID: 2,
                            btnContent: "Ответ номер два 3"
                        },
                        {
                            btnID: 3,
                            btnContent: "Ответ номер три 3"
                        },
                        {
                            btnID: 4,
                            btnContent: "Ответ номер четыре 3"
                        }
                    ],
                    questionRightAnswerID: 2,
                    questionRightAnswerDescription: ""
                }
            ],
            quizVisible: true,
            quizInvisibleReason: '',
            createdAt: '2021-01-13 02:27:49.962+03',
            updatedAt: '2021-01-13 02:27:49.962+03'
        };

        setQuizInfo(mockData);
    }, []);
    
    // .................... [ON DATA CHANGE] ....................
    useEffect(() => {
        if(!quizInfo.quizVisible) {
            const reasonWhy = { tapeTwo: (quizInfo.quizInvisibleReason) ? "Причина: " + quizInfo.quizInvisibleReason : "" };
            updateTapeState( {...DEFAULT_TAPE_STATE_NO_ACCESS, ...reasonWhy} );
            updateGameState( (prevState) => ({ ...prevState, gameFinished: true }) );
        }
        else {
            updateTapeState( DEFAULT_TAPE_STATE );
            updateGameState( (prevState) => ({ ...prevState, gameFinished: false }) );
        }
    }, [quizInfo]);

    
    // useEffect( () => {
    //     console.log("CURRENT USER_PROGRESS_STAE:", userProgressState);
    // }, [userProgressState] )

    // useEffect( () => {
    //     console.log("CURRENT TAPE_STATE:", tapeState);
    // }, [tapeState] )
    
    // useEffect( () => {
    //     console.log("CURRENT GAME_STATE:", gameState);
    // }, [gameState] )
    
    // useEffect( () => {
    //     console.log("CURRENT ANSWER_BTNS_STATE:", answerBtnsState);
    // }, [answerBtnsState] )


    // =============== [Склонение слов по числу] ===============
    const getTextByNum = (num: number, textFormsArr: [string, string, string] = ['балл', 'балла', 'баллов']): string => {
        num = Math.abs(num) % 100;
        const num_1 = num % 10;
        if (num_1 === 1) return textFormsArr[0]; // ед.число, например: балл
        if (num_1 > 1 && num_1 < 5) return textFormsArr[1]; // мн.число, например балла
        if (num > 10 && num < 20) return textFormsArr[2]; // мн.число, например баллов
        return textFormsArr[2]; // в любом случае: "баллов"
    }
    // =============== [Получение текста для количества баллов] ===============
    const getPointsText = (amount: number):string => {
        return getTextByNum(amount);
    }
    // =============== [Заполнение кнопок с вариантами ответов] ===============
    const fillAnswerButtons = (answersObj: IAnswerButtons): void => {
        // if(answerBtnsState.length == 0)
        updateAnswerBtnsState([...answersObj]);
    }
    // =============== [Очистка кнопок с вариантами ответов] ===============
    const clearAnswerButtons = (): void => {
        console.log("answerBtnsState:", answerBtnsState);
        updateAnswerBtnsState([]);
    }
    // =============== [Показ ленточки во всю длину] ===============
    const showTape = () => {
        updateTapeState( (prevState) => ({...prevState, tapeMini: false}) );
    }
    // =============== [Показ мини ленточки] ===============
    const hideTape = () => {
        updateTapeState( (prevState) => ({...prevState, tapeMini: true}) );
    }
    // =============== [Получить ID правильного ответа] ===============
    const isGivenAnswerRight = (givenAnswerID: number): boolean => {
        return givenAnswerID === getQuizRightAnswerID();
    }
    // =============== [Получить ID правильного ответа] ===============
    const getQuizRightAnswerID = (givenQuestionID?: number): number => {
        // если givenQuestionID не передан, значит берем вопрос который задан пользователю сейчас, иначе тот, что передали в эту функцию
        let questionID = givenQuestionID || userProgressState.currentQuestionID - 1;
        let chosenQuestion = quizInfo.quizContent[questionID]
        let rightAnswerID = chosenQuestion.questionRightAnswerID;
        return rightAnswerID;
    }
    // =============== [Получить наименование варианта правильного ответа] ===============
    const getQuizRightAnswerContent = (givenQuestionID?: number): string => {
        // айди вопроса либо берем с функции, либо берем текущий из стейта
        let questionID = givenQuestionID || (userProgressState.currentQuestionID - 1); // -1, т.к изначально вначале игры мы увеличиваем счетчик текущего вопроса на 1 и везде нужно минусовать еденицу чтобы получать актуальный текущий вопрос
        let rightAnswerID = getQuizRightAnswerID(questionID);
        return quizInfo.quizContent[questionID].questionAnswers[rightAnswerID - 1].btnContent;
    }
    // =============== [Получить описание пояснения правильного ответа] ===============
    const getQuizRightAnswerDescription = (givenQuestionID?: number): string | undefined => {
        // айди вопроса либо берем с функции, либо берем текущий из стейта
        let questionID = givenQuestionID || (userProgressState.currentQuestionID - 1);
        return quizInfo.quizContent[questionID].questionRightAnswerDescription;
    }
    // =============== [Получить описание пояснения правильного ответа] ===============
    // const updateTape = (givenTapeInfo?: TapeDataType): void => {
    //     let updatedTapeInfo = givenTapeInfo || {
    //         heading: (userProgressState.currentQuestionID + 1),
    //         img: quizInfo.quizContent[userProgressState.currentQuestionID].questionImgPath || '',
    //         tapeOne: quizInfo.quizContent[userProgressState.currentQuestionID].questionContent || '',
    //         tapeTwo: quizInfo.quizContent[userProgressState.currentQuestionID].questionMainPart,
    //         tapeMini: false
    //     };
    //     updateTapeState( (prevState) => ({...prevState, updatedTapeInfo}) );
    // }


    // =============== [Кнопка продолжить] ===============
    const continueButton = () => {
        if(quizInfo) {
            // начнем игру, если она еще не началась
            if(!gameState.gameStarted) updateGameState( (prevState) => ({...prevState, gameStarted: true}) );
            changeQuestion();
        }
    }
    // =============== [Показать Image Viewer] ===============
    const showImage = () => {
        updatePicState( prevState => ({...prevState, isOpen: true}) );
    }
    // =============== [Спрятать Image Viewer] ===============
    const hideImage = () => {
        updatePicState( prevState => ({...prevState, isOpen: false}) );
    }


    // ========== [Смена вопроса] ==========
    const changeQuestion = () => {
        // console.log("currentQuestionID:", userProgressState.currentQuestionID, " | quizInfo.quizContent.length:", quizInfo.quizContent.length)
        // let currentQuestion = quizInfo.quizContent[userProgressState.currentQuestionID - 1] || quizInfo.quizContent[userProgressState.currentQuestionID];
        
        // Если вопросы закончились, завершаем игру
        if (userProgressState.currentQuestionID > quizInfo.quizContent.length) {
            console.log("1.THE END OF THE GAME")
            return finishQuiz();
        }
        
        // Если игра во всю идет, то имзеним некоторую часть элементов дизайна (случай когда лента свернута)
        else if(userProgressState.currentQuestionID > 0 && userProgressState.userAnswered === false) {
            console.log("2.HIDING TAPE")
            hideTape();
            fillAnswerButtons(quizInfo.quizContent[userProgressState.currentQuestionID - 1].questionAnswers
                // currentQuestion.questionAnswers
            );
        }
        
        // Иначе просто обновим данные вопроса (случай когда лента развернута)
        else {
            if (userProgressState.currentQuestionID === quizInfo.quizContent.length) {
                console.log("4.THE END OF THE GAME")
                return finishQuiz();
            }
            console.log("3.CHANGING QUESTION")
            updateUserProgressState( (prevState) => ({ ...prevState, currentQuestionID: prevState.currentQuestionID + 1 }) ) // если игра уже была начата, обновим вопрос
            // console.log("\tcurrentQuestion:", currentQuestion)
            
            let updatedTapeInfo = {
                heading: 'Вопрос №' + (userProgressState.currentQuestionID + 1),
                img:
                    quizInfo.quizContent[userProgressState.currentQuestionID].questionImgPath ||
                    '',
                tapeOne:
                    quizInfo.quizContent[userProgressState.currentQuestionID].questionContent ||
                    '',
                tapeTwo:
                    quizInfo.quizContent[userProgressState.currentQuestionID].questionMainPart,
                tapeMini: false
            }
            clearAnswerButtons();

            updateTapeState( (prevState) => ({...prevState, ...updatedTapeInfo}) );
            // updateTape();
            
            // сбросим значения, если ответ на квиз был дан (либо же,корректность его ответа была true), но уже был показан другой вопрос
            if(userProgressState.userAnswered || userProgressState.currentUserAnswerCorrect) {
                updateUserProgressState( (prevState) => ({
                    ...prevState,
                    currentUserAnswerID: -1,
                    // currentQuestionID: prevState.currentQuestionID + 1, // обновим вопрос
                    userAnswered: false, // вернем в исходное состояние
                    currentUserAnswerCorrect: false // вернем в исходное состояние
                }) );
            }
            // updateUserProgressState( (prevState) => ({...prevState, userAnswered: false, currentUserAnswerID: -1}) ); // вернем в исходное состояние
        }

        // Проверить, что если это последний вопрос был то показать результат
    }

    // =============== [Завершение викторины] ===============
    const finishQuiz = (): void => {
        updateGameState((prevState) => ({...prevState, gameStarted: false, gameFinished: true, gameResultMode: true}));
        
        const allQuestionsAmount = quizInfo.quizContent.length;
        const allAvailableScores = allQuestionsAmount * _TEMP_DEFAULT_QUESTIONS_WEIGHT;
        const scoresText = 'Вы набрали ' + userProgressState.currentScoresAmount + '/' + allAvailableScores + ' ' + getPointsText(userProgressState.currentScoresAmount);
        let tapeTwoText = '';

        if (userProgressState.currentScoresAmount === 0) {
            tapeTwoText = 'Ничего страшного! Просто попробуйте еще раз.';
        }
        else if ((allQuestionsAmount - userProgressState.currentScoresAmount) <= 1) {
            tapeTwoText = 'Отличная работа!';
        }
        else if ((allQuestionsAmount - userProgressState.currentScoresAmount) <= 2) {
            tapeTwoText = 'Неплохо!';
        }
        updateTapeState({...DEFAULT_TAPE_STATE_RESULT, tapeOne: scoresText, tapeTwo: tapeTwoText})
    }

    // =============== [Дать ответ] ===============
    const makeAnswer = (id: number) => {
        updateUserProgressState( (prevState) => ({...prevState, userAnswered: true, currentUserAnswerID: id}) )
        checkAnswer(id);
    }

    // =============== [Проверка правильности ответа] ===============
    const checkAnswer = (givenAnswerID: number) => {
        if(userProgressState.currentQuestionID > 0) {
            // let currentQuestion = quizInfo.quizContent[userProgressState.currentQuestionID - 1];
            // let rightAnswerID = currentQuestion.questionRightAnswerID;
            // let rightAnswerID = getQuizRightAnswerID();
            /* console.clear();
            console.log("rightAnswerID:", rightAnswerID);
            console.log("givenAnswerID:", givenAnswerID);
            console.log("givenAnswerID == rightAnswerID:", givenAnswerID == rightAnswerID);
            console.log("currentQuestion:", currentQuestion); */
            // let headingInfo, tapeOne, tapeTwo;
            // if(givenAnswerID == rightAnswerID) { // if(userProgressState.currentUserAnswerID == rightAnswerID) {
            if(isGivenAnswerRight(givenAnswerID)) {
                updateUserProgressState( (prevState) => ({
                    ...prevState,
                    currentScoresAmount: prevState.currentScoresAmount + _TEMP_DEFAULT_QUESTIONS_WEIGHT,
                    currentUserAnswerCorrect: true
                }) );
                // headingInfo = 'Верно!';
                // tapeOne = 'Вы уже набрали ' + userProgressState.currentScoresAmount + ' ' + getTextByNum(userProgressState.currentScoresAmount) + '!';
                // tapeTwo = 'Доп.информация, поясняющая почему это правильно';
            }
            // else {
            //     headingInfo = 'Неверно!';
            //     tapeOne = 'Вы не набрали никаких очков за этот вопрос. Ваш текущий набор очков составляет: ' + userProgressState.currentScoresAmount + ' очков.';
            //     tapeTwo = 'Правильным ответом будет: ' + currentQuestion.questionAnswers[rightAnswerID - 1].btnContent;
            // }

            // let updatedTapeInfo = {
            //     heading: headingInfo,
            //     img: '',
            //     tapeOne: tapeOne || '',
            //     tapeTwo: tapeTwo || '',
            //     tapeMini: false
            // }

            // updateTapeState( (prevState) => ({...prevState, ...updatedTapeInfo}) );
            updateTapeState( (prevState) => ({...prevState, img: '', tapeMini: false}) );
        }
    }
    
    // ******************** [CLASSES] ********************
    let tapeClass = classNames({
        'tape': true,
        'mini': tapeState.tapeMini
    });

    // ============================== [RENDER COMPONENT] ==============================
    return (
        <div className="content">

            <div className="tape_bg"/>
            {/* <!-- ========== [ ЛЕНТОЧКА ] ========== --> */}
            <div className={tapeClass} id="tape">
                <div className="tape_content" id="tape_content">
                    
                    <h2 className="tape_heading_text" id="tape_heading">
                        {
                            gameState.gameFinished && gameState.gameResultMode
                            ?
                                DEFAULT_TAPE_STATE_RESULT.heading
                            :
                                userProgressState.userAnswered 
                                ?
                                    userProgressState.currentUserAnswerCorrect
                                    ?
                                        'Правильно!'
                                    :
                                        'Неверно!'
                                : // иначе, если пользователь еще не ответил, то покажем информацию вопроса:
                                    tapeState.heading
                        }
                    </h2>
                    
                    {/* <!-- ========== [ БЛОК С ИНФОРМАЦИЕЙ ] ========== --> */}
                    <div className="tape_info_block" id="tape_info_block">
                        {/* <!-- ========== [ БЛОК С ПРЕДИСЛОВИЕМ ] ========== --> */}
                        { !tapeState.tapeMini &&
                            <div className="tape_info"> {/* *ngIf="!tapeMini" */}
                                {
                                    userProgressState.userAnswered && !(gameState.gameFinished && gameState.gameResultMode)
                                    ?
                                        userProgressState.currentUserAnswerCorrect
                                        ?
                                            'Вы уже набрали ' + 
                                            userProgressState.currentScoresAmount + ' ' + 
                                            getTextByNum(userProgressState.currentScoresAmount) + '!'
                                        :
                                            'Вы не набрали никаких очков за этот вопрос.\nВаш текущий набор очков составляет: ' +
                                            userProgressState.currentScoresAmount + ' ' + 
                                            getTextByNum(userProgressState.currentScoresAmount) + '.'
                                    : // иначе, если пользователь еще не ответил, то покажем информацию вопроса:
                                    tapeState.tapeOne
                                }
                            </div>
                        }
                        {/* <!-- ========== [ БЛОК С КАРТИНКОЙ ] ========== --> */}
                        { tapeState.img && !tapeState.tapeMini && !(gameState.gameFinished && gameState.gameResultMode) &&
                            <div className="tape_info"> { /* *ngIf="questionImgPath && !tapeMini" */ }
                                <button onClick={showImage} className="image_btn">
                                    <img className="image" alt="Картинка вопроса" src={tapeState.img}/>
                                </button>
                                {picState.isOpen && (
                                    <Lightbox
                                        mainSrc={tapeState.img}
                                        // nextSrc={images[(photoIndex + 1) % images.length]}
                                        // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                        onCloseRequest={hideImage}
                                        // onMovePrevRequest={() =>
                                        //     this.setState({
                                        //         photoIndex: (photoIndex + images.length - 1) % images.length,
                                        //     })
                                        // }
                                        // onMoveNextRequest={() =>
                                        //     this.setState({
                                        //         photoIndex: (photoIndex + 1) % images.length,
                                        //     })
                                        // }
                                    />
                                )}
                            </div>
                        }
                        {/* <!-- ========== [ БЛОК С СУТЬЮ ВОПРОСА ] ========== --> */}
                        <div className="tape_info">
                            {
                                userProgressState.userAnswered && !(gameState.gameFinished && gameState.gameResultMode)
                                ?
                                    userProgressState.currentUserAnswerCorrect
                                    ?
                                        ''
                                    :
                                        'Правильным ответом будет: ' + getQuizRightAnswerContent() // вне зависимости верно или нет - вывод этой информации
                                    /* +  */
                                    
                                    +
                                    /* 'Доп.информация, поясняющая почему это правильно' (возможно это то же самое, что и) */
                                    (getQuizRightAnswerDescription() ? '\n\nПояснение к правильному ответу: ' + getQuizRightAnswerDescription() : '')
                                : // иначе, если пользователь еще не ответил, то покажем информацию вопроса:
                                tapeState.tapeTwo
                            }
                        </div>
                    </div>

                    { tapeState.socialShown && gameState.gameFinished && /* *ngIf="socialShown && gameFinished" className="tape_info_block" */
                        <div className="tape_info_block">
                            <div className="socials">
                                <button className="social"><img className="vk" src={IMG_VK_ICON} alt="Поделитесь с друзьями вашим результатом!"/></button>
                                <button className="social"><img className="ok" src={IMG_OK_ICON} alt="Поделитесь с друзьями вашим результатом!"/></button>
                                <button className="social"><img className="fb" src={IMG_FB_ICON} alt="Поделитесь с друзьями вашим результатом!"/></button>
                            </div>
                        </div>
                    }

                    <div className="tape_action_block" id="tape_action_block">
                        { !gameState.gameStarted &&
                            <LinkButton to="/" style={gameState.gameFinished ? {margin: '0 auto'} : {}} className="action_button" >
                                Вернуться
                            </LinkButton>
                        }
                        
                        { gameState.gameStarted && !gameState.gameFinished &&
                            <button className="action_button" onClick={finishQuiz}>
                                Завершить
                            </button>
                        }

                        { !gameState.gameFinished &&
                            <button className="action_button" onClick={continueButton}>
                                { userProgressState.userAnswered ? 'Далее' : 'Продолжить' }
                            </button>
                        }
                    </div>

                    { tapeState.tapeMini &&
                        <button className="action_button expand"
                            //*ngIf="tapeMini"
                            //(click)="tapeMini = false"
                            onClick={showTape}
                        >
                            <img src={IMG_BTN_DOWN} alt="V" />
                            {/* <img src="../../../../../assets/images/buttons/button_down.png" alt="button_down.png" /> */}
                        </button>
                    }
                </div>
            </div>


            <QuizPages btnsArray={answerBtnsState} actionFunc={makeAnswer} />
            {/* {
                PAGES_CLASSES.map( (page, pageIDX) => (
                    <div className={`page ${page.class}`} key={`book_page_answers_${pageIDX}`}>
                        {
                            answerBtnsState.map( (btn) => (
                                (getNumOrder(btn.answerID) === page.order) ?
                                    <div className="page_action_block" key={`book_page_answer_button_${btn.btnContent`}>
                                        <button className="action_button" onClick={ () => makeAnswer(btn.answerID) }>
                                            <span className="button_holder top right" />
                                            {btn.btnContent}
                                        </button>
                                    </div>
                                : null
                            ) )
                        }
                    </div>
                ) )
            } */}
            {/* <!-- ========== [ ЛЕВАЯ СТРАНИЦА ] ========== --> */}
            {/* <div className="page left">
                <div className="page_action_block">
                    <button className="action_button">
                        <span className="button_holder top right" />
                        Content_1
                    </button>
                </div>
                <div className="page_action_block">
                    <button className="action_button">
                        <span className="button_holder top right" />
                        Content_2
                    </button>
                </div>
            </div> */}
            {/* <!-- ========== [ ПРАВАЯ СТРАНИЦА ] ========== --> */}
            {/* <div className="page right">
                <div className="page_action_block">
                    <button className="action_button">
                        <span className="button_holder top right" />
                        Content_3
                    </button>
                </div>
                <div className="page_action_block">
                    <button className="action_button">
                        <span className="button_holder top right" />
                        Content_4
                    </button>
                </div>
            </div> */}
        </div>
    );
}