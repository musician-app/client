import React,{useEffect} from 'react'
import { Text, View,StyleSheet,TouchableOpacity, ScrollView,Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const [data,setData] = React.useState([]);
  const [filtereData,setFiltereData] = React.useState([]);
  const [text, onChangeText] = React.useState("");

  const url = "http://192.168.1.110:3000/users";

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error)=> console.log(error)) 
    console.log(data);
  },[]);


  const searchFilterFunction = (text) => {
    if(text){
      const newData = data.filter(item =>{
        const itemData = item.username ? item.username.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFiltereData(newData);
    } else {
      setFiltereData(data);
    }
  }
    

  return (
    <ScrollView>
      
      <View style={styles.searchBarView}>
      <TextInput onChangeText={searchFilterFunction} placeholder="Search"></TextInput>
      </View>
      {
        filtereData.map((item,index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Image source={{uri:item.avatar}} style={styles.image}/>
              <View>
                <Text style={styles.textName}>{item.username}</Text>
              </View>
            </View>
          )
        })
      }
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  textFriends: {
    fontSize:20,
    textAlign:'left',
    marginLeft:10,
    fontWeight:'bold',
    marginTop:10,
    alignItems:'center',
    displayitems:'center'
  },
  itemContainer: {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10,
    marginTop:10
  },
  image: {
    width:45,
    height:45,
    borderRadius:25,
  },
  textName: {
    fontSize:15,
    marginLeft:10,
    fontWeight:'600'
  },
  searchBarView:{
    padding:10,
    flexDirection:'row',
    width:'95%',
    backgroundColor:'#E7E7E7',
    borderRadius:10,
    alignItems:'center',
    left:10,
    marginTop:25
  }
});