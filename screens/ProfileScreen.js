import React,{useEffect,useState} from 'react'
import { Text, View,StyleSheet,SafeAreaView,Image,ScrollView } from 'react-native';
import {Ionicons,MaterialIcons} from '@expo/vector-icons'
import axios from 'axios';

export default function ProfileScreen() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  const getProfileData = () => {
    const userID = 6;
    let endpoints = [
      `http://192.168.1.110:3000/users/${userID}`,
      `http://192.168.1.110:3000/posts/${userID}`,
    ];
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: users}, {data: posts}] )=> {
      setUsers(users)
      setPosts(posts)
      {/*  DEBUG 
      console.log(users);
      console.log("------------------------------------------------------------")
      console.log(posts);
      */
      }
    });
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <SafeAreaView>
       
    <ScrollView showsVerticalScrollIndicator={false}>
    {
      users.map((user,index) => {
      return(
        <View key={index}>
            <View style={styles.titleBar}>
              <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
              <Ionicons name="ellipsis-vertical-outline" size={24} color="#52575D"></Ionicons>

            </View>
            <View style={{alignSelf:"center"}}>
              <View style={styles.profileImage}>
                <Image source={{uri:user.avatar}} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.dm}>
                <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
              </View>
       
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text,{fontWeight:"200",fontSize:36}]}>{user.first_name} {user.last_name}</Text>
              <Text style={[styles.text,{color:"#AEB5BC",fontSize:14}]}>{user.category_name}</Text>
            </View>

            <View style={styles.statsContainer}>
              
              <View style={styles.statsBox}>
                <Text style={[styles.text,{fontSize:24}]}>{user.num_posts}</Text>
                <Text style={[styles.text,styles.subText]}>Posts</Text>
              </View>

              <View style={[styles.statsBox,{borderColor:"#DFD8C8",borderLeftWidth:1,borderRightWidth:1}]}>
                <Text style={[styles.text,{fontSize:24}]}>{user.num_followers}</Text>
                <Text style={[styles.text,styles.subText]}>Followers</Text>
              </View>

              <View style={styles.statsBox}>
                <Text style={[styles.text,{fontSize:24}]}>{user.num_followed}</Text>
                <Text style={[styles.text,styles.subText]}>Following</Text>
              </View>

            </View>
            </View>
        )
      })
    }

{
      posts.map((posts,index) => {
      return(
        <View key={index} style={{marginTop:32,alignItems:'center',justifyContent:'center'}}>
                <View style={styles.mediaImageContainer}>
                  <Image source={{uri:posts.source}} style={styles.image} resizeMode="cover"></Image>
                  
                </View>

              {/*
                <Text style={styles.postText}>{posts.desc}</Text>
                */
              } 

            </View>
        )
      })
    }
    </ScrollView>
    </SafeAreaView>
      );
}



const styles = StyleSheet.create({
  container :{
    flex:1,
    backgroundColor:'#fff',
  },
  text:{
    fontFamily:'HelveticaNeue',
    color:'#52575D' 
  },
  subText:{
    fontSize:12,
    color:"#AEB5BC",
    textTransform:"uppercase",
    fontWeight:"500"
  },
  image : {
    flex:1,
    width:undefined,
    height:undefined,
  },
  titleBar:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:24,
    marginHorizontal:16
  },
  profileImage:{
    width:150,
    height:150,
    borderRadius:100,
    overflow:"hidden",
  },
  dm:{
    backgroundColor:"#41444B",
    position:'absolute',
    top:20,
    width:40,
    height:40,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  },
  active:{
    backgroundColor:"#34FFB9",
    position:'absolute',
    bottom:28,
    left:10,
    padding:4,
    height:20,
    width:20,
    borderRadius:10,
  },
  add:{
    backgroundColor:'#41444B',
    position:'absolute',
    bottom:0,
    right:0,
    width:60,
    height:60,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
  },
  infoContainer:{
    alignSelf:"center",
    alignItems:'center',
    marginTop:16
  },
  statsContainer:{
    flexDirection:'row',
    alignSelf:"center",
    marginTop:12
  },
  statsBox:{
    alignItems:"center",
    flex:1
  },
  mediaImageContainer:{
    width:350,
    height:350,
    borderRadius:12,
    overflow:"hidden",
    marginHorizontal:10
  },
  postText:{
    position:'absolute',
    display:'block',
    fontWeight:'bold',
    bottom:-25,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    
  },
})
