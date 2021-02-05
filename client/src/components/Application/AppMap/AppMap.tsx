import { Circle, Map, Popup, TileLayer, ZoomControl } from 'react-leaflet';

// ----- LEAFLET DRAWING -----
// import { EditControl } from 'react-leaflet-draw';
// import { FeatureGroup } from 'react-leaflet';
// import 'leaflet-draw';
// import 'leaflet-draw/dist/leaflet.draw.css';
// ../../../../node_modules/
// ----- [/LEAFLET DRAWING] -----

import Leaflet, { LatLng, point } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

import './AppMap.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import LinkButton from 'shared/components/LinkButton';

import MapModalWindow from './MapModalWindow';
import MapPopupContent from './MapPopupContent';

// type MapSettings = {
//     draggable: boolean,
//     zoomable: boolean
// }

type LocationInfo = {
    pointXPos: number,
    pointYPos: number,
    pointHeading: string,
    pointDescription: string,
    pointImgPath?: string
}

type Locations = {
    // chosenLocationID: number,
    points: Array<LocationInfo>
}

type ModalWindowInfo = {
    heading: string,
    content: string,
    img?: string,
    visibility: boolean
}

// ========== [LEAFLET SETTINGS] ==========
let DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconRetinaUrl: iconRetina,
    // iconSize: [24,36], // принудительное изменение размера самой иконки
    iconAnchor: [12, 0] // Если мы хотим чтобы popup был прям там же, куда "уткнута" иконка маркера: [12,16]
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

// Другой вариант, через CDN:
// Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'; 
// ========== [/LEAFLET SETTINGS] ==========

