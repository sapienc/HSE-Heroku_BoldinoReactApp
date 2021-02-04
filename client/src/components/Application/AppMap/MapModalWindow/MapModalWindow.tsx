import { useState } from "react";
import { ImageViewerType } from "components/Application/AppBook/QuizTypes";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import IMG_NOT_FOUND from 'assets/images/icons/np_photo_available.png'

// type ModalWindowProps {
//     heading: string,
//     contentText: string,
//     img?: string,
//     hideModalFunc: Function
// }
type ModalWindowProps = {
    heading: string,
    contentText: string,
    visibility: boolean,
    img?: string,
    hideModalFunc: () => void
}

export const MapModalWindow = (props: ModalWindowProps) => {
    const [ picState, updatePicState ] = useState<ImageViewerType>({photoIndex: 0, isOpen: false});
    
    // =============== [Показать Image Viewer] ===============
    const showImage = () => {
        if(props.img) updatePicState( prevState => ({...prevState, isOpen: true}) );
    }
    // =============== [Спрятать Image Viewer] ===============
    const hideImage = () => {
        if(props.img) updatePicState( prevState => ({...prevState, isOpen: false}) );
    }

    return (
        <>
        {
            props.visibility ?
                <div className="modalWindowZone">
                    <div className="modalWindowWrapper">
                        <div className="modalWindow">
                            
                            {/* ===== Заголовок модального окна ===== */}
                            <div className="headingBlock">
                                <h3 className="heading">{props.heading}</h3>
                            </div>
                            
                            {/* ===== Изображение локации в модальном окне ===== */}
                            <div className="imgBlock">
                                <img className="img" src={props.img || IMG_NOT_FOUND} onClick={showImage} />
                                {props.img && picState.isOpen && (
                                    <Lightbox
                                        mainSrc={props.img}
                                        onCloseRequest={hideImage}
                                    />
                                )}
                            </div>

                            {/* ===== Описание локации в модальном окне ===== */}
                            <div className="descriptionBlock">
                                <p className="description">{props.contentText}</p>
                            </div>

                            {/* ===== Доп.возможности в модальном окне ===== */}
                            {/* <div className="actionBlock">
                                <!-- <button className="popupMoreBtn" style="width: 100%; margin: 10px auto; font-size: 18px;">Заказать</button> -->
                            </div> */}
                        </div>
                        <div className="closeBtnBlock">
                            <button className="closeBtn" onClick={props.hideModalFunc}>×</button>
                        </div>
                    </div>
                </div>
            : null
        }
        </>
    )
}