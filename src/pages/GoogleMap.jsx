import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
import { useState } from "react"

const API_KEY = 'AIzaSyAi7MXdIi0M6OMiTHGb4HZvv6R4AWvGhC8'

export function GoogleMap() {
    const defaultCenter = { lat: 32.073, lng: 34.78 }
    const [coords, setCoords] = useState({ ...defaultCenter })
    const zoom = 13

    const [selectedBranch, setSelectedBranch] = useState(null)

    const [markerRef, marker] = useAdvancedMarkerRef()
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    const branches = [
        {
            _id: 'b101',
            name: 'Mister Toy - דיזנגוף סנטר',
            address: 'דיזנגוף סנטר, דיזנגוף 50',
            position: { lat: 32.0747, lng: 34.7738 },
            hours: 'א׳-ה׳: 09:30-20:30 | ו׳: 09:30-14:30'
        },
        {
            _id: 'b102',
            name: 'Mister Toy - נמל תל אביב',
            address: 'האנגר 15, נמל תל אביב',
            position: { lat: 32.0988, lng: 34.7725 },
            hours: 'א׳-ה׳: 10:00-21:00 | ו׳: 10:00-15:00'
        },
        {
            _id: 'b103',
            name: 'Mister Toy - דרך נמיר',
            address: 'דרך נמיר 85',
            position: { lat: 32.0910, lng: 34.7925 },
            hours: 'א׳-ה׳: 09:00-20:00 | ו׳: 09:00-14:00'
        },
        {
            _id: 'b104',
            name: 'Mister Toy - מגדל שלום',
            address: 'מגדל שלום, אחד העם 9',
            position: { lat: 32.0620, lng: 34.7709 },
            hours: 'א׳-ה׳: 10:00-19:00 | ו׳: סגור'
        }
    ]

    function handleClick(ev) {
        console.log('ev: ', ev);
        setCoords(ev.detail.latLng)
        ev.map.panTo(ev.detail.latLng)
    }

    return (
        <section className="google-map">
            <APIProvider apiKey={API_KEY}>
                <Map
                    mapId={'bf51a910020fa25a'}
                    // mapId={null}
                    defaultZoom={zoom}
                    defaultCenter={defaultCenter}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={handleClick}
                >

                    {branches.map(branch => (
                        <Marker
                            key={branch._id}
                            position={branch.position}
                            title={branch.name}
                            onClick={() => setSelectedBranch(branch)}
                        />
                    ))}

                    {selectedBranch && (
                        <InfoWindow
                            position={selectedBranch.position}
                            onCloseClick={() => setSelectedBranch(null)} // סגירת החלון
                        >
                            <div style={{ padding: '10px' }}>
                                <h4>{selectedBranch.name}</h4>
                                <p><strong>כתובת:</strong> {selectedBranch.address}</p>
                                <p><strong>שעות:</strong> {selectedBranch.hours}</p>
                            </div>
                        </InfoWindow>
                    )}

                    <AdvancedMarker
                        ref={markerRef}
                        onClick={() => setIsInfoOpen(isOpen => !isOpen)}
                        position={coords}
                    >
                        <div style={{ fontSize: '2rem' }}>📍</div>

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
                            onClick={() => onSelectStore(branch)}
                        >
                            <div className="card-content">
                                <h3>{branch.name}</h3>
                                <p className="address">{branch.address}</p>
                                <div className="divider"></div>
                                <p className="hours">
                                    <span className="clock-icon">⏰</span> 
                                    {branch.hours}
                                </p>
                            </div>
                            <div className="card-icon">📍</div>
                        </article>
                    ))}
                </div>
            </section>
        </section>
    )
}