export const AppMap = () => {
    // =============== [ НАСТРОЙКИ КАРТЫ ] ===============
    const BOUNDS_TOP = -10;//90;
    const BOUNDS_BOTTOM = -240;//-90;
    const BOUNDS_LEFT = -30;//-220;
    const BOUNDS_RIGHT = 280;// 220;

    const MAP_WIDTH = '100vw';
    const MAP_HEIGHT = '100vh';
    const MAP_NORTH_EAST = Leaflet.latLng([BOUNDS_TOP, BOUNDS_LEFT]); // [0, 4096], mapNE = [4096, 0];
    const MAP_SOUTH_WEEST = Leaflet.latLng([BOUNDS_BOTTOM, BOUNDS_RIGHT]);
    const MAP_BOUNDS = Leaflet.latLngBounds(MAP_SOUTH_WEEST, MAP_NORTH_EAST);
    const MAP_TILE_LAYER_URL = "/map/{z}/{x}/{y}.png";

    const ZOOM_MIN_LEVEL = 2;
    const ZOOM_MAX_LEVEL = 4;

    // DEFAULT VALUES
    const centerPosition: [number, number] = [-121.875, 122.9375]; // const [centerCoords, setCenter] = useState<[number, number]>([0.0, 0.0]);
    const startZoomValue = 3;

    let tempText = "«Лучинник» небольшая лиственная роща находится в 2км от села Большого Болдино. QIWODPciqwopcdipoQWIC dqiwcd iqcpdicqpw icdpoq iwopqiwcIDOQWPCidopqciDCI QWPdicqpowci pdoQIW";
    // Информация о точках на карте
    let locationsPoints = [
        // ==========  1 ==========
        {
            pointXPos: 137.5,
            pointYPos: -114.75,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  2 ==========
        {
            pointXPos: 138.6875,
            pointYPos: -119.125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  3 ==========
        {
            pointXPos: 143.6875,
            pointYPos: -115,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  4 ==========
        {
            pointXPos: 129.1875,
            pointYPos: -112.375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  5 ==========
        {
            pointXPos: 134.3125,
            pointYPos: -105.875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  6 ==========
        {
            pointXPos: 125.6875,
            pointYPos: -104,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  7 ==========
        {
            pointXPos: 140,
            pointYPos: -94.1875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  8 ==========
        {
            pointXPos: 125.875,
            pointYPos: -95.3125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  9 ==========
        {
            pointXPos: 118.9375,
            pointYPos: -95.6875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  10 ==========
        {
            pointXPos: 114.3125,
            pointYPos: -96.125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  11 ==========
        {
            pointXPos: 112.25,
            pointYPos: -104.125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  12 ==========
        {
            pointXPos: 100.9375,
            pointYPos: -108.5,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  13 ==========
        {
            pointXPos: 79.1875,
            pointYPos: -101.9375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  14 ==========
        {
            pointXPos: 92.8125,
            pointYPos: -94.625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  15 ==========
        {
            pointXPos: 76.75,
            pointYPos: -96.9375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  16 ==========
        {
            pointXPos: 81.125,
            pointYPos: -129.1875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  17 ==========
        {
            pointXPos: 82.5,
            pointYPos: -134.5,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  18 ==========
        {
            pointXPos: 68.6875,
            pointYPos: -140.0625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  19 ==========
        {
            pointXPos: 69.4375,
            pointYPos: -146.0625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  20 ==========
        {
            pointXPos: 72.875,
            pointYPos: -157.5625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  21 ==========
        {
            pointXPos: 68.9375,
            pointYPos: -166.875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  22 ==========
        {
            pointXPos: 90.75,
            pointYPos: -136.3125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
    
        // ==========  23 ==========
        {
            pointXPos: 102.4375,
            pointYPos: -124.9375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
    
        // ==========  24 ==========
        {
            pointXPos: 111.875,
            pointYPos: -122.25,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  25 ==========
        {
            pointXPos: 122.9375,
            pointYPos: -121.875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  26 ==========
        {
            pointXPos: 114.8125,
            pointYPos: -113,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  27 ==========
        {
            pointXPos: 38.5,
            pointYPos: -165,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  28 ==========
        {
            pointXPos: 50.25,
            pointYPos: -98.1875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  29 ==========
        {
            pointXPos: 60.375,
            pointYPos: -75.8125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  30 ==========
        {
            pointXPos: 71.875,
            pointYPos: -86.125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  31 ==========
        {
            pointXPos: 170.375,
            pointYPos: -77.1875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  32 ==========
        {
            pointXPos: 179.625,
            pointYPos: -77.4375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  33 ==========
        {
            pointXPos: 184.75,
            pointYPos: -79.4375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  34 ==========
        {
            pointXPos: 159.5,
            pointYPos: -83.5,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  35 ==========
        {
            pointXPos: 154.6875,
            pointYPos: -84.9375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  36 ==========
        {
            pointXPos: 165.4375,
            pointYPos: -85.25,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
    
        // ==========  37 ==========
        {
            pointXPos: 150.625,
            pointYPos: -92.3125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  38 ==========
        {
            pointXPos: 162.9375,
            pointYPos: -102.5,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  39 ==========
        {
            pointXPos: 152.9375,
            pointYPos: -108.6875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  40 ==========
        {
            pointXPos: 169.1875,
            pointYPos: -117.25,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  41 ==========
        {
            pointXPos: 165.625,
            pointYPos: -125.125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  42 ==========
        {
            pointXPos: 156.0625,
            pointYPos: -132.6875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  43 ==========
        {
            pointXPos: 143.9375,
            pointYPos: -132.6875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  44 ==========
        {
            pointXPos: 120.0625,
            pointYPos: -125.8125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  45 ==========
        {
            pointXPos: 125.9375,
            pointYPos: -135.375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  46 ==========
        {
            pointXPos: 127.8125,
            pointYPos: -138.375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  47 ==========
        {
            pointXPos: 133.125,
            pointYPos: -143.75,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  48 ==========
        {
            pointXPos: 129.75,
            pointYPos: -146.5,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  49 ==========
        {
            pointXPos: 138.75,
            pointYPos: -145.4375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  50 ==========
        {
            pointXPos: 126.9375,
            pointYPos: -156.1875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  51 ==========
        {
            pointXPos: 138.1875,
            pointYPos: -152.3125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  52 ==========
        {
            pointXPos: 160.0625,
            pointYPos: -148.625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  53 ==========
        {
            pointXPos: 164.4375,
            pointYPos: -135.0625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  54 ==========
        {
            pointXPos: 170.0625,
            pointYPos: -128.875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  55 ==========
        {
            pointXPos: 213.25,
            pointYPos: -114.5,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  56 ==========
        {
            pointXPos: 193.25,
            pointYPos: -176.6875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  57 ==========
        {
            pointXPos: 182,
            pointYPos: -184.125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  58 ==========
        {
            pointXPos: 189.4375,
            pointYPos: -185.5625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  59 ==========
        {
            pointXPos: 223.375,
            pointYPos: -190.0625,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  60 ==========
        {
            pointXPos: 169.375,
            pointYPos: -200.375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  61 ==========
        {
            pointXPos: 184.3125,
            pointYPos: -210.375,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  62 ==========
        {
            pointXPos: 167.0625,
            pointYPos: -218.8125,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  63 ==========
        {
            pointXPos: 30.125,
            pointYPos: -216.875,
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        },
        // ==========  64 ==========
        {
            pointXPos: 110.3125,
            pointYPos: -46.8125,
            // pointXPos: 74.425777, // Diff: -121.205777
            // pointXPos: -24.785156, // Diff: -135.065156
            pointHeading: 'Заповедная роща Лучинник',
            pointDescription: tempText,
            pointImgPath: ''
        }
    ]
    const [locationsInfo, setLocationsInfo] = useState<Locations>({
        // chosenLocationID: -1,
        points: [...locationsPoints]
    })
    // =============== [ /НАСТРОЙКИ КАРТЫ ] ===============
    
    // =============== [ МОДАЛЬНОЕ ОКНО ] ===============
    const [modalWindow, updateModalWindow] = useState<ModalWindowInfo>({} as ModalWindowInfo);

    const openModal = (locationInfoID: number) => {
        // if (locationInfoID && locationsInfo.chosenLocationID !== locationInfoID) {
        //     // Обновляем текущую выбранную точку, если нас она заинтересовала, нажав на кнопку "Подробнее"
        //     setLocationsInfo( prevState => ({...prevState, chosenLocationID: locationInfoID}) )
        // }
        // updateModalWindow(prevState => ({...prevState, visibility: true}));
        updateModalWindow({
            heading: locationsInfo.points[locationInfoID].pointHeading,
            content: locationsInfo.points[locationInfoID].pointDescription,
            img: locationsInfo.points[locationInfoID].pointImgPath,
            visibility: true
        });
    }
    const closeModal = () => {
        updateModalWindow(prevState => ({...prevState, visibility: false}));
    }
    // =============== [ МОДАЛЬНОЕ ОКНО ] ===============
    
    // =============== [ ФУНКЦИОНАЛ КАРТЫ ] ===============
    // const [mapState, setMapState] = useState<MapSettings>({
    //     draggable: true,
    //     zoomable: true
    // });
    // useEffect(() => {
    //     setMapState( prevState => ({
    //         ...prevState,
    //         draggable: !modalWindow.visibility,
    //         zoomable: !modalWindow.visibility
    //     }))
    // }, [modalWindow.visibility])

    // const [currLocation, setCurrLocationInfo] = useState<Locations>();
    // const onLocationClick = (pointID: number) => {
    //     // event: Leaflet.LeafletMouseEvent
    //     if (locationsInfo) {
    //         setLocationsInfo( prevState => ({...prevState, chosenLocationID: pointID}) );
    //     }
    // }
    
    // const [mapRef, setMapRef] = useState<Map | null>({} as Map);
    // useEffect(() => {}, [mapRef])
    // =============== [ /ФУНКЦИОНАЛ КАРТЫ ] ===============
    
    // =============== [ ПОЛЕЗНЫЕ ФУНКЦИИ ] ===============
    const cropText = (text: string) => {
        if (text.length > 90) return text.slice(0,90) + '...'
        return text;
    }
    // =============== [ /ПОЛЕЗНЫЕ ФУНКЦИИ ] ===============

    return (
        <div className="map_wrapper">
            <div id="map" className="map">
                
                <Map
                    style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
                    center={centerPosition}
                    zoom={startZoomValue}
                    maxBounds={MAP_BOUNDS}
                    maxBoundsViscosity={2.0}
                    zoomControl={false}
                    tap={true}
                    crs={Leaflet.CRS.Simple}
                    
                    /* Настройки Drag & Zoom при видимости модального окна */
                    dragging={!modalWindow.visibility}
                    doubleClickZoom={!modalWindow.visibility}
                    trackResize={!modalWindow.visibility}
                    touchZoom={!modalWindow.visibility}
                    scrollWheelZoom={!modalWindow.visibility}
                    // ref={(map) => (setMapRef(map)) }
                >
                    <div className="backBtnZoneWrapper">
                        <div className="backBtnZone">
                            <LinkButton to="/" className="map_back_btn">
                                Вернуться
                                {/* className="btn_link" */}
                            </LinkButton>
                        </div>
                    </div>

                    <MapModalWindow
                        hideModalFunc={closeModal}
                        heading={modalWindow.heading}
                        contentText={modalWindow.content}
                        visibility={modalWindow.visibility}
                        img={modalWindow.img}
                    />

                    <TileLayer // attribution='&copy; <a href="here_my_URL">MyOwnMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        url={MAP_TILE_LAYER_URL}
                        minZoom={ZOOM_MIN_LEVEL}
                        maxZoom={ZOOM_MAX_LEVEL}
                        noWrap={true}
                    />
                    <ZoomControl position="topright" />
                    {/* <FeatureGroup>
                        <EditControl
                            position="topright"
                            onEdited={e => {
                                e.layers.eachLayer( (a) => {
                                    let idx = prompt("Какая это по счету точка?");
                                    let pointInfo = a.toGeoJSON();
                                    console.log('[' + idx + ']:', pointInfo);
                                    // alert('[' + idx + ']:' + pointInfo.geometry.coordinates[0] + ', ' + pointInfo.geometry.coordinates[1])
                                    alert(
                                        `// ==========  ${idx} ==========
                                        {
                                            pointXPos: ${pointInfo.geometry.coordinates[0]},
                                            pointYPos: ${pointInfo.geometry.coordinates[1]},
                                            pointHeading: 'Заповедная роща Лучинник',
                                            pointDescription: tempText,
                                            pointImgPath: ''
                                        },`
                                    )
                                });
                            }}
                            edit={{ remove: false }}
                            draw={{
                                marker: false,
                                circle: false,
                                rectangle: false,
                                polygon: false,
                                polyline: false
                            }}
                        />
                        <Circle
                            center={[locations[locations.length - 1].pointXPos, locations[locations.length - 1].pointYPos]}
                            pathOptions={{color: 'red'}}
                            radius={2} // radius={200000}
                            className={"custom"}
                        >
                        </Circle>
                    </FeatureGroup> */}
                    {
                        locationsInfo.points.map((location, pointIDX) => {
                            return (
                                <Circle
                                    key={"map_location_point_" + pointIDX}
                                    center={[location.pointYPos, location.pointXPos]}
                                    fillOpacity={0.0}
                                    radius={1.6} // radius={200000}
                                    className={"custom"}
                                    onpopupopen={ e => (e.target.setStyle({fill: 'red', fillOpacity: 0.3}))}
                                    // onclick={ () => (onLocationClick(pointIDX))}
                                >
                                    <Popup key={"map_location_popup_" + pointIDX} className={"custom"}>
                                        <MapPopupContent
                                            // showModalFunc={openModal}
                                            showModalFunc={ () => openModal(pointIDX)}
                                            currentLocationID={pointIDX}
                                            heading={location.pointHeading}
                                            contentText={cropText(location.pointDescription)}
                                            img={location.pointImgPath}
                                        />
                                    </Popup>
                                </Circle>
                            )
                        })
                    }
                </Map>
            </div>
        </div>
    );
};


{/* <div className="backBtnZone">
                    <a routerLink="/" className="btn_link">
                        <button className="map_back_btn">Вернуться</button>
                    </a>
                </div>
                
                <div id="modalWindow" className="modalWindowZone">
                    <div className="modalWindowWrapper">
                        <div className="modalWindow">

                            <div className="headingBlock">
                                <h3 className="heading" id="modalWindowHeadingText"></h3>
                            </div>

                            <div className="imgBlock">
                                <img className="img" id="modalWindowImg" src=""/>
                            </div>

                            <div className="descriptionBlock">
                                <p className="description" id="modalWindowDescrText"></p>
                            </div>

                            <div className="actionBlock">
                                <!-- <button className="popupMoreBtn" style="width: 100%; margin: 10px auto; font-size: 18px;">Заказать</button> -->
                            </div>
                        </div>
                        <div className="closeBtnBlock">
                            <a className="closeBtn" id="closeModalBtn">×</a>
                            <!-- <a className="closeBtn" href="#close" onclick="closeModal()">×</a> -->
                            <!-- <button className="closeBtn" (click)="closeModal()">×</button> -->
                        </div>
                    </div>
                </div> */}







    // const onClickCircle = () => {

    // }
    // function LocationMarker() {
    //     const [position, setPosition] = useState<LatLng>({lat: 0, lng: 0} as LatLng)
    //     const map = useMapEvents({
    //       click(e) {
    //           console.log(e)
    //           setPosition(e.latlng)
    //         // map.locate()
    //       },
    //     //   locationfound(e) {
    //     //     setPosition(e.latlng)
    //     //     map.flyTo(e.latlng, map.getZoom())
    //     //   },
    //     })

    //     return (
    //         <Circle center={position}>
    //             <Popup>HERE: {position}</Popup>
    //         </Circle>
    //     )
    //   }