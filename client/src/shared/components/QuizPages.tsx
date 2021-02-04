import { IAnswerButtons } from 'components/Application/AppBook/QuizTypes';
import LinkButton from './LinkButton';

type QuizPagesProps = {
    btnsArray: IAnswerButtons, // На основе и количестве каких данных будут генерятя кнопки
    actionFunc: Function, // функция на кнопке
    
    pageFlex?: boolean, // если true, то добавится flex свойство странице
    
    arrowBtnFunc?: Function, // функция, которая будет выполнятся по нажатию на кнопку
    arrowBtnFuncType?: 'redirect' | undefined, // типы кнопок (если редирект, будем использовать готовый компонент)
    arrowBtnRedirectTo?: string, // в случае чего можем просто указать куда редиректнуть
    arrowBtnRedirectToParam?: string, // параметр для редиректа

    arrowBtnDirection?: 'left' | 'right', // в какую сторону будет смотреть стрелка
    arrowBtnTitle?: string // подсказка для кнопки при наведении

    // btnEvenOddSortFieldName?: string,
    // btnContentFieldName?: string
    // 2 свойства выше для того чтобы динамически подхватывать названия полей по которым можно получить данные, пример:
    // props.btnEvenOddSortFieldName ? btn.[props.btnEvenOddSortFieldName] : btnIDX
    // по итогу решил договориться с собой просто общие названия полей использовать у кнопок, т.е btnID, btnContent и всякое такое
}

type PageType = {
    class: string,
    order: 'even' | 'odd'
}
type PagesType = Array<PageType>;

export const QuizPages = (props: QuizPagesProps) => {
    const PAGES_CLASSES: PagesType = [
        {class: 'left', order: 'even'},
        {class: 'right', order: 'odd'}
    ];

    // =============== [Получение четности/нечетности числа] ===============
    const getNumOrder = (num: number):string => {
        return (num % 2 === 0) ? 'odd' : 'even';
    }

    return (
        <>
        {
            PAGES_CLASSES.map( (page: PageType, pageIDX: number) => (
                <div
                    className={`page ${page.class}` + (props.pageFlex ? 'flexible' : '')}
                    style={ (props.pageFlex ? {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    } : {} ) }
                    key={`book_page_answers_${pageIDX}`}
                >
                    {
                        props.btnsArray.map( (btn) => (
                            (getNumOrder(btn.btnID) === page.order) ?
                                <div
                                    style={ (props.pageFlex ? {
                                        justifyContent: 'center',
                                        height: '45%',
                                        flexGrow: 'unset'
                                    } : {} ) }
                                    className="page_action_block"
                                    key={`book_page_answer_button_${btn.btnID}`}
                                >
                                    <button className="action_button" onClick={ () => props.actionFunc(btn.btnID) }>
                                        <span className="button_holder top right" />
                                        {btn.btnContent}
                                    </button>
                                </div>
                            : null
                        ) )
                    }
                    {
                        props.arrowBtnFunc &&
                            (props.arrowBtnDirection || 'right') === page.class && // доп.условие для соотвествия той или иной функции для той или иной стрелки (+ по умолчанию стрелка будет устанавливаться направо)
                                props.arrowBtnFuncType === 'redirect'
                                ?
                                    // ВРЕМЕННОЕ УСЛОВИЕ ПЕРЕД ДОБАВЛЕНИЕМ ПАГИНАЦИИ!!    
                                    page.class === 'left' ? null :
                                    <LinkButton
                                        to={
                                            props.arrowBtnRedirectTo + (props.arrowBtnRedirectToParam || '') 
                                            ||
                                            '/'
                                        }
                                        className={"action_button_" + page.class}
                                        title={props.arrowBtnTitle}
                                    ></LinkButton>
                                :
                                    // ВРЕМЕННОЕ УСЛОВИЕ ПЕРЕД ДОБАВЛЕНИЕМ ПАГИНАЦИИ!!
                                    page.class === 'left' ? null :
                                    <button className={"action_button_" + page.class} title={props.arrowBtnTitle} onClick={() => (props.arrowBtnFunc ? props.arrowBtnFunc() : null)} ></button>
                    }
                </div>
            ) )
        }
        </>
    )
}

export default QuizPages;