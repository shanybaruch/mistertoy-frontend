import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
import { useState } from "react"
import { ShoppingCart } from "../cmps/ShoppingCart"
import { useSelector } from "react-redux"

const API_KEY = 'AIzaSyAi7MXdIi0M6OMiTHGb4HZvv6R4AWvGhC8'

export function GoogleMap() {
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)

    const defaultCenter = { lat: 32.073, lng: 34.78 }
    const [coords, setCoords] = useState({ ...defaultCenter })
    const zoom = 12

    const [selectedBranch, setSelectedBranch] = useState(null)

    const [markerRef, marker] = useAdvancedMarkerRef()
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    const branches = [
        {
            _id: 'b101',
            name: 'Mister Toy Dizengoff Center',
            address: 'Dizengoff Center, Dizengoff 50',
            position: { lat: 32.0747, lng: 34.7738 },
            hours: 'Sun-Thu: 09:30-20:30, Fri: 09:30-14:30'
        },
        {
            _id: 'b102',
            name: 'Mister Toy Tel Aviv Port',
            address: 'Hangar 15, Tel Aviv Port',
            position: { lat: 32.0988, lng: 34.7725 },
            hours: 'Sun-Thu: 10:00-21:00, Fri: 10:00-15:00'
        },
        {
            _id: 'b103',
            name: 'Mister Toy Namir Road',
            address: 'Namir Road 85',
            position: { lat: 32.0910, lng: 34.7925 },
            hours: 'Sun-Thu: 09:00-20:00, Fri: 09:00-14:00'
        },
        {
            _id: 'b104',
            name: 'Mister Toy Shalom Tower',
            address: 'Shalom Tower, Ahad Ha\'Am 9',
            position: { lat: 32.0620, lng: 34.7709 },
            hours: 'Sun-Thu: 10:00-19:00, Fri: Closed'
        }
    ]

    function handleClick(ev) {
        console.log('ev: ', ev);
        setCoords(ev.detail.latLng)
        ev.map.panTo(ev.detail.latLng)
    }

    return (
        <section className="google-map">
            <h1 className="title">Branches</h1>
            <APIProvider apiKey={API_KEY}>
                <Map
                    // mapId={'bf51a910020fa25a'}
                    mapId={"DEMO_MAP_ID"}
                    defaultZoom={zoom}
                    defaultCenter={defaultCenter}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={handleClick}
                    className="map"
                >

                    {branches.map(branch => (
                        <AdvancedMarker
                            key={branch._id}
                            position={branch.position}
                            title={branch.name}
                            onClick={() => setSelectedBranch(branch)}
                        />
                    ))}

                    {selectedBranch && (
                        <InfoWindow
                            position={selectedBranch.position}
                            onCloseClick={() => setSelectedBranch(null)}
                        >
                            <div style={{ padding: '10px' }}>
                                <h4>{selectedBranch.name}</h4>
                                <p><strong>Address:</strong> {selectedBranch.address}</p>
                                <p><strong>Hours:</strong> {selectedBranch.hours}</p>
                            </div>
                        </InfoWindow>
                    )}

                    <AdvancedMarker
                        ref={markerRef}
                        onClick={() => setIsInfoOpen(isOpen => !isOpen)}
                        position={coords}
                    >
                        <Pin className="location-icon"
                            background={'#04b9fbff'}
                        />

                        {isInfoOpen &&
                            <InfoWindow
                                anchor={marker}
                                onCloseClick={() => setIsInfoOpen(false)}
                            >
                                <h4>The marker</h4>
                            </InfoWindow>}

                    </AdvancedMarker>
                </Map>
            </APIProvider>

            <section className="branches-list-container">
                <div className="branches-grid">
                    {branches.map(branch => (
                        <article
                            key={branch._id}
                            className={`branch-card ${selectedBranch?._id === branch._id ? 'active' : ''}`}
                        // onClick={() => onSelectStore(branch)}
                        >
                            <div className="card-content">
                                <h3>{branch.name}</h3>
                                <p className="address">{branch.address}</p>
                                <div className="divider"></div>
                                <p className="hours">
                                    {branch.hours}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            < ShoppingCart isCartShown={isCartShown} />

        </section>
    )
}