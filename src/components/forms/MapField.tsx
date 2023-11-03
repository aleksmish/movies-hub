import Map from '../Map'
import { Coordinates } from '../../types/coordinates'
import { useFormikContext } from 'formik';

type MapFieldProps = {
  coordinates?: Coordinates[];
  latField: string;
  lngField: string;
}

const MapField = ({coordinates = [], latField, lngField}: MapFieldProps) => {
  const {values} = useFormikContext<any>();
  const handleClick = (coordinates: Coordinates) => {
    values[latField] = coordinates.lat;
    values[lngField] = coordinates.lng;
  }
  return (
    <div className='flex flex-col mt-4 mb-2'>
      <Map
        coordinates={coordinates}
        onClick={handleClick}
      />
    </div>
  )
}

export default MapField