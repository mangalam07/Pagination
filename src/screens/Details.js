// import react element
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

// main component
const Details = ({navigation, route}) => {
  // params
  const imagePath = route?.params?.xt_image;

  //   state
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);

  // helper
  const handleEmail = item => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(item) === false) {
      console.log('Email is Not Correct');
      // setEmail(item);
      return false;
    } else {
      setEmail(item);
      console.log('Email is Correct');
    }
  };

  // helper
  const handleSubmit = () => {
    setLoading(true);
    const url = 'http://dev3.xicom.us/xttest/savedata.php';

    if (!first || !last || !email || !phone || !route?.params?.xt_image) {
      Alert.alert('Please fill out all fields');
      setLoading(false);
      return;
    }

    const formdata = new FormData();
    formdata.append('first_name', first);
    formdata.append('last_name', last);
    formdata.append('email', email);
    formdata.append('phone', phone);
    formdata.append('user_image', {
      uri: imagePath,
      name: 'user_image.jpg',
      type: 'image/jpeg',
    });

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 'success') {
          setLoading(false);
          setFirst('');
          setLast('');
          setEmail('');
          setPhone('');
          Alert.alert(result?.message);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View>
      {/* header */}
      <View style={styles.goback}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/goBack.png')}
            style={{height: 19, width: 19,tintColor:'#000'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginRight:120,
            color:'#000'
          }}>
          Detail Screen
        </Text>
      </View>

      {/* image */}
      <Image source={{uri: imagePath}} style={styles.image} />
        <View style={{marginVertical:10}}/>
      {/* for first name */}
      <View style={styles.container}>
        <Text style={styles.head}>First name</Text>
        <TextInput
          value={first}
          style={styles.inputtext}
          onChangeText={item => setFirst(item)}
        />
      </View>

      {/* for last name */}
      <View style={styles.container}>
        <Text style={styles.head}>Last name</Text>
        <TextInput
          value={last}
          style={styles.inputtext}
          onChangeText={item => setLast(item)}
        />
      </View>

      {/* for email */}
      <View style={styles.container}>
        <Text style={styles.head}>Email</Text>
        <TextInput
          value={email}
          style={styles.inputtext}
          onChangeText={item => handleEmail(item)}
        />
      </View>

      {/* for phone */}
      <View style={styles.container}>
        <Text style={styles.head}>Phone</Text>
        <TextInput
          value={phone}
          style={styles.inputtext}
          onChangeText={item => item.length == 10 && setPhone(item)}
        />
      </View>

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{
          borderWidth: 1,
          alignSelf: 'center',
          padding: 11,
          top: 35,
          borderColor:'green'
        }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              color: 'green',
            }}>
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  goback: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor:'gray'
  },
  image: {
    width: 400,
    height: 280,
    resizeMode: 'stretch',
  },
  container: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  head: {
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: '700',
    color: 'red'
  },
  inputtext: {
    borderWidth: 1,
    borderColor: 'red',
    width: '62%',
    textAlign: 'center',
  },
});
