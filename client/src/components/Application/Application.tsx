import './Application.css';
import AppBook from './AppBook';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import className from 'classnames';
import { useEffect } from 'react';
import { changeHeading } from '../../redux/actions/ui/uiActions';

export const Application: React.FC = () => {

    const headingVisibility = useSelector((state: RootState) => state.ui.heading);

    const addCondStrByURL = 'quiz';
    let additionalConditionByQuizURL = false; // by default heading must be shown

    const dispatch = useDispatch();
    useEffect(() => {
        additionalConditionByQuizURL = window.location.pathname.split('/').indexOf(addCondStrByURL) !== -1; // quiz must not be found
        if(!additionalConditionByQuizURL) // if addCondStrByUrl wasn't found, we can dispatch as visible
        {
            dispatch(changeHeading(true));
        }
        // console.log('ApplicationEffect');
    }, []);

    
    const headingClassName = className({
        'Heading_noBG': !headingVisibility || additionalConditionByQuizURL, // not visible in heading or addCondStrByURL was found in url
        'Heading_background': headingVisibility && !additionalConditionByQuizURL // if heading is visible AND addCondStrByURL wasn't found in url
    });
    // console.log('Application');

    return (
        <div className="wrapper">
            <div className="Heading">
                {/* <div class="{{hiddenBG ? 'Heading_noBG' : 'Heading_background'}}"></div> */}
                <div className={headingClassName}/>
            </div>
            <div className="Book">
                <AppBook/>
            </div>
        </div>
    );
}

// export default connect( state => {
//     heading: state.ui
// })(Application);