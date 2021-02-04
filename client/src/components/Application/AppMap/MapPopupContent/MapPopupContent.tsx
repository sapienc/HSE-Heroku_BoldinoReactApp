import IMG_NOT_FOUND from 'assets/images/icons/np_photo_available.png'

type MapPopupProps = {
    heading: string,
    contentText: string,
    img?: string,
    showModalFunc: () => void,
    currentLocationID?: number
}

export const MapPopupContent = (props: MapPopupProps) => {
    return (
        <div className="popupWrapper">
            <div className="infoBlock">
                
                {/* ===== Заголовок попапа ===== */}
                <div className="popBlock">
                    <img className="img" src={props.img|| IMG_NOT_FOUND}/>
                </div>
                
                {/* ===== Описание попапа ===== */}
                <div className="popBlock">
                    {/* ===== Заголовок ===== */}
                    <div className="info">
                        <h3 className="heading_text">{props.heading || 'Неизвестная локация'}</h3>
                    </div>
                    {/* ===== Контент ===== */}
                    <div className="info">
                        <p className="descr_text">{props.contentText || 'Информация о локации неизвестна или недоступна.'}</p>
                    </div>
                </div>

            </div>
            {/* ===== Кнопка "Подробнее" для открытия модального окна ===== */}
            {
                props.heading && props.contentText && // props.currentLocationID && /* Если нам был передан ID текущей локаци, значит есть на что посмотреть "Подробнее" */
                <div className="btnBLock">
                    <button
                        className="popupMoreBtn"
                        // onClick={ () => (props.showModalFunc(props.currentLocationID)) }
                        onClick={ props.showModalFunc }
                    >
                        Подробнее
                    </button>
                </div>
            }
        </div>
    );
}