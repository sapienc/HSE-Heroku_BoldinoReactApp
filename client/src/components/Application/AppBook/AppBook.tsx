// import './AppBook.css'

import {Switch, Route } from 'react-router-dom';

import AppBookMain from './AppBookMain';
import AppBookQuiz from './AppBookQuiz';

export const AppBook = () => {
    return (
        <div className="Book_wrap">
            {/* DYNAMIC BOOK COMPONENTS CONTENT */}

            <Switch>
                <Route exact path='/' component={AppBookMain}/>
                <Route path='/quiz/:id' component={AppBookQuiz}/>
            </Switch>
        </div>
    );
};