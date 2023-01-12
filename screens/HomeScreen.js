import React,{useEffect,useState} from 'react'
import { Text, View,ScrollView,StyleSheet,Image,Dimensions,TouchableOpacity,SafeAreaView } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default function HomeScreen() {
  const [postData,setPostData] = useState([]);
  const url = "http://192.168.1.110:3000/posts";

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => setPostData(json))
    .catch((error)=> console.log(error)) 
    console.log(postData);
  },[]);



    const width = Dimensions.get('window').width
    const ratio = 635 / width
    const height = 680 / ratio



    return (
      <SafeAreaView>
      <ScrollView style={{backgroundColor: '#ddd'}}>
        
        {
          postData.map((item,index) => {
            return(
              <View key={index} style={styles.container}>
              <View style={styles.card}>
              <View style={styles.cardheader}>
              <View style={styles.headerLeft}>
              <TouchableOpacity>
                <Image
                style={styles.userImage}
                source={{uri:item.avatar}}
                />
              </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headerRight}>
              <TouchableOpacity>
                <FontAwesome name="ellipsis-h" style={styles.moreIcon}/>
                </TouchableOpacity>
              </View>
              </View>
              
              <Image
                style={styles.feedImage}
                source={{uri:item.source}}
                />
                <View style={styles.cardFooter}>
                <View style={styles.footerLeft}>
                  
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                      <FontAwesome name="heart" color="red" size={20}/>
                      </TouchableOpacity>
                      <Text style={{marginLeft:5,fontSize:16}}>{item.likes}</Text>

                      <View style={{flexDirection:'row',marginLeft:15}}>
                      <TouchableOpacity>
                      <FontAwesome name="comment" color="gray" size={20}/>
                     </TouchableOpacity>
                      <Text style={{marginLeft:5,fontSize:16}}>{item.comments}</Text>
                      </View>
                      <Text style={styles.postText}>{item.desc}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                <FontAwesome name="bookmark" color="gray" size={20}/>
                </TouchableOpacity>
                </View>
                
              </View>
            </View>
            )
          })
        }
      </ScrollView>
      </SafeAreaView>
    );
    
  }


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ddd',
  },
  card: {
    backgroundColor:'#fff',
    padding:10,
    margin:10,
    borderRadius:10
  },
  cardheader: {
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  cardFooter: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical:30,
    paddingBottom:10
  },
  headerLeft:{
    flexDirection:'row',
  },
  footerLeft:{
    flexDirection:'row',
  },
  userImage:{
    width:50,
    height:50,
    borderRadius:50/2,
  },
  userName:{
    fontWeight:'bold',
    marginLeft:10,
    marginTop:15
  },
  postText:{
    position:'absolute',
    display:'block',
    fontWeight:'bold',
    bottom:30,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    
  },
  moreIcon:{
    fontSize:20,
    color:'#ddd',
    marginTop:15
  },
  feedImage:{
    height:300,
    borderRadius:10,
    marginVertical:10
  }
})