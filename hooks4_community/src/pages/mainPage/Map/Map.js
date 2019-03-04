import React, { useEffect, useState } from 'react';

import { load_google_map, handleLocationError } from '../../../utils/google';
import GoogleStyleJSON from '../../../json/MapStyle.json';
import './Map.scss';

const UserMap = () => {
  const [locations, setLocations] = useState([
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -43.999792, lng: 170.463352 },
    { lat: -43.5191519, lng: 172.6193722 }
  ]);

  useEffect(() => {
    let googleMapsPromise = load_google_map();
    Promise.all([googleMapsPromise])
      .then(res => {
        let google = res[0];
        const styledMapType = new google.maps.StyledMapType(GoogleStyleJSON);
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          scrollwheel: true,
          disableDefaultUI: true,
          center: { lat: -41.04068214957843, lng: 173.09267441851293 }
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              setLocations(prevArrays => [...prevArrays, pos]);
            },
            function() {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }

        const markers = locations.map((location, i) => {
          return new google.maps.Marker({
            position: location,
            map: map
          });
        });

        const markerCluster = new MarkerClusterer(map, markers, {
          imagePath:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='Map'>
      <h3>Active users</h3>
      <div id='map' style={{ width: '400px', height: '400px' }} />
    </div>
  );
};

export default UserMap;
