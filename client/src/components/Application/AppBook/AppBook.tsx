// import './AppBook.css'

import {Switch, Route } from 'react-router-dom';

import AppBookMain from './AppBookMain';
import AppBookQuiz from './AppBookQuiz';
import AppBookQuizzes from './AppBookQuizzes';

export const AppBook = () => {
    return (
        <div className="Book_wrap">
            <Switch>
                <Route exact path='/' component={AppBookMain}/>
                <Route path='/quiz/:id' component={AppBookQuiz}/>
                <Route path='/quizzes' component={AppBookQuizzes}/>
            </Switch>
        </div>
    );
};