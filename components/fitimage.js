import {Image,Dimensions} from 'react-native';

function FitImage({src}) {

    const width = Dimensions.get('window').width
    const ratio = 635 / width
    const height = 680 / ratio

    return(
        <Image 
        style={{
            width,
            height
        }}
        source={{
            uri: src
        }}
        />
    )
}

export default FitImage