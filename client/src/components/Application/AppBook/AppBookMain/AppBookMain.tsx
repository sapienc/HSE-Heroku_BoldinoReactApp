import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeHeading } from 'redux/actions/ui/uiActions';
import { MainPageQuizzes } from '../QuizTypes';
import LinkButton from 'shared/components/LinkButton';

export const AppBookMain = () => {
    const mockData: [MainPageQuizzes, MainPageQuizzes] = [ // должно быть строго 2 элемента
        {
            id: 1,
            quizName: 'Вопросы по произведением Пушкина',
            quizImgUrl: 'Pushkin' // пока-что имя класса, которому я прописал изображение
        },
        {
            id: 2,
            quizName: 'Тест по произведениям Ю.М. Лермонтова',
            quizImgUrl: 'Lermontov' // пока-что имя класса, которому я прописал изображение
        }
    ]

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(changeHeading(true));
    }, []);

    return (
        <div className="content">

            {/* <!-- ========== [ ЛЕВАЯ СТРАНИЦА ] ========== --> */}
            <div className="page left">
                <h2 className="page_heading">Викторина</h2>

                {/* <!-- ========== [ ACTION БЛОК ] ========== --> */}
                {mockData.map( (data, dataIDX) => 
                    <div className="page_action_block" key={`main_quiz_${data.id}`}>
                        <div className={`famous ${data.quizImgUrl}`} />

                        <LinkButton to={`/quiz/${data.id}`} className="action_button">
                            <span className="button_holder top right" />
                            {data.quizName}
                        </LinkButton>
                        {/* <Link to={`/quiz/${data.id}`}>
                            <button className="action_button">
                                <span className="button_holder top right" />
                                {data.quizName}
                            </button>
                        </Link> */}
                    </div>
                )}

                <LinkButton to="/quizzes" className="action_button_left" title="Посмотреть остальные викторины"></LinkButton>
            </div>
            {/* <!-- ========== [ ПРАВАЯ СТРАНИЦА ] ========== --> */}
            <div className="page right">
                <h2 className="page_heading">Карта</h2>

                <div className="page_action_block">
                    <LinkButton to="/map" className="map_button">
                        <div className="button_holder top left" />
                        <div className="button_holder bottom right" />
                        <div className="map_figure" />
                    </LinkButton>
                    {/* <button className="map_button">
                        <div className="button_holder top left"></div>
                        <div className="button_holder bottom right"></div>
                        <div className="map_figure"></div>
                    </button> */}
                </div>
            </div>
        </div>
    );
};