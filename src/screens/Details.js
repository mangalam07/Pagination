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
      setEmail();
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

    if (!first?.length) {
      Alert.alert('Please fill the First name');
      setLoading(false);
      return;
    } else if (!last?.length) {
      Alert.alert('Please fill the Last name');
      setLoading(false);
      return;
    } else if (!email) {
      Alert.alert('Please fill the Email');
      setLoading(false);
      return;
    } else if (!phone?.length) {
      Alert.alert('Please fill the Phone');
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
            style={{height: 19, width: 19, tintColor: '#000'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginRight: 120,
            color: '#000',
          }}>
          Detail Screen
        </Text>
      </View>

      {/* image */}
      <Image source={{uri: imagePath}} style={styles.image} />
      <View style={{marginVertical: 10}} />
      {/* for first name */}
      <View style={styles.container}>
        <Text style={styles.head}>First name</Text>
        <TextInput
          value={first}
          style={[styles.inputtext, {borderColor: !first ? 'red' : 'green'}]}
          onChangeText={item => setFirst(item)}
        />
      </View>

      {/* for last name */}
      <View style={styles.container}>
        <Text style={styles.head}>Last name</Text>
        <TextInput
          value={last}
          style={[styles.inputtext, {borderColor: !last ? 'red' : 'green'}]}
          onChangeText={item => setLast(item)}
        />
      </View>

      {/* for email */}
      <View style={styles.container}>
        <Text style={styles.head}>Email</Text>
        <TextInput
          keyboardType="email-address"
          value={email}
          style={[styles.inputtext, {borderColor: !email ? 'red' : 'green'}]}
          onChangeText={item => handleEmail(item)}
        />
      </View>

      {/* for phone */}
      <View style={styles.container}>
        <Text style={styles.head}>Phone</Text>
        <TextInput
          keyboardType="numeric"
          maxLength={10}
          value={phone}
          style={[
            styles.inputtext,
            {borderColor: phone?.length == 10 ? 'green' : 'red'},
          ]}
          onChangeText={item => setPhone(item)}
        />
      </View>

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{
          borderWidth: 1,
          alignSelf: 'center',
          padding: 11,
          top: 35,
          borderColor: 'green',
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
    backgroundColor: 'gray',
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
    color: 'red',
  },
  inputtext: {
    borderWidth: 1,
    borderColor: 'red',
    width: '62%',
    textAlign: 'center',
  },
});
