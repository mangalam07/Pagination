// import react native element
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// main component
const Home = ({navigation}) => {
  // state
  const [userdata, setUserData] = useState([]);
  const [offset, setOffset] = useState(0);

  // helper
  useEffect(() => {
    getImages();

    return () => {};
  }, [offset]);

  // get images list
  const getImages = () => {
    const url = 'http://dev3.xicom.us/xttest/getdata.php';
    const formdata = new FormData();
    formdata.append('user_id', '108');
    formdata.append('offset', offset);
    formdata.append('type', 'type');

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => setUserData(result?.images))
      .catch(error => console.error(error));
  };

  // helper
  const renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate('deatils', item)}>
        <Image source={{uri: item?.xt_image}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  // helper
  const renderFooter = () => {
    return (
      <TouchableOpacity
        style={styles.loadmore}
        onPress={() => handleLoadMore()}>
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
          }}>
          Click here to load more
        </Text>
      </TouchableOpacity>
    );
  };

  // helper
  const handleLoadMore = () => {
    setOffset(offset + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userdata}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
        ListFooterComponent={() => renderFooter()}
        onEndReachedThreshold={0}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 320,
    height: 170,
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: 'cover', // Adjust as needed
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadmore: {
    alignItems: 'center',
    marginVertical: 12,
    width: '70%',
    alignSelf: 'center',
    backgroundColor:'red'
  }
});
