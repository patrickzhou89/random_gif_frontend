import React from 'react';

import { useLazyQuery, gql } from '@apollo/client';
import { ActivityIndicator, Dimensions, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ToggleFavorite from './Favorite'

const RANDOM_GIF = gql`
	query GetRandom{
	  random{
	    id
	    image_url
	    width
	    height
	    isFavorite
	  }
	}
`

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const GifViewer = () => {
	const styles = StyleSheet.create({
		loading:{
			justifyContent: 'center',
	    	alignItems: 'center',
	    	height: deviceHeight
		},
		loadingText:{
			color:'#000',
			fontSize: 20
		},
		imageContainer:{
			height: deviceHeight*.60,
			justifyContent: 'center',
	    	alignItems: 'center',
	    	marginTop: deviceHeight*.05,
		},
		buttonContainer:{
			height: deviceHeight*.20,
		    alignSelf: 'center',
		    justifyContent: 'center',
		},
	 	 button: {
		  	borderRadius: deviceWidth*.1,
		  	backgroundColor: '#ef5350',
		  	height: deviceWidth*.2,
		  	width: deviceWidth*.2
		  },
		  buttonWrap:{
		  	flex:1,
		  	justifyContent: "center",
		  	alignItems: "center"
		  },
		  buttonText:{
		  	color:'#fff',
		    fontWeight: 'bold',  
		    fontSize: 11
		  }
	});

	//LazyQuery for random retrieval
	const [GetRandomGif, { data, error, loading }] = useLazyQuery(RANDOM_GIF,{
		fetchPolicy: "network-only"
	});

	//Computer gif aspect ratio for proper display
	let gifHeight=0, gifWidth=0;
	if (loading) return <View style={styles.loading}><ActivityIndicator size="large" color="#0000ff"/></View>;
	if(!data){
		GetRandomGif();
	}
	if(data){
		let ratio=data.random.width/data.random.height;
		if(deviceHeight>deviceWidth){
			if(ratio<1){
				gifHeight = deviceHeight*.65;
				gifWidth= gifHeight*ratio;
			}else{
				gifWidth = deviceWidth;
				gifHeight = deviceWidth/ratio;
			}
		}else{
		//Landscape Mode	
			gifHeight = deviceHeight*.65;
			gifWidth= gifHeight*ratio;
		}
	}

	return (
		<View>
			<View style={styles.imageContainer}>
				{data && data.random.image_url && <Image source={{uri: data.random.image_url}} style={{height: gifHeight, width: gifWidth}}/>}
			</View>
			{data && data.random && <ToggleFavorite id={data.random.id} isFavorite={data.random.isFavorite}/>}
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={() => GetRandomGif()}>
					<View style={styles.buttonWrap}>
						<Text style={styles.buttonText}>Re-roll</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
export default GifViewer;