import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SAVE_FAVORITE = gql`mutation saveFavorite($id: ID!, $isFavorite: Boolean!){
    saveFavorite(id: $id, isFavorite: $isFavorite){
      id
      isFavorite
    }
  }`

const deviceHeight = Dimensions.get('window').height;

const ToggleFavorite = ({id, isFavorite}) => {
  const styles = StyleSheet.create({
    favoriteContainer:{
      height: deviceHeight*.10,
      marginTop: deviceHeight*.05
    },
    imageWrap:{
      marginRight: 30,
      alignItems: 'flex-end',
    },
    image:{
      height:40,
      width: 40,
    },
  });

  const [SaveFavorite, { data, called}] = useMutation(SAVE_FAVORITE);

  if(data){
    isFavorite=data.saveFavorite.isFavorite;
  }
  return (
    <View style={styles.favoriteContainer}>
      <TouchableOpacity onPress={() => SaveFavorite({ variables: {id: id, isFavorite: !isFavorite}})}>
          <View style={styles.imageWrap} >
            <Image style={styles.image} source={isFavorite? require('../assets/favorite_true.png') : require('../assets/favorite_false.png')}/>
          </View>
      </TouchableOpacity>
    </View>
  );
}

export default ToggleFavorite